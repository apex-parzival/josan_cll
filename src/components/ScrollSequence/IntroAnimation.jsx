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

  // Skip handler: Skip only when the user actively interacts with wheel, touch, or keyboard
  useEffect(() => {
    // Disable automatic browser scroll restoration while intro is active
    const originalRestoration = 'scrollRestoration' in window.history ? window.history.scrollRestoration : 'auto'
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    let canSkip = false
    const graceTimer = setTimeout(() => {
      canSkip = true
    }, 800)

    const triggerSkip = () => {
      if (canSkip) {
        onComplete()
      }
    }

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 10) {
        triggerSkip()
      }
    }

    const handleTouch = () => {
      triggerSkip()
    }

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Up', 'Down'].includes(e.key)) {
        triggerSkip()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(graceTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('keydown', handleKeyDown)
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = originalRestoration
      }
    }
  }, [onComplete])

  return (
    <div className="intro-animation-overlay">
      <video
        ref={videoRef}
        src={`/assets/videos/${encodeURIComponent(videoFile)}`}
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
