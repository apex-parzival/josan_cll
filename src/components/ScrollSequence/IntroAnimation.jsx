import { useEffect, useRef } from 'react'
import './ScrollSequence.css'

export default function IntroAnimation({ videoFile, onComplete }) {
  const videoRef = useRef(null)

  useEffect(() => {
    let finished = false
    let safetyTimer = null

    const finish = () => {
      if (!finished) {
        finished = true
        onComplete()
      }
    }

    const video = videoRef.current

    if (video) {
      video.currentTime = 0
      // Slow down animation video to 70% speed (30% slower) for smoother, premium transition
      video.playbackRate = 0.70

      const handleLoadedMetadata = () => {
        const dur = video.duration || 8
        const playSpeed = video.playbackRate || 0.70
        if (safetyTimer) clearTimeout(safetyTimer)
        // Adjust safety buffer based on the slower playbackRate
        safetyTimer = setTimeout(finish, Math.max(((dur / playSpeed) + 2.5) * 1000, 9000))
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('ended', finish)
      video.addEventListener('error', finish)

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          finish()
        })
      }

      // Default safety fallback (15s) for slower playback rate
      safetyTimer = setTimeout(finish, 15000)

      return () => {
        if (safetyTimer) clearTimeout(safetyTimer)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('ended', finish)
        video.removeEventListener('error', finish)
      }
    } else {
      finish()
    }
  }, [videoFile, onComplete])

  // Skip handler: Only skip if user intentionally scrolls down past 60px
  useEffect(() => {
    const initialScrollY = window.scrollY

    const handleScroll = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 60) {
        onComplete()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onComplete])

  return (
    <div className="intro-animation-overlay">
      <video
        ref={videoRef}
        src={`/assets/videos/${videoFile}`}
        className="intro-animation-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <button className="intro-skip-badge" onClick={onComplete} aria-label="Skip intro animation">
        <span>Skip Intro ↓</span>
      </button>
    </div>
  )
}
