import { useEffect, useRef, useState } from 'react'
import './ScrollSequence.css'

export default function IntroAnimation({ sequenceFolder, onComplete, totalFrames = 40 }) {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let isCancelled = false
    const loadedImages = []
    let loadedCount = 0
    let animInterval = null

    // Preload frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const frameName = String(i).padStart(3, '0')
      img.src = `/assets/motion-video/${sequenceFolder}/ezgif-frame-${frameName}.jpg`
      
      img.onload = () => {
        if (isCancelled) return
        loadedCount++
        setProgress((loadedCount / totalFrames) * 100)
        if (loadedCount === totalFrames) {
          setLoading(false)
          startPlayback(loadedImages)
        }
      }

      img.onerror = () => {
        if (isCancelled) return
        loadedCount++
        if (loadedCount === totalFrames) {
          setLoading(false)
          startPlayback(loadedImages)
        }
      }

      loadedImages.push(img)
    }

    function startPlayback(imgs) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      function renderFrame(frameIdx) {
        const img = imgs[frameIdx]
        if (!img || !canvas) return

        const dpr = window.devicePixelRatio || 1
        const canvasWidth = window.innerWidth
        const canvasHeight = window.innerHeight

        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr
        ctx.scale(dpr, dpr)

        const imgRatio = img.width / img.height
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
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
      }

      let currentFrame = 0
      renderFrame(0)

      // Play frame sequence at 20fps (~2s duration)
      animInterval = setInterval(() => {
        currentFrame++
        if (currentFrame >= totalFrames) {
          clearInterval(animInterval)
          setTimeout(() => {
            if (!isCancelled) onComplete()
          }, 200)
        } else {
          renderFrame(currentFrame)
        }
      }, 50)
    }

    // Listener to skip intro on user scroll, touch, or key press
    const handleSkip = () => {
      if (animInterval) clearInterval(animInterval)
      onComplete()
    }

    window.addEventListener('scroll', handleSkip, { passive: true })
    window.addEventListener('wheel', handleSkip, { passive: true })
    window.addEventListener('touchmove', handleSkip, { passive: true })
    window.addEventListener('keydown', handleSkip, { passive: true })

    return () => {
      isCancelled = true
      if (animInterval) clearInterval(animInterval)
      window.removeEventListener('scroll', handleSkip)
      window.removeEventListener('wheel', handleSkip)
      window.removeEventListener('touchmove', handleSkip)
      window.removeEventListener('keydown', handleSkip)
    }
  }, [sequenceFolder, totalFrames, onComplete])

  return (
    <div className="intro-animation-overlay" onClick={onComplete}>
      {loading && (
        <div className="scroll-sequence-fallback">
          <div className="scroll-sequence-spinner"></div>
          <div className="scroll-sequence-loading-text">
            Loading Intro Animation ({Math.round(progress)}%)
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="intro-animation-canvas" />
      {!loading && (
        <div className="intro-skip-badge">
          <span>Scroll or Tap to Skip ↓</span>
        </div>
      )}
    </div>
  )
}
