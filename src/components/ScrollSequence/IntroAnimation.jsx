import { useEffect, useRef } from 'react'
import './ScrollSequence.css'

export default function IntroAnimation({ videoFile, onComplete }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    video.play().catch(() => {})

    const handleEnded = () => {
      onComplete()
    }

    video.addEventListener('ended', handleEnded)

    // Listener to skip intro on user scroll, touch, wheel, or key press
    const handleSkip = () => {
      onComplete()
    }

    window.addEventListener('scroll', handleSkip, { passive: true })
    window.addEventListener('wheel', handleSkip, { passive: true })
    window.addEventListener('touchmove', handleSkip, { passive: true })
    window.addEventListener('keydown', handleSkip, { passive: true })

    return () => {
      video.removeEventListener('ended', handleEnded)
      window.removeEventListener('scroll', handleSkip)
      window.removeEventListener('wheel', handleSkip)
      window.removeEventListener('touchmove', handleSkip)
      window.removeEventListener('keydown', handleSkip)
    }
  }, [videoFile, onComplete])

  return (
    <div className="intro-animation-overlay" onClick={onComplete}>
      <video
        ref={videoRef}
        src={`/assets/videos/${encodeURIComponent(videoFile)}`}
        className="intro-animation-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <div className="intro-skip-badge">
        <span>Scroll or Tap to Skip ↓</span>
      </div>
    </div>
  )
}
