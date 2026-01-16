'use client'

import { useState, useEffect } from 'react'

export default function TrackCyclingCalculator() {
  const [speedUnit, setSpeedUnit] = useState<'kph' | 'mph'>('kph')
  const [event, setEvent] = useState('pursuit4k')
  const [distance, setDistance] = useState(4000)
  const [trackLength, setTrackLength] = useState(250)
  const [trackLengthPreset, setTrackLengthPreset] = useState('250')
  const [skillLevel, setSkillLevel] = useState('intermediate')
  const [chainring, setChainring] = useState(52)
  const [cog, setCog] = useState(15)
  const [wheelSize, setWheelSize] = useState(2100)
  const [targetTime, setTargetTime] = useState(280)
  const [lapTimes, setLapTimes] = useState<number[]>([])
  const [lapLocks, setLapLocks] = useState<boolean[]>([])

  // Event preset data: [distance, beginner_time, intermediate_time, expert_time, typical_chainring, typical_cog]
  const eventPresets: Record<string, [number, number, number, number, number, number]> = {
    flying200: [200, 15.0, 12.5, 10.5, 54, 14],
    '500tt': [500, 48.0, 40.0, 34.0, 53, 14],
    '1000tt': [1000, 85.0, 72.0, 63.0, 52, 15],
    pursuit3k: [3000, 270.0, 235.0, 215.0, 52, 15],
    pursuit4k: [4000, 330.0, 285.0, 260.0, 52, 15],
    teampursuit: [4000, 285.0, 250.0, 235.0, 50, 15],
    custom: [5000, 360.0, 300.0, 270.0, 52, 15]
  }

  // Calculate gear metrics
  const gearRatio = chainring / cog
  const wheelCircumference = wheelSize / 1000 // wheelSize is already circumference in mm, convert to metres
  const development = gearRatio * wheelCircumference
  const wheelDiameter = wheelSize / Math.PI // calculate diameter from circumference for gear inches
  const gearInches = gearRatio * (wheelDiameter / 25.4)

  // Calculate average speed needed
  const avgSpeedMps = distance / targetTime
  const avgSpeedKph = avgSpeedMps * 3.6
  const avgSpeedMph = avgSpeedKph * 0.621371

  // Calculate average cadence
  const avgCadence = Math.round((avgSpeedMps / development) * 60)

  // Calculate total laps
  const totalLaps = Math.ceil(distance / trackLength)

  // Calculate average lap time
  const avgLapTime = targetTime / totalLaps

  // Handle event change
  const handleEventChange = (newEvent: string) => {
    setEvent(newEvent)
    const preset = eventPresets[newEvent]
    if (preset) {
      setDistance(preset[0])
      
      let timeIndex = 2 // intermediate default
      if (skillLevel === 'beginner') timeIndex = 1
      if (skillLevel === 'expert') timeIndex = 3
      
      setTargetTime(preset[timeIndex])
      setChainring(preset[4])
      setCog(preset[5])
    }
  }

  // Handle skill level change
  const handleSkillLevelChange = (newLevel: string) => {
    setSkillLevel(newLevel)
    const preset = eventPresets[event]
    if (preset) {
      let timeIndex = 2
      if (newLevel === 'beginner') timeIndex = 1
      if (newLevel === 'expert') timeIndex = 3
      setTargetTime(preset[timeIndex])
    }
  }

  // Handle track length preset change
  const handleTrackLengthChange = (preset: string) => {
    setTrackLengthPreset(preset)
    if (preset !== 'custom') {
      setTrackLength(parseFloat(preset))
    }
  }

  // Generate lap times
  useEffect(() => {
    const standingStartPenalty = totalLaps > 4 ? 0.20 : 0.15
    const firstLapTime = avgLapTime * (1 + standingStartPenalty)
    const remainingTime = targetTime - firstLapTime
    const remainingLaps = totalLaps - 1
    const otherLapTime = remainingLaps > 0 ? remainingTime / remainingLaps : 0

    const newLapTimes = [firstLapTime]
    for (let i = 1; i < totalLaps; i++) {
      newLapTimes.push(otherLapTime)
    }

    // Only update if lap count changed
    if (lapTimes.length !== totalLaps) {
      setLapTimes(newLapTimes)
      setLapLocks(new Array(totalLaps).fill(false))
    }
  }, [totalLaps, targetTime, avgLapTime])

  // Update lap time
  const updateLapTime = (index: number, newTime: number) => {
    const newLapTimes = [...lapTimes]
    newLapTimes[index] = newTime
    setLapTimes(newLapTimes)
    
    const newTotal = newLapTimes.reduce((sum, t) => sum + t, 0)
    setTargetTime(newTotal)
  }

  // Toggle lap lock
  const toggleLapLock = (index: number) => {
    const newLocks = [...lapLocks]
    newLocks[index] = !newLocks[index]
    setLapLocks(newLocks)
  }

  // Reset laps
  const resetLaps = () => {
    setLapLocks(new Array(totalLaps).fill(false))
    
    const standingStartPenalty = totalLaps > 4 ? 0.20 : 0.15
    const firstLapTime = avgLapTime * (1 + standingStartPenalty)
    const remainingTime = targetTime - firstLapTime
    const remainingLaps = totalLaps - 1
    const otherLapTime = remainingLaps > 0 ? remainingTime / remainingLaps : 0

    const newLapTimes = [firstLapTime]
    for (let i = 1; i < totalLaps; i++) {
      newLapTimes.push(otherLapTime)
    }
    setLapTimes(newLapTimes)
  }

  // Format time as MM:SS.S
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(1)
    return mins > 0 ? `${mins}:${parseFloat(secs) < 10 ? '0' : ''}${secs}` : `${secs}s`
  }

  // Calculate lap metrics
  const calculateLapMetrics = (lapTime: number) => {
    const lapSpeedMps = trackLength / lapTime
    const lapSpeedKph = lapSpeedMps * 3.6
    const lapSpeedMph = lapSpeedKph * 0.621371
    const lapCadence = Math.round((lapSpeedMps / development) * 60)
    
    return {
      speed: speedUnit === 'kph' ? `${lapSpeedKph.toFixed(1)} kph` : `${lapSpeedMph.toFixed(1)} mph`,
      cadence: `${lapCadence} rpm`
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 font-sans bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Track Cycling Calculator
          </h1>
          <div className="text-lg text-[#525252] max-w-4xl space-y-3">
            <p>
              Plan your velodrome race strategy with precision. Calculate lap times, speeds, cadence, and gear ratios for pursuit and time trial events.
            </p>
            <p className="text-base">
              Choose your event and skill level to get realistic starting targets, then customize every detail. Edit any field and watch everything else update in real-time. Perfect for planning race pacing strategies and gear selection.
            </p>
          </div>
        </section>

        {/* Main Calculator Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
            Event & Settings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column - Event Settings */}
            <div className="space-y-5">
              
              {/* Event Preset */}
              <div>
                <label htmlFor="eventPreset" className="block mb-2 text-gray-700 font-semibold">
                  Event
                </label>
                <select 
                  id="eventPreset"
                  value={event}
                  onChange={(e) => handleEventChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="flying200">Flying 200m</option>
                  <option value="500tt">500m Time Trial</option>
                  <option value="1000tt">1km Time Trial</option>
                  <option value="pursuit3k">Individual Pursuit - 3km</option>
                  <option value="pursuit4k">Individual Pursuit - 4km</option>
                  <option value="teampursuit">Team Pursuit - 4km</option>
                  <option value="custom">Custom Distance</option>
                </select>
              </div>

              {/* Distance */}
              <div>
                <label htmlFor="distance" className="block mb-2 text-gray-700 font-semibold">
                  Distance (metres)
                </label>
                <input 
                  type="number" 
                  id="distance" 
                  value={distance}
                  onChange={(e) => {
                    setDistance(parseFloat(e.target.value) || 0)
                    if (eventPresets[event] && parseFloat(e.target.value) !== eventPresets[event][0]) {
                      setEvent('custom')
                    }
                  }}
                  min="200"
                  max="10000"
                  step="100"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>

              {/* Track Length */}
              <div>
                <label htmlFor="trackLength" className="block mb-2 text-gray-700 font-semibold">
                  Track Length
                </label>
                <select 
                  id="trackLengthSelect"
                  value={trackLengthPreset}
                  onChange={(e) => handleTrackLengthChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="250">250m (Standard Indoor)</option>
                  <option value="333.33">333.33m (Outdoor)</option>
                  <option value="400">400m</option>
                  <option value="custom">Custom</option>
                </select>
                {trackLengthPreset === 'custom' && (
                  <input 
                    type="number" 
                    value={trackLength}
                    onChange={(e) => setTrackLength(parseFloat(e.target.value) || 250)}
                    placeholder="Custom track length"
                    min="100"
                    max="1000"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none mt-2"
                  />
                )}
              </div>

              {/* Skill Level */}
              <div>
                <label htmlFor="skillLevel" className="block mb-2 text-gray-700 font-semibold">
                  Skill Level (for realistic targets)
                </label>
                <select 
                  id="skillLevel"
                  value={skillLevel}
                  onChange={(e) => handleSkillLevelChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Sets realistic target times and typical gear ratios for your level
                </p>
              </div>

            </div>

            {/* Right Column - Gear & Target */}
            <div className="space-y-5">
              
              {/* Chainring */}
              <div>
                <label htmlFor="chainring" className="block mb-2 text-gray-700 font-semibold">
                  Chainring (teeth)
                </label>
                <input 
                  type="number" 
                  id="chainring" 
                  value={chainring}
                  onChange={(e) => setChainring(parseFloat(e.target.value) || 52)}
                  min="38"
                  max="60"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>

              {/* Cog */}
              <div>
                <label htmlFor="cog" className="block mb-2 text-gray-700 font-semibold">
                  Cog (teeth)
                </label>
                <input 
                  type="number" 
                  id="cog" 
                  value={cog}
                  onChange={(e) => setCog(parseFloat(e.target.value) || 15)}
                  min="11"
                  max="20"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>

              {/* Wheel Size */}
              <div>
                <label htmlFor="wheelSize" className="block mb-2 text-gray-700 font-semibold">
                  Wheel Circumference (mm)
                </label>
                <input 
                  type="number" 
                  id="wheelSize" 
                  value={wheelSize}
                  onChange={(e) => setWheelSize(parseFloat(e.target.value) || 2100)}
                  min="2000"
                  max="2200"
                  step="10"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  622mm rim (700c) + 23mm tire both sides ≈ 2100mm
                </p>
              </div>

              {/* Target Total Time */}
              <div>
                <label htmlFor="targetTime" className="block mb-2 text-gray-700 font-semibold">
                  Target Total Time (seconds)
                </label>
                <input 
                  type="number" 
                  id="targetTime" 
                  value={targetTime}
                  onChange={(e) => setTargetTime(parseFloat(e.target.value) || 0)}
                  min="10"
                  max="600"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formatTime(targetTime)}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
            Calculated Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Gear Ratio</div>
              <div className="text-2xl font-bold text-bikotic-blue">{gearRatio.toFixed(2)}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Gear Inches</div>
              <div className="text-2xl font-bold text-bikotic-blue">{gearInches.toFixed(1)}&quot;</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Development</div>
              <div className="text-2xl font-bold text-bikotic-blue">{development.toFixed(2)}m</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Laps</div>
              <div className="text-2xl font-bold text-bikotic-blue">{totalLaps}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Speed</div>
              <div className="text-2xl font-bold text-bikotic-blue">
                {speedUnit === 'kph' ? avgSpeedKph.toFixed(1) : avgSpeedMph.toFixed(1)} {speedUnit}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Cadence</div>
              <div className="text-2xl font-bold text-bikotic-blue">{avgCadence} rpm</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Lap Time</div>
              <div className="text-2xl font-bold text-bikotic-blue">{avgLapTime.toFixed(2)}s</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Time</div>
              <div className="text-2xl font-bold text-bikotic-blue">{formatTime(targetTime)}</div>
            </div>

          </div>

          {/* Speed Unit Toggle */}
          <div className="mt-5 flex justify-end">
            <div className="flex border-2 border-bikotic-blue rounded-lg overflow-hidden">
              <button 
                className={`px-4 py-2 font-semibold transition-colors ${
                  speedUnit === 'kph'
                    ? 'bg-bikotic-blue text-white hover:bg-bikotic-blue-dark'
                    : 'bg-white text-bikotic-blue hover:bg-gray-50'
                }`}
                onClick={() => setSpeedUnit('kph')}
              >
                KPH
              </button>
              <button 
                className={`px-4 py-2 font-semibold transition-colors ${
                  speedUnit === 'mph'
                    ? 'bg-bikotic-blue text-white hover:bg-bikotic-blue-dark'
                    : 'bg-white text-bikotic-blue hover:bg-gray-50'
                }`}
                onClick={() => setSpeedUnit('mph')}
              >
                MPH
              </button>
            </div>
          </div>
        </div>

        {/* Lap by Lap Strategy */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-bikotic-blue">
            <h2 className="text-2xl font-bold text-gray-900">
              Lap-by-Lap Strategy
            </h2>
            <button
              onClick={resetLaps}
              className="px-4 py-2 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50"
            >
              Reset to Even Split
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-5">
            Edit individual lap times to plan your pacing strategy. Lock specific laps to preserve them while adjusting others. The first lap accounts for standing start.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bikotic-blue text-white">
                  <th className="p-2 text-left">Lap</th>
                  <th className="p-2 text-center">Lap Time (s)</th>
                  <th className="p-2 text-center">Speed</th>
                  <th className="p-2 text-center">Cadence</th>
                  <th className="p-2 text-center">Cumulative</th>
                  <th className="p-2 text-center">Lock</th>
                </tr>
              </thead>
              <tbody>
                {lapTimes.map((lapTime, i) => {
                  const metrics = calculateLapMetrics(lapTime)
                  const cumulativeTime = lapTimes.slice(0, i + 1).reduce((sum, t) => sum + t, 0)
                  const rowClass = i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  
                  return (
                    <tr key={i} className={`${rowClass} border-b border-gray-200`}>
                      <td className="p-2 font-semibold">
                        {i + 1}{i === 0 ? ' (start)' : ''}
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                          value={lapTime.toFixed(2)}
                          onChange={(e) => updateLapTime(i, parseFloat(e.target.value) || 0)}
                          step="0.1"
                          min="5"
                        />
                      </td>
                      <td className="p-2 text-center">{metrics.speed}</td>
                      <td className="p-2 text-center">{metrics.cadence}</td>
                      <td className="p-2 text-center">{formatTime(cumulativeTime)}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => toggleLapLock(i)}
                          className={`text-xl hover:scale-110 transition-transform ${
                            lapLocks[i] ? 'text-bikotic-blue' : 'text-gray-400'
                          }`}
                        >
                          {lapLocks[i] ? '🔒' : '🔓'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-4 bg-blue-50 border-l-4 border-bikotic-blue rounded">
            <div className="font-semibold text-gray-800 mb-1">Strategy Notes:</div>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>First lap is typically 15-25% slower due to standing start</li>
              <li>Lock specific laps to preserve your pacing plan</li>
              <li>Edit any lap time directly - total time updates automatically</li>
              <li>Unlocked laps adjust proportionally when total time changes</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}
