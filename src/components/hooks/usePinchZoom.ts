import { useState, useCallback, useRef } from 'react'
import type { TouchEvent } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 5
const SNAP_THRESHOLD = 1.05
const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_SCALE = 2

function getDistance(a: React.Touch, b: React.Touch): number {
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

interface PinchState { initialDistance: number; initialScale: number }
interface PanState { active: boolean; startX: number; startY: number; startPanX: number; startPanY: number }

export function usePinchZoom() {
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const pinchRef = useRef<PinchState | null>(null)
  const panRef = useRef<PanState>({ active: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 })
  const lastTapRef = useRef(0)

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

  const resetZoom = useCallback(() => {
    setScale(1)
    setPan({ x: 0, y: 0 })
    pinchRef.current = null
    panRef.current.active = false
  }, [])

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const touches = e.touches
      if (touches.length === 2) {
        pinchRef.current = { initialDistance: getDistance(touches[0], touches[1]), initialScale: scale }
        panRef.current.active = false
        return
      }
      if (touches.length === 1) {
        const now = Date.now()
        const elapsed = now - lastTapRef.current
        lastTapRef.current = now
        if (elapsed < DOUBLE_TAP_MS) {
          if (scale > MIN_SCALE) resetZoom()
          else { setScale(DOUBLE_TAP_SCALE); setPan({ x: 0, y: 0 }) }
          return
        }
        if (scale > MIN_SCALE) {
          panRef.current = { active: true, startX: touches[0].clientX, startY: touches[0].clientY, startPanX: pan.x, startPanY: pan.y }
        }
      }
    },
    [scale, pan.x, pan.y, resetZoom],
  )

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touches = e.touches
    if (touches.length === 2 && pinchRef.current) {
      const dist = getDistance(touches[0], touches[1])
      const ratio = dist / pinchRef.current.initialDistance
      setScale(clamp(pinchRef.current.initialScale * ratio, MIN_SCALE * 0.8, MAX_SCALE))
      return
    }
    if (touches.length === 1 && panRef.current.active) {
      const dx = touches[0].clientX - panRef.current.startX
      const dy = touches[0].clientY - panRef.current.startY
      setPan({ x: panRef.current.startPanX + dx, y: panRef.current.startPanY + dy })
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null
    panRef.current.active = false
    setScale((prev) => {
      if (prev < SNAP_THRESHOLD) { setPan({ x: 0, y: 0 }); return 1 }
      return Math.min(prev, MAX_SCALE)
    })
  }, [])

  const isZoomed = scale > MIN_SCALE
  const transform = `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`

  return {
    scale,
    pan,
    isZoomed,
    transform,
    handlers: { handleTouchStart, handleTouchMove, handleTouchEnd },
    resetZoom,
  } as const
}
