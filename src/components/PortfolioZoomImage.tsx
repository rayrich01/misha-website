'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useCursorZoom } from '@/components/hooks/useCursorZoom'
import { usePinchZoom } from '@/components/hooks/usePinchZoom'

interface PortfolioZoomImageProps {
  src: string
  alt: string
  lqip?: string
  width: number
  height: number
}

export function PortfolioZoomImage({ src, alt, lqip, width, height }: PortfolioZoomImageProps) {
  const [lifted, setLifted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted] = useState(() => typeof window !== 'undefined')

  const cursor = useCursorZoom()
  const pinch = usePinchZoom()

  // Determine which zoom is active
  const isZoomed = cursor.isZoomed || pinch.isZoomed
  const transform = cursor.isZoomed ? cursor.transform : pinch.transform
  const transformOrigin = cursor.isZoomed ? cursor.transformOrigin : '50% 50%'

  const open = useCallback(() => {
    cursor.resetZoom()
    pinch.resetZoom()
    setLifted(true)
  }, [cursor, pinch])

  const close = useCallback(() => {
    cursor.resetZoom()
    pinch.resetZoom()
    setLifted(false)
  }, [cursor, pinch])

  // Lock body scroll when lifted
  useEffect(() => {
    if (!lifted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [lifted])

  // ESC to close
  useEffect(() => {
    if (!lifted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lifted, close])

  const handleOverlayClick = useCallback(() => {
    if (isZoomed) {
      cursor.resetZoom()
      pinch.resetZoom()
    } else {
      close()
    }
  }, [isZoomed, cursor, pinch, close])

  return (
    <>
      {/* Inline image — click to lift */}
      <div
        ref={containerRef}
        className="relative cursor-zoom-in rounded-lg overflow-hidden shadow-lg"
        onClick={open}
        role="button"
        tabIndex={0}
        aria-label="Click to zoom image"
        onKeyDown={(e) => { if (e.key === 'Enter') open() }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={85}
          placeholder={lqip ? 'blur' : undefined}
          blurDataURL={lqip || undefined}
          className="w-full h-auto"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px"
        />
      </div>

      {/* Hint */}
      <p className="text-center font-body text-xs text-charcoal/40 mt-3">
        Click to zoom &middot; scroll to explore detail
      </p>

      {/* Portal overlay */}
      {mounted && lifted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(45,45,45,0.88)' }}
        >
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={handleOverlayClick} />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 z-10 bg-cream/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full font-body text-xs uppercase tracking-wider hover:bg-cream transition-colors"
          >
            Close
          </button>

          {/* Scale indicator */}
          {isZoomed && (
            <div className="absolute bottom-5 right-5 z-10 bg-dark/80 backdrop-blur-sm text-gold font-body text-xs px-3 py-1.5 rounded-full">
              {(cursor.isZoomed ? cursor.zoom.scale : pinch.scale).toFixed(1)}&times;
            </div>
          )}

          {/* Zoomable image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] select-none"
            style={{ cursor: isZoomed ? 'grab' : 'zoom-in' }}
            onWheel={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              cursor.handlers.handleWheel(e, rect)
            }}
            onMouseDown={cursor.handlers.handleMouseDown}
            onMouseMove={cursor.handlers.handleMouseMove}
            onMouseUp={cursor.handlers.handleMouseUp}
            onMouseLeave={cursor.handlers.handleMouseUp}
            onTouchStart={pinch.handlers.handleTouchStart}
            onTouchMove={pinch.handlers.handleTouchMove}
            onTouchEnd={pinch.handlers.handleTouchEnd}
            onDoubleClick={handleOverlayClick}
          >
            <div
              style={{
                transform,
                transformOrigin,
                transition: cursor.isZoomed && cursor.zoom.scale > 1 ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                quality={90}
                priority
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded"
                sizes="100vw"
                draggable={false}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
