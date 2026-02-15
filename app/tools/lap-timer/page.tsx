'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface Lap {
  number: number
  timeMs: number
  splitMs: number
}

function formatTime(ms: number, decimals: 1 | 2 | 3 = 1): string {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formatted = seconds.toFixed(decimals)
  const paddedSeconds = seconds < 10 ? `0${formatted}` : formatted
  return `${minutes.toString().padStart(2, '0')}:${paddedSeconds}`
}

export default function LapTimerPage() {
  const [state, setState] = useState<'idle' | 'running' | 'stopped'>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [laps, setLaps] = useState<Lap[]>([])
  const [lastLapTime, setLastLapTime] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [flashActive, setFlashActive] = useState(false)
  const [decimals, setDecimals] = useState<1 | 2 | 3>(1)
  const [excludeLastLap, setExcludeLastLap] = useState(true)

  const startTimeRef = useRef<number>(0)
  const lastLapTimeRef = useRef<number>(0)
  const animFrameRef = useRef<number>(0)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  // Animation loop for elapsed time display
  const tick = useCallback(() => {
    const now = performance.now()
    setElapsed(now - startTimeRef.current)
    animFrameRef.current = requestAnimationFrame(tick)
  }, [])

  // Wake Lock
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen')
      }
    } catch {
      // Wake lock not available or denied - not critical
    }
  }, [])

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release()
      wakeLockRef.current = null
    }
  }, [])

  // Fullscreen
  const enterFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement
      if (el.requestFullscreen) {
        await el.requestFullscreen()
        setIsFullscreen(true)
      } else if ((el as any).webkitRequestFullscreen) {
        await (el as any).webkitRequestFullscreen()
        setIsFullscreen(true)
      }
    } catch {
      // Fullscreen not available - still works, just with browser chrome
    }
  }, [])

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      }
    } catch {
      // Ignore
    }
    setIsFullscreen(false)
  }, [])

  // Listen for fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        setIsFullscreen(false)
      }
    }
    document.addEventListener('fullscreenchange', handleChange)
    document.addEventListener('webkitfullscreenchange', handleChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleChange)
      document.removeEventListener('webkitfullscreenchange', handleChange)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      releaseWakeLock()
    }
  }, [releaseWakeLock])

  const handleStart = useCallback(() => {
    const now = performance.now()
    startTimeRef.current = now
    lastLapTimeRef.current = now
    setElapsed(0)
    setLaps([])
    setLastLapTime(null)
    setState('running')
    animFrameRef.current = requestAnimationFrame(tick)
    requestWakeLock()
    enterFullscreen()
  }, [tick, requestWakeLock, enterFullscreen])

  const handleLap = useCallback(() => {
    const now = performance.now()
    const splitMs = now - lastLapTimeRef.current
    const totalMs = now - startTimeRef.current
    lastLapTimeRef.current = now

    setLaps(prev => [...prev, {
      number: prev.length + 1,
      timeMs: totalMs,
      splitMs: splitMs,
    }])
    setLastLapTime(splitMs)

    // Flash effect
    setFlashActive(true)
    setTimeout(() => setFlashActive(false), 200)
  }, [])

  const handleStop = useCallback(() => {
    // Record final lap from last lap mark to now
    const now = performance.now()
    const splitMs = now - lastLapTimeRef.current
    const totalMs = now - startTimeRef.current

    setLaps(prev => [...prev, {
      number: prev.length + 1,
      timeMs: totalMs,
      splitMs: splitMs,
    }])
    cancelAnimationFrame(animFrameRef.current)
    setElapsed(totalMs)
    setState('stopped')
    releaseWakeLock()
    exitFullscreen()
  }, [releaseWakeLock, exitFullscreen])

  const handleReset = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    setElapsed(0)
    setLaps([])
    setLastLapTime(null)
    setExcludeLastLap(false)
    setState('idle')
    releaseWakeLock()
  }, [releaseWakeLock])

  // Compute display font size based on string length
  const lapDisplay = lastLapTime !== null ? formatTime(lastLapTime, decimals) : ''
  const lapFontVw = lapDisplay.length > 0 ? Math.floor(135 / lapDisplay.length) : 19

  // ─── RUNNING STATE (fullscreen optimised) ───
  if (state === 'running') {
    return (
      <div
        className="fixed inset-0 bg-black flex flex-col select-none z-[9999] cursor-pointer"
        style={{ touchAction: 'manipulation' }}
        onClick={handleLap}
      >
        {/* Flash overlay */}
        {flashActive && (
          <div className="absolute inset-0 bg-yellow-400 opacity-40 pointer-events-none z-10" />
        )}

        {/* Top bar: elapsed time + stop */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="text-gray-400 font-mono text-3xl tracking-wider">
            {formatTime(elapsed, 3)}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleStop() }}
            className="rounded-full text-red-400 text-sm font-bold uppercase tracking-widest border border-red-400/30 active:bg-red-400/20 flex items-center justify-center"
            style={{ width: '72px', height: '72px' }}
          >
            Stop
          </button>
        </div>

        {/* Centre: massive round LAP button */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Last lap readout above button */}
          <div className="text-center mb-4">
            <div className="text-gray-500 text-lg font-mono tracking-widest">
              {lastLapTime !== null ? `LAP ${laps.length}` : '\u00A0'}
            </div>
            <div
              className="font-mono font-bold leading-none"
              style={{
                fontSize: `min(${lapFontVw}vw, 12vh)`,
                color: lastLapTime !== null ? 'white' : 'rgb(55, 65, 81)',
              }}
            >
              {lastLapTime !== null ? lapDisplay : formatTime(0, decimals)}
            </div>
          </div>

          {/* Giant round lap button — as wide as the viewport allows */}
          <div
            className="rounded-full text-white font-bold uppercase flex items-center justify-center aspect-square pointer-events-none"
            style={{
              width: 'min(75vw, 55vh)',
              fontSize: 'min(10vw, 8vh)',
              background: 'radial-gradient(circle at 38% 38%, #5b8abf, #3b6fa0 40%, #2a5580 70%, #1e3f5e)',
              boxShadow: '0 0 40px rgba(59, 111, 160, 0.4), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -4px 8px rgba(0,0,0,0.3)',
              border: '3px solid rgba(255,255,255,0.1)',
            }}
          >
            LAP {laps.length + 1}
          </div>

          {/* Previous lap below button — always rendered to prevent layout shift */}
          <div className="text-center mt-4">
            <span className="text-gray-600 font-mono text-sm">
              {laps.length >= 2
                ? `Lap ${laps.length - 1}: ${formatTime(laps[laps.length - 2].splitMs, decimals)}`
                : '\u00A0'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // ─── STOPPED STATE (session summary) ───
  if (state === 'stopped') {
    // Filter laps based on exclusion
    const activeLaps = excludeLastLap && laps.length > 1 ? laps.slice(0, -1) : laps
    const activeSplits = activeLaps.map(l => l.splitMs)
    const fastest = Math.min(...activeSplits)
    const slowest = Math.max(...activeSplits)
    const average = activeSplits.reduce((a, b) => a + b, 0) / activeSplits.length
    const totalTime = excludeLastLap && laps.length > 1
      ? laps[laps.length - 2].timeMs
      : elapsed

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Session Complete</h1>
        <p className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
          {activeLaps.length} laps · Total time: {formatTime(totalTime, 3)}
        </p>

        {/* Exclude last lap toggle */}
        {laps.length > 1 && (
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeLastLap}
              onChange={(e) => setExcludeLastLap(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-bikotic-blue focus:ring-bikotic-blue"
            />
            <span className="text-gray-600">Exclude last lap (cool-down)</span>
          </label>
        )}

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">Fastest</div>
            <div className="text-lg font-mono font-bold text-green-800">{formatTime(fastest, 3)}</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Average</div>
            <div className="text-lg font-mono font-bold text-gray-800">{formatTime(average, 3)}</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <div className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">Slowest</div>
            <div className="text-lg font-mono font-bold text-red-800">{formatTime(slowest, 3)}</div>
          </div>
        </div>

        {/* Lap table */}
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Lap</th>
                <th className="text-right px-4 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Split</th>
                <th className="text-right px-4 py-3 text-sm font-bold text-gray-600 uppercase tracking-wider">Elapsed</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((lap, i) => {
                const isExcluded = excludeLastLap && i === laps.length - 1
                const isFastest = !isExcluded && lap.splitMs === fastest
                const isSlowest = !isExcluded && lap.splitMs === slowest && activeLaps.length > 1
                return (
                  <tr
                    key={lap.number}
                    className={`border-b border-gray-100 ${isExcluded ? 'opacity-40' : isFastest ? 'bg-green-50' : isSlowest ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-4 py-3 font-mono text-gray-700">
                      <span className={isExcluded ? 'line-through' : ''}>
                        {lap.number}
                      </span>
                      {isFastest && <span className="ml-2 text-green-600 text-xs font-bold">FASTEST</span>}
                      {isSlowest && <span className="ml-2 text-red-500 text-xs font-bold">SLOWEST</span>}
                      {isExcluded && <span className="ml-2 text-gray-400 text-xs font-bold">EXCLUDED</span>}
                    </td>
                    <td className={`px-4 py-3 font-mono font-bold text-right ${isExcluded ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {formatTime(lap.splitMs, 3)}
                    </td>
                    <td className={`px-4 py-3 font-mono text-right ${isExcluded ? 'line-through text-gray-300' : 'text-gray-500'}`}>
                      {formatTime(lap.timeMs, 3)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 bg-bikotic-blue text-white font-bold rounded-lg hover:bg-bikotic-blue-dark transition-colors"
          >
            New Session
          </button>
          <a
            href="/tools"
            className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-lg hover:border-gray-300 transition-colors text-center"
          >
            Back to Tools
          </a>
        </div>
      </div>
    )
  }

  // ─── IDLE STATE ───
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Track Lap Timer
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        A fullscreen stopwatch for trackside coaching. Hit start, hit lap each time the rider crosses the line, read the big number, shout it to the rider.
      </p>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-8 mb-6">
        <div className="space-y-4 text-gray-600 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-xl">1.</span>
            <span>Press <strong>Start</strong> — the app goes fullscreen with a dark background.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">2.</span>
            <span>Press <strong>Lap</strong> each time the rider crosses the finish line.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">3.</span>
            <span>The last lap time displays <strong>big enough to read at a glance</strong> — already rounded for you.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">4.</span>
            <span>Press <strong>Stop</strong> to end the session and see all your laps for screenshotting.</span>
          </div>
        </div>

        {/* Decimal selector */}
        <div className="flex items-center justify-between mb-4 pb-6 border-b border-gray-200">
          <label htmlFor="decimals" className="text-gray-700 font-semibold">Display</label>
          <select
            id="decimals"
            value={decimals}
            onChange={(e) => setDecimals(Number(e.target.value) as 1 | 2 | 3)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 text-lg font-mono font-bold text-gray-900 bg-gray-50 focus:border-bikotic-blue focus:outline-none"
          >
            <option value={1}>Tenths</option>
            <option value={2}>Hundredths</option>
            <option value={3}>Thousandths</option>
          </select>
        </div>
        <p className="text-gray-400 text-sm mb-6">All laps are recorded to full precision — this controls what you see on screen for the shouted readout.</p>

        <button
          onClick={handleStart}
          className="w-full py-6 bg-bikotic-blue text-white text-2xl font-bold rounded-xl hover:bg-bikotic-blue-dark active:scale-[0.98] transition-all"
        >
          ⏱ START
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          <strong>Tip:</strong> Your screen will stay awake during a session. For the best experience, 
          turn your phone brightness up before starting. On iOS, you may need to allow fullscreen when prompted.
        </p>
      </div>
    </div>
  )
}
