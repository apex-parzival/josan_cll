import { useEffect, useRef } from 'react'
import './ScrollSequence.css'

export default function IntroAnimation({ videoFile, onComplete }) {
  const videoRef = useRef(null)

  useEffect(() => {
    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        onComplete()
      }
    }

    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay fails or is blocked by browser, finish intro immediately
          finish()
        })
      }
      video.addEventListener('ended', finish)
      video.addEventListener('error', finish)
    } else {
      finish()
    }

    // Safety fallback: Never leave overlay for more than 4 seconds
    const safetyTimer = setTimeout(finish, 4000)

    // User interaction skip handler
    const handleSkip = () => {
      finish()
    }

    window.addEventListener('scroll', handleSkip, { passive: true })
    window.addEventListener('wheel', handleSkip, { passive: true })
    window.addEventListener('touchmove', handleSkip, { passive: true })
    window.addEventListener('keydown', handleSkip, { passive: true })
    window.addEventListener('click', handleSkip, { passive: true })

    return () => {
      clearTimeout(safetyTimer)
      if (video) {
        video.removeEventListener('ended', finish)
        video.removeEventListener('error', finish)
      }
      window.removeEventListener('scroll', handleSkip)
      window.removeEventListener('wheel', handleSkip)
      window.removeEventListener('touchmove', handleSkip)
      window.removeEventListener('keydown', handleSkip)
      window.removeEventListener('click', handleSkip)
    }
  }, [videoFile, onComplete])

  return (
    <div className="intro-animation-overlay" onClick={onComplete}>
      <video
        ref={videoRef}
        src={`/assets/videos/${videoFile}`}
        className="intro-animation-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onError={onComplete}
      />
      <div className="intro-skip-badge">
        <span>Scroll or Tap to Skip ↓</span>
      </div>
    </div>
  )
}
