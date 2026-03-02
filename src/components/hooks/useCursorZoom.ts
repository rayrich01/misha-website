import { useState, useCallback, useRef } from 'react'
import type { WheelEvent, MouseEvent } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_SENSITIVITY = 0.002

interface ZoomState {
  scale: number
  originX: number
  originY: number
  panX: number
  panY: number
}

interface DragState {
  active: boolean
  startX: number
  startY: number
  startPanX: number
  startPanY: number
}

const INITIAL_ZOOM: ZoomState = {
  scale: 1,
  originX: 50,
  originY: 50,
  panX: 0,
  panY: 0,
}

export function useCursorZoom() {
  const [zoom, setZoom] = useState<ZoomState>(INITIAL_ZOOM)
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  })

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>, containerRect: DOMRect) => {
      e.preventDefault()
      setZoom((prev) => {
        const delta = -e.deltaY * ZOOM_SENSITIVITY
        const nextScale = clampScale(prev.scale + delta * prev.scale)
        const cursorX = ((e.clientX - containerRect.left) / containerRect.width) * 100
        const cursorY = ((e.clientY - containerRect.top) / containerRect.height) * 100
        if (nextScale <= MIN_SCALE) return INITIAL_ZOOM
        return { scale: nextScale, originX: cursorX, originY: cursorY, panX: prev.panX, panY: prev.panY }
      })
    },
    [],
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (zoom.scale <= MIN_SCALE) return
      e.preventDefault()
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startPanX: zoom.panX,
        startPanY: zoom.panY,
      }
    },
    [zoom.scale, zoom.panX, zoom.panY],
  )

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.active) return
    e.preventDefault()
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    setZoom((prev) => ({ ...prev, panX: drag.startPanX + dx, panY: drag.startPanY + dy }))
  }, [])

  const handleMouseUp = useCallback(() => {
    dragRef.current.active = false
  }, [])

  const resetZoom = useCallback(() => {
    setZoom(INITIAL_ZOOM)
    dragRef.current.active = false
  }, [])

  const isZoomed = zoom.scale > MIN_SCALE
  const transform = `scale(${zoom.scale}) translate(${zoom.panX / zoom.scale}px, ${zoom.panY / zoom.scale}px)`
  const transformOrigin = `${zoom.originX}% ${zoom.originY}%`

  return {
    zoom,
    isZoomed,
    transform,
    transformOrigin,
    handlers: { handleWheel, handleMouseDown, handleMouseMove, handleMouseUp },
    resetZoom,
  } as const
}
