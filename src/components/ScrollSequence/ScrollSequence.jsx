import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollSequence.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollSequence({ children, sequenceFolder, totalFrames = 40 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [images, setImages] = useState([])
  const [hasScrolled, setHasScrolled] = useState(false)

  // Preload Images
  useEffect(() => {
    setLoading(true)
    setProgress(0)
    setImages([])

    const loadedImages = []
    let loadedCount = 0

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const frameName = String(i).padStart(3, '0')
      img.src = `/assets/motion-video/${sequenceFolder}/ezgif-frame-${frameName}.jpg`
      
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
  }, [sequenceFolder, totalFrames])

  // Canvas Scroll Linked Rendering
  useEffect(() => {
    if (loading || images.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const container = containerRef.current

    const sequenceObj = { frame: 0 }
    let canvasWidth = 0
    let canvasHeight = 0
    let dpr = window.devicePixelRatio || 1

    // Helper: Draw image scaled center cover
    const renderFrame = (frameIndex) => {
      const img = images[frameIndex]
      if (!img) return

      const imgWidth = img.width
      const imgHeight = img.height

      const imgRatio = imgWidth / imgHeight
      const canvasRatio = canvasWidth / canvasHeight

      let drawWidth, drawHeight, dx, dy

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight
        drawWidth = canvasHeight * imgRatio
        dx = (canvasWidth - drawWidth) / 2
        dy = 0
      } else {
        drawWidth = canvasWidth
        drawHeight = canvasWidth / imgRatio
        dx = 0
        dy = (canvasHeight - drawHeight) / 2
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      // Force high-quality scaling interpolation
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = window.devicePixelRatio || 1
      
      // Set the backing store dimensions to match the physical screen pixels
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      canvasWidth = rect.width
      canvasHeight = rect.height

      // Scale context to draw in virtual CSS dimensions
      ctx.scale(dpr, dpr)
      
      // Reset smoothing configuration after backing store resize
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      renderFrame(sequenceObj.frame)
    }

    // Run initial configuration
    resizeCanvas()

    // Check initial scroll
    let autoplayInterval = null
    let localHasScrolled = window.scrollY > 30

    if (localHasScrolled) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
      // Autoplay cycle
      let currentFrame = 0
      autoplayInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % totalFrames
        sequenceObj.frame = currentFrame
        renderFrame(currentFrame)
      }, 50) // 50ms per frame (20 fps)
    }

    // Scroll listener to transition from autoplay to scroll trigger
    const handleScroll = () => {
      if (window.scrollY > 30 && !localHasScrolled) {
        localHasScrolled = true
        setHasScrolled(true)
        if (autoplayInterval) {
          clearInterval(autoplayInterval)
          autoplayInterval = null
        }
        window.removeEventListener('scroll', handleScroll)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // GSAP ScrollTrigger Sequence
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top', // Start when the wrapper top meets the screen top
      end: 'bottom bottom', // End when the wrapper bottom meets the screen bottom
      scrub: 1.2, // Smooth scrubbing
      onUpdate: (self) => {
        if (localHasScrolled) {
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(self.progress * totalFrames)
          )
          sequenceObj.frame = frameIndex
          renderFrame(frameIndex)
        }
      }
    })

    // Redraw on window resize
    window.addEventListener('resize', resizeCanvas)

    return () => {
      if (autoplayInterval) clearInterval(autoplayInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resizeCanvas)
      trigger.kill()
    }
  }, [loading, images, sequenceFolder])

  // Cards Scroll Animations (fading in/out as they scroll past)
  useEffect(() => {
    if (loading) return

    const container = containerRef.current
    const cards = container.querySelectorAll('.detail-paragraph, .sidebar-card')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        // Fade in from bottom
        gsap.fromTo(card,
          { opacity: 0.2, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',  // Starts fading in when card top is 95% of viewport
              end: 'top 60%',    // Fully highlighted when top reaches 60% of viewport
              scrub: true,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Fade out to top
        gsap.fromTo(card,
          { opacity: 1, scale: 1 },
          {
            opacity: 0.2,
            scale: 0.96,
            scrollTrigger: {
              trigger: card,
              start: 'top 12%',   // Starts fading out when top reaches 12% of viewport (clearing navbar)
              end: 'top -5%',     // Fully faded out when card top is off screen (-5%)
              scrub: true,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <div className={`scroll-sequence-wrapper${!hasScrolled ? ' intro-active' : ''}`} ref={containerRef}>
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
