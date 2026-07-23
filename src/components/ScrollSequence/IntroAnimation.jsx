import { useEffect, useRef } from 'react'
import './ScrollSequence.css'

export default function IntroAnimation({ videoFile, onComplete }) {
  const videoRef = useRef(null)

  useEffect(() => {
    // Immediately reset window scroll position to top
    window.scrollTo(0, 0)

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

      const applySpeed = () => {
        try {
          video.playbackRate = 0.70
        } catch (e) {
          // ignore playbackRate setting error
        }
      }

      const handleLoadedMetadata = () => {
        applySpeed()
        const dur = video.duration || 8
        const playSpeed = video.playbackRate || 0.70
        if (safetyTimer) clearTimeout(safetyTimer)
        safetyTimer = setTimeout(finish, Math.max(((dur / playSpeed) + 2.5) * 1000, 8000))
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('ended', finish)
      video.addEventListener('error', finish)
      video.addEventListener('play', applySpeed)

      video.muted = true
      video.playsInline = true

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay fallback:', err)
          video.muted = true
          video.play().catch(() => finish())
        })
      }

      // Default safety fallback (15s)
      safetyTimer = setTimeout(finish, 15000)

      return () => {
        if (safetyTimer) clearTimeout(safetyTimer)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('ended', finish)
        video.removeEventListener('error', finish)
        video.removeEventListener('play', applySpeed)
      }
    } else {
      finish()
    }
  }, [videoFile, onComplete])

  // Skip handler: Grace period of 600ms prevents route scroll resets from skipping
  useEffect(() => {
    let canSkip = false
    const graceTimer = setTimeout(() => {
      canSkip = true
    }, 600)

    const handleScroll = () => {
      if (canSkip && window.scrollY > 100) {
        onComplete()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(graceTimer)
      window.removeEventListener('scroll', handleScroll)
    }
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
