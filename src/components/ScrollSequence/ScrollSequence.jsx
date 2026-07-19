import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollSequence.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollSequence({ children }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [images, setImages] = useState([])

  const totalFrames = 40

  // Preload Images
  useEffect(() => {
    const loadedImages = []
    let loadedCount = 0

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const frameName = String(i).padStart(3, '0')
      img.src = `/assets/motion-video/ezgif-frame-${frameName}.jpg`
      
      img.onload = () => {
        loadedCount++
        setProgress((loadedCount / totalFrames) * 100)
        
        if (loadedCount === totalFrames) {
          setImages(loadedImages)
          setLoading(false)
        }
      }
      
      img.onerror = () => {
        loadedCount++
        setProgress((loadedCount / totalFrames) * 100)
        if (loadedCount === totalFrames) {
          setImages(loadedImages)
          setLoading(false)
        }
      }
      
      loadedImages.push(img)
    }
  }, [])

  // Canvas Scroll Linked Rendering
  useEffect(() => {
    if (loading || images.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const container = containerRef.current

    const sequenceObj = { frame: 0 }

    // Helper: Draw image scaled center cover
    const renderFrame = (frameIndex) => {
      const img = images[frameIndex]
      if (!img) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const canvasWidth = rect.width
      const canvasHeight = rect.height

      const imgWidth = img.width
      const imgHeight = img.height

      const imgRatio = imgWidth / imgHeight
      const canvasRatio = canvasWidth / canvasHeight

      let drawWidth, drawHeight, dx, dy
      const shift = window.innerWidth > 990 ? 200 : 0 // Shift right on desktop to clear text column

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight
        drawWidth = canvasHeight * imgRatio
        dx = (canvasWidth - drawWidth) / 2 + shift
        dy = 0
      } else {
        drawWidth = canvasWidth
        drawHeight = canvasWidth / imgRatio
        dx = shift
        dy = (canvasHeight - drawHeight) / 2
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear absolute pixel size
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    }

    // Initial render
    renderFrame(0)

    // GSAP ScrollTrigger Sequence
    // Instead of pinning the entire screen, we scrub the frame over the length of the container scroll
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom-=200', // Starts early
      end: 'bottom top+=200', // Ends late
      scrub: 1.2, // Smooth scrubbing to avoid stutter
      onUpdate: (self) => {
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(self.progress * totalFrames)
        )
        sequenceObj.frame = frameIndex
        renderFrame(frameIndex)
      }
    })

    // Redraw on window resize
    const handleResize = () => {
      renderFrame(sequenceObj.frame)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [loading, images])

  return (
    <div className="scroll-sequence-wrapper" ref={containerRef}>
      {loading && (
        <div className="scroll-sequence-fallback">
          <div className="scroll-sequence-spinner"></div>
          <div className="scroll-sequence-loading-text">
            Preloading Animation Frames ({Math.round(progress)}%)
          </div>
        </div>
      )}
      
      {/* Sticky Canvas Container in the background */}
      <div className="scroll-sequence-sticky">
        <canvas ref={canvasRef} className="scroll-sequence-canvas" />
      </div>

      {/* Scrolling text content on top */}
      <div className="scroll-sequence-content">
        {children}
      </div>
    </div>
  )
}
