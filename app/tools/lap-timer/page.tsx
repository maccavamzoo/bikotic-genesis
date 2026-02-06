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

    const lap: Lap = {
      number: laps.length + 1,
      timeMs: totalMs,
      splitMs: splitMs,
    }

    setLaps(prev => [...prev, lap])
    setLastLapTime(splitMs)

    // Flash effect
    setFlashActive(true)
    setTimeout(() => setFlashActive(false), 200)
  }, [laps.length])

  const handleStop = useCallback(() => {
    // Record final lap from last lap mark to now
    const now = performance.now()
    const splitMs = now - lastLapTimeRef.current
    const totalMs = now - startTimeRef.current

    const finalLap: Lap = {
      number: laps.length + 1,
      timeMs: totalMs,
      splitMs: splitMs,
    }

    setLaps(prev => [...prev, finalLap])
    cancelAnimationFrame(animFrameRef.current)
    setElapsed(totalMs)
    setState('stopped')
    releaseWakeLock()
    exitFullscreen()
  }, [laps.length, releaseWakeLock, exitFullscreen])

  const handleReset = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    setElapsed(0)
    setLaps([])
    setLastLapTime(null)
    setState('idle')
    releaseWakeLock()
  }, [releaseWakeLock])

  // ─── RUNNING STATE (fullscreen optimised) ───
  if (state === 'running') {
    return (
      <div
        className="fixed inset-0 bg-black flex flex-col select-none z-[9999]"
        style={{ touchAction: 'manipulation' }}
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
            onClick={handleStop}
            className="text-red-400 text-sm font-bold uppercase tracking-widest px-4 py-2 border border-red-400/30 rounded active:bg-red-400/20"
          >
            Stop
          </button>
        </div>

        {/* Centre: last lap time */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {lastLapTime !== null ? (
            <>
              <div className="text-gray-500 text-xl font-mono tracking-widest mb-2">
                LAP {laps.length}
              </div>
              <div
                className="text-white font-mono font-bold leading-none text-center w-full px-4"
                style={{ fontSize: 'min(22vw, 20vh)' }}
              >
                {formatTime(lastLapTime, decimals)}
              </div>
            </>
          ) : (
            <div className="text-gray-600 text-2xl font-mono tracking-widest">
              WAITING FOR FIRST LAP
            </div>
          )}
        </div>

        {/* Previous lap (small, for reference) */}
        {laps.length >= 2 && (
          <div className="text-center pb-2">
            <span className="text-gray-600 font-mono text-sm">
              Lap {laps.length - 1}: {formatTime(laps[laps.length - 2].splitMs, decimals)}
            </span>
          </div>
        )}

        {/* Lap button: massive tap target */}
        <div className="p-4 pb-8">
          <button
            onClick={handleLap}
            className="w-full py-8 rounded-2xl bg-bikotic-blue text-white text-3xl font-bold uppercase tracking-widest active:bg-bikotic-blue-dark active:scale-[0.98] transition-transform"
          >
            ⏱ LAP
          </button>
        </div>
      </div>
    )
  }

  // ─── STOPPED STATE (session summary) ───
  if (state === 'stopped') {
    // Calculate stats
    const lapSplits = laps.map(l => l.splitMs)
    const fastest = Math.min(...lapSplits)
    const slowest = Math.max(...lapSplits)
    const average = lapSplits.reduce((a, b) => a + b, 0) / lapSplits.length

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Session Complete</h1>
        <p className="text-gray-500 mb-6">
          {laps.length} laps · Total time: {formatTime(elapsed, 3)}
        </p>

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
                const isFastest = lap.splitMs === fastest
                const isSlowest = lap.splitMs === slowest && laps.length > 1
                return (
                  <tr
                    key={lap.number}
                    className={`border-b border-gray-100 ${isFastest ? 'bg-green-50' : isSlowest ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-4 py-3 font-mono text-gray-700">
                      {lap.number}
                      {isFastest && <span className="ml-2 text-green-600 text-xs font-bold">FASTEST</span>}
                      {isSlowest && <span className="ml-2 text-red-500 text-xs font-bold">SLOWEST</span>}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-right text-gray-900">
                      {formatTime(lap.splitMs, 3)}
                    </td>
                    <td className="px-4 py-3 font-mono text-right text-gray-500">
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
