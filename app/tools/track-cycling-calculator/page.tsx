'use client'

export default function TrackCyclingCalculator() {
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
                  onChange={() => (window as any).handleEventChange()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="flying200">Flying 200m</option>
                  <option value="500tt">500m Time Trial</option>
                  <option value="1000tt">1km Time Trial</option>
                  <option value="pursuit3k">Individual Pursuit - 3km</option>
                  <option value="pursuit4k" selected>Individual Pursuit - 4km</option>
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
                  defaultValue="4000"
                  min="200"
                  max="10000"
                  step="100"
                  onChange={() => (window as any).handleDistanceChange()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>

              {/* Track Length */}
              <div>
                <label htmlFor="trackLength" className="block mb-2 text-gray-700 font-semibold">
                  Track Length
                </label>
                <select 
                  id="trackLength"
                  onChange={() => (window as any).recalculate()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="250">250m (Standard Indoor)</option>
                  <option value="333.33">333.33m (Outdoor)</option>
                  <option value="400">400m</option>
                  <option value="custom">Custom</option>
                </select>
                <input 
                  type="number" 
                  id="trackLengthCustom"
                  placeholder="Custom track length"
                  min="100"
                  max="1000"
                  step="0.01"
                  onChange={() => (window as any).recalculate()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none mt-2 hidden"
                />
              </div>

              {/* Skill Level */}
              <div>
                <label htmlFor="skillLevel" className="block mb-2 text-gray-700 font-semibold">
                  Skill Level (for realistic targets)
                </label>
                <select 
                  id="skillLevel"
                  onChange={() => (window as any).handleSkillLevelChange()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate" selected>Intermediate</option>
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
                  defaultValue="52"
                  min="38"
                  max="60"
                  onChange={() => (window as any).recalculate()}
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
                  defaultValue="15"
                  min="11"
                  max="20"
                  onChange={() => (window as any).recalculate()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>

              {/* Wheel Size */}
              <div>
                <label htmlFor="wheelSize" className="block mb-2 text-gray-700 font-semibold">
                  Wheel Size (mm)
                </label>
                <input 
                  type="number" 
                  id="wheelSize" 
                  defaultValue="2100"
                  min="2000"
                  max="2200"
                  step="10"
                  onChange={() => (window as any).recalculate()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  700c with 23mm tire ≈ 2100mm
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
                  defaultValue="280"
                  min="10"
                  max="600"
                  step="0.1"
                  onChange={() => (window as any).handleTargetTimeChange()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  <span id="targetTimeFormatted">4:40.0</span>
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
              <div id="gearRatio" className="text-2xl font-bold text-bikotic-blue">3.47</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Gear Inches</div>
              <div id="gearInches" className="text-2xl font-bold text-bikotic-blue">90.5"</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Development</div>
              <div id="development" className="text-2xl font-bold text-bikotic-blue">7.28m</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Laps</div>
              <div id="totalLaps" className="text-2xl font-bold text-bikotic-blue">16</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Speed</div>
              <div id="avgSpeed" className="text-2xl font-bold text-bikotic-blue">51.4 kph</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Cadence</div>
              <div id="avgCadence" className="text-2xl font-bold text-bikotic-blue">118 rpm</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Avg Lap Time</div>
              <div id="avgLapTime" className="text-2xl font-bold text-bikotic-blue">17.50s</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Time</div>
              <div id="totalTime" className="text-2xl font-bold text-bikotic-blue">4:40.0</div>
            </div>

          </div>

          {/* Speed Unit Toggle */}
          <div className="mt-5 flex justify-end">
            <div className="flex border-2 border-bikotic-blue rounded-lg overflow-hidden">
              <button 
                id="speedUnitKph"
                className="px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark"
                onClick={() => (window as any).toggleSpeedUnit('kph')}
              >
                KPH
              </button>
              <button 
                id="speedUnitMph"
                className="px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50"
                onClick={() => (window as any).toggleSpeedUnit('mph')}
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
              onClick={() => (window as any).resetLaps()}
              className="px-4 py-2 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50"
            >
              Reset to Even Split
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-5">
            Edit individual lap times to plan your pacing strategy. Lock specific laps to preserve them while adjusting others. The first lap accounts for standing start.
          </p>

          <div id="lapTable" className="space-y-2">
            {/* Lap table will be generated here */}
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

      {/* JavaScript for calculations */}
      <script dangerouslySetInnerHTML={{__html: `
        let speedUnit = 'kph';
        let lapLocks = [];
        
        // Event preset data: [distance, beginner_time, intermediate_time, expert_time, typical_chainring, typical_cog]
        const eventPresets = {
          flying200: [200, 15.0, 12.5, 10.5, 54, 14],
          500tt: [500, 48.0, 40.0, 34.0, 53, 14],
          '1000tt': [1000, 85.0, 72.0, 63.0, 52, 15],
          pursuit3k: [3000, 270.0, 235.0, 215.0, 52, 15],
          pursuit4k: [4000, 330.0, 285.0, 260.0, 52, 15],
          teampursuit: [4000, 285.0, 250.0, 235.0, 50, 15],
          custom: [5000, 360.0, 300.0, 270.0, 52, 15]
        };
        
        window.handleEventChange = function() {
          const event = document.getElementById('eventPreset').value;
          const preset = eventPresets[event];
          
          if (preset) {
            document.getElementById('distance').value = preset[0];
            
            // Update target time based on current skill level
            const skillLevel = document.getElementById('skillLevel').value;
            let timeIndex = 2; // intermediate default
            if (skillLevel === 'beginner') timeIndex = 1;
            if (skillLevel === 'expert') timeIndex = 3;
            
            document.getElementById('targetTime').value = preset[timeIndex];
            document.getElementById('chainring').value = preset[4];
            document.getElementById('cog').value = preset[5];
          }
          
          recalculate();
        };
        
        window.handleSkillLevelChange = function() {
          const event = document.getElementById('eventPreset').value;
          const preset = eventPresets[event];
          const skillLevel = document.getElementById('skillLevel').value;
          
          if (preset) {
            let timeIndex = 2; // intermediate default
            if (skillLevel === 'beginner') timeIndex = 1;
            if (skillLevel === 'expert') timeIndex = 3;
            
            document.getElementById('targetTime').value = preset[timeIndex];
          }
          
          recalculate();
        };
        
        window.handleDistanceChange = function() {
          // Mark as custom if distance changed
          const eventSelect = document.getElementById('eventPreset');
          const currentEvent = eventSelect.value;
          const distance = parseFloat(document.getElementById('distance').value);
          const preset = eventPresets[currentEvent];
          
          if (preset && distance !== preset[0]) {
            eventSelect.value = 'custom';
          }
          
          recalculate();
        };
        
        window.handleTargetTimeChange = function() {
          recalculate();
        };
        
        window.toggleSpeedUnit = function(unit) {
          speedUnit = unit;
          
          // Update button styles
          const kphBtn = document.getElementById('speedUnitKph');
          const mphBtn = document.getElementById('speedUnitMph');
          
          if (unit === 'kph') {
            kphBtn.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
            mphBtn.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
          } else {
            mphBtn.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
            kphBtn.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
          }
          
          recalculate();
        };
        
        window.recalculate = function() {
          console.log('Recalculating...');
          
          // Get track length
          const trackLengthSelect = document.getElementById('trackLength');
          let trackLength;
          
          if (trackLengthSelect.value === 'custom') {
            document.getElementById('trackLengthCustom').classList.remove('hidden');
            trackLength = parseFloat(document.getElementById('trackLengthCustom').value) || 250;
          } else {
            document.getElementById('trackLengthCustom').classList.add('hidden');
            trackLength = parseFloat(trackLengthSelect.value);
          }
          
          // Get values
          const distance = parseFloat(document.getElementById('distance').value);
          const chainring = parseFloat(document.getElementById('chainring').value);
          const cog = parseFloat(document.getElementById('cog').value);
          const wheelSize = parseFloat(document.getElementById('wheelSize').value);
          const targetTime = parseFloat(document.getElementById('targetTime').value);
          
          // Calculate gear metrics
          const gearRatio = chainring / cog;
          const wheelCircumference = wheelSize * Math.PI / 1000; // in metres
          const development = gearRatio * wheelCircumference;
          const gearInches = gearRatio * (wheelSize / 25.4);
          
          // Calculate average speed needed
          const avgSpeedMps = distance / targetTime; // metres per second
          const avgSpeedKph = avgSpeedMps * 3.6;
          const avgSpeedMph = avgSpeedKph * 0.621371;
          
          // Calculate average cadence needed
          const avgCadence = (avgSpeedMps / development) * 60; // RPM
          
          // Calculate total laps
          const totalLaps = Math.ceil(distance / trackLength);
          
          // Calculate average lap time
          const avgLapTime = targetTime / totalLaps;
          
          // Update display
          document.getElementById('gearRatio').textContent = gearRatio.toFixed(2);
          document.getElementById('gearInches').textContent = gearInches.toFixed(1) + '"';
          document.getElementById('development').textContent = development.toFixed(2) + 'm';
          document.getElementById('totalLaps').textContent = totalLaps;
          document.getElementById('avgSpeed').textContent = speedUnit === 'kph' 
            ? avgSpeedKph.toFixed(1) + ' kph' 
            : avgSpeedMph.toFixed(1) + ' mph';
          document.getElementById('avgCadence').textContent = Math.round(avgCadence) + ' rpm';
          document.getElementById('avgLapTime').textContent = avgLapTime.toFixed(2) + 's';
          document.getElementById('totalTime').textContent = formatTime(targetTime);
          document.getElementById('targetTimeFormatted').textContent = formatTime(targetTime);
          
          // Generate lap table
          generateLapTable(totalLaps, targetTime, trackLength, development, avgSpeedKph, avgSpeedMph);
        };
        
        function formatTime(seconds) {
          const mins = Math.floor(seconds / 60);
          const secs = (seconds % 60).toFixed(1);
          return mins > 0 ? mins + ':' + (secs < 10 ? '0' : '') + secs : secs + 's';
        }
        
        function generateLapTable(totalLaps, targetTime, trackLength, development, avgSpeedKph, avgSpeedMph) {
          const lapTableElement = document.getElementById('lapTable');
          if (!lapTableElement) {
            console.error('Lap table element not found');
            return;
          }
          
          let laps = [];
          
          // Check if we have existing lap times
          const existingInputs = lapTableElement.querySelectorAll('.lap-time-input');
          
          if (existingInputs.length === totalLaps) {
            // Use existing lap times
            existingInputs.forEach((input, i) => {
              laps.push({
                lapTime: parseFloat(input.value),
                locked: lapLocks[i] || false
              });
            });
            
            // Adjust unlocked laps to match target time
            const lockedTime = laps.reduce((sum, lap, i) => lap.locked ? sum + lap.lapTime : sum, 0);
            const unlockedCount = laps.filter(lap => !lap.locked).length;
            const remainingTime = targetTime - lockedTime;
            const unlockedLapTime = unlockedCount > 0 ? remainingTime / unlockedCount : 0;
            
            laps = laps.map(lap => lap.locked ? lap : { lapTime: unlockedLapTime, locked: false });
          } else {
            // Generate new lap times
            lapLocks = [];
            const avgLapTime = targetTime / totalLaps;
            
            // First lap is slower (standing start) - 20% slower for pursuits, 15% for sprints
            const standingStartPenalty = totalLaps > 4 ? 0.20 : 0.15;
            const firstLapTime = avgLapTime * (1 + standingStartPenalty);
            
            // Remaining time distributed evenly
            const remainingTime = targetTime - firstLapTime;
            const remainingLaps = totalLaps - 1;
            const otherLapTime = remainingLaps > 0 ? remainingTime / remainingLaps : 0;
            
            laps = [{lapTime: firstLapTime, locked: false}];
            for (let i = 1; i < totalLaps; i++) {
              laps.push({lapTime: otherLapTime, locked: false});
            }
          }
          
          // Generate HTML
          let html = '<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-bikotic-blue text-white"><th class="p-2 text-left">Lap</th><th class="p-2 text-center">Lap Time (s)</th><th class="p-2 text-center">Speed</th><th class="p-2 text-center">Cadence</th><th class="p-2 text-center">Cumulative</th><th class="p-2 text-center">Lock</th></tr></thead><tbody>';
          
          let cumulativeTime = 0;
          
          laps.forEach((lap, i) => {
            cumulativeTime += lap.lapTime;
            
            // Calculate speed for this lap
            const lapSpeedMps = trackLength / lap.lapTime;
            const lapSpeedKph = lapSpeedMps * 3.6;
            const lapSpeedMph = lapSpeedKph * 0.621371;
            const lapSpeed = speedUnit === 'kph' ? lapSpeedKph.toFixed(1) + ' kph' : lapSpeedMph.toFixed(1) + ' mph';
            
            // Calculate cadence for this lap
            const lapCadence = Math.round((lapSpeedMps / development) * 60);
            
            const rowClass = i % 2 === 0 ? 'bg-white' : 'bg-gray-50';
            const lockIcon = lap.locked ? '🔒' : '🔓';
            const lockClass = lap.locked ? 'text-bikotic-blue' : 'text-gray-400';
            
            html += '<tr class="' + rowClass + ' border-b border-gray-200">';
            html += '<td class="p-2 font-semibold">' + (i + 1) + (i === 0 ? ' (start)' : '') + '</td>';
            html += '<td class="p-2 text-center"><input type="number" class="lap-time-input w-20 px-2 py-1 border border-gray-300 rounded text-center" value="' + lap.lapTime.toFixed(2) + '" step="0.1" min="5" onchange="window.updateLapTime(' + i + ', this.value)" /></td>';
            html += '<td class="p-2 text-center">' + lapSpeed + '</td>';
            html += '<td class="p-2 text-center">' + lapCadence + ' rpm</td>';
            html += '<td class="p-2 text-center">' + formatTime(cumulativeTime) + '</td>';
            html += '<td class="p-2 text-center"><button onclick="window.toggleLapLock(' + i + ')" class="' + lockClass + ' text-xl hover:scale-110 transition-transform">' + lockIcon + '</button></td>';
            html += '</tr>';
          });
          
          html += '</tbody></table></div>';
          
          const lapTableElement = document.getElementById('lapTable');
          if (lapTableElement) {
            lapTableElement.innerHTML = html;
          }
        }
        
        window.updateLapTime = function(lapIndex, newTime) {
          const lapInputs = document.querySelectorAll('.lap-time-input');
          const totalLaps = lapInputs.length;
          
          // Calculate new total time
          let newTotalTime = 0;
          lapInputs.forEach((input, i) => {
            if (i === lapIndex) {
              newTotalTime += parseFloat(newTime);
            } else {
              newTotalTime += parseFloat(input.value);
            }
          });
          
          // Update target time
          document.getElementById('targetTime').value = newTotalTime.toFixed(1);
          
          // Recalculate
          recalculate();
        };
        
        window.toggleLapLock = function(lapIndex) {
          if (!lapLocks[lapIndex]) {
            lapLocks[lapIndex] = true;
          } else {
            lapLocks[lapIndex] = false;
          }
          recalculate();
        };
        
        window.resetLaps = function() {
          lapLocks = [];
          recalculate();
        };
        
        // Handle track length dropdown
        document.getElementById('trackLength').addEventListener('change', function() {
          if (this.value === 'custom') {
            document.getElementById('trackLengthCustom').classList.remove('hidden');
          } else {
            document.getElementById('trackLengthCustom').classList.add('hidden');
          }
          recalculate();
        });
        
        // Initialize on load
        if (typeof window !== 'undefined') {
          window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              window.handleEventChange();
            }, 50);
          });
          
          // Fallback initialization
          setTimeout(function() {
            if (document.getElementById('lapTable').innerHTML === '') {
              window.handleEventChange();
            }
          }, 500);
        }
      `}} />
    </main>
  )
}
