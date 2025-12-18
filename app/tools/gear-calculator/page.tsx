'use client'

export default function GearCalculator() {
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Bike Gear Ratio Calculator
          </h1>
          <div className="text-lg text-[#525252] max-w-4xl space-y-3">
            <p>
              Compare gear ratios side-by-side between two bikes. Calculate speeds at different cadences, gear inches, development, gain ratios, and identify overlapping gears in 2x setups.
            </p>
            <p className="text-base">
              Choose your calculation method, input your chainring and cassette combinations, then see which bike gives you the gears you actually need. Color-coded overlaps show which gears are redundant in 2x systems.
            </p>
          </div>
        </section>

        {/* Global Controls */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left side - Controls */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-gray-700">Speed Units:</label>
                <div className="flex border-2 border-bikotic-blue rounded-lg overflow-hidden">
                  <button 
                    className="px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark"
                    onClick={(e) => (window as any).toggleSpeed('mph', e)}
                  >
                    MPH
                  </button>
                  <button 
                    className="px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50"
                    onClick={(e) => (window as any).toggleSpeed('kph', e)}
                  >
                    KPH
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="crank" className="font-semibold text-gray-700">Crank Length (mm):</label>
                <input 
                  type="number" 
                  id="crank" 
                  defaultValue="172.5" 
                  min="165" 
                  max="180" 
                  step="2.5"
                  onChange={() => (window as any).updateBoth()}
                  className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                />
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="cadence" className="font-semibold text-gray-700">Cadence (RPM):</label>
                <input 
                  type="number" 
                  id="cadence" 
                  defaultValue="90" 
                  min="60" 
                  max="120"
                  onChange={() => (window as any).updateBoth()}
                  className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                />
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="method" className="font-semibold text-gray-700">Calculation Method:</label>
                <select 
                  id="method"
                  onChange={() => (window as any).handleMethodChange()}
                  className="w-52 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                >
                  <option value="ratio">Simple Ratio</option>
                  <option value="inches">Gear Inches</option>
                  <option value="development">Development (m/rev)</option>
                  <option value="gain">Gain Ratio</option>
                  <option value="speed">Speed at Cadence</option>
                </select>
              </div>
            </div>

            {/* Right side - Method Explanations */}
            <div className="text-sm text-gray-600 leading-relaxed">
              <div id="info-ratio" className="method-info active">
                <strong className="text-bikotic-blue">Simple Ratio:</strong> Basic gear ratio (chainring teeth ÷ cassette teeth). Higher numbers = harder to pedal, faster speeds.
              </div>
              <div id="info-inches" className="method-info hidden">
                <strong className="text-bikotic-blue">Gear Inches:</strong> The diameter of a penny-farthing wheel that would give the same mechanical advantage. Standard in the US.
              </div>
              <div id="info-development" className="method-info hidden">
                <strong className="text-bikotic-blue">Development (m/rev):</strong> Distance traveled per pedal revolution in metres. Popular in Europe and track cycling.
              </div>
              <div id="info-gain" className="method-info hidden">
                <strong className="text-bikotic-blue">Gain Ratio:</strong> Gear ratio × (wheel radius ÷ crank length). More accurate representation of mechanical advantage.
              </div>
              <div id="info-speed" className="method-info hidden">
                <strong className="text-bikotic-blue">Speed at Cadence:</strong> Speed you'll achieve at your set cadence RPM. Most practical for real-world riding.
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tooltip */}
        <div id="tooltip" className="hidden fixed bg-gray-900 text-white px-3 py-2 rounded text-sm pointer-events-none z-50"></div>

        {/* Bike Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bike A */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
              Bike A
            </h2>

            {/* Chainring Setup */}
            <div className="mb-5">
              <label className="block mb-2 text-gray-700 font-medium text-sm">Chainring Setup</label>
              <div className="flex gap-2 mb-3">
                <button 
                  className="flex-1 py-2 px-4 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50"
                  onClick={(e) => (window as any).setupRings('A', '1x', e)}
                >
                  1x
                </button>
                <button 
                  className="flex-1 py-2 px-4 border-2 border-bikotic-blue bg-bikotic-blue text-white rounded-lg font-semibold transition-colors hover:bg-bikotic-blue-dark active"
                  onClick={(e) => (window as any).setupRings('A', '2x', e)}
                >
                  2x
                </button>
              </div>
              <div id="ringsA" className="flex gap-2">
                <input 
                  type="number" 
                  id="ring1A" 
                  placeholder="Small chainring" 
                  min="20" 
                  max="60" 
                  defaultValue="34"
                  onChange={() => (window as any).updateBoth()}
                  className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
                <input 
                  type="number" 
                  id="ring2A" 
                  placeholder="Large chainring" 
                  min="20" 
                  max="60" 
                  defaultValue="50"
                  onChange={() => (window as any).updateBoth()}
                  className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>
            </div>

            {/* Cassette */}
            <div className="mb-5">
              <label htmlFor="cassetteA" className="block mb-2 text-gray-700 font-medium text-sm">
                Cassette (comma separated)
              </label>
              <input 
                type="text" 
                id="cassetteA" 
                defaultValue="11,12,13,14,15,17,19,21,23,25,28"
                onChange={() => (window as any).updateBoth()}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
              />
            </div>

            {/* Wheel & Tyre */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1">
                <label htmlFor="wheelA" className="block mb-2 text-gray-700 font-medium text-sm">Wheel Size</label>
                <select 
                  id="wheelA"
                  onChange={() => (window as any).updateBoth()}
                  className="wheel-tyre-input w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                >
                  <option value="622">700c (622mm)</option>
                  <option value="559">26" (559mm)</option>
                  <option value="584">27.5" / 650B (584mm)</option>
                  <option value="635">28" (635mm)</option>
                  <option value="630">27" (630mm)</option>
                  <option value="571">650C (571mm)</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="tyreA" className="block mb-2 text-gray-700 font-medium text-sm">Tyre Width (mm)</label>
                <input 
                  type="number" 
                  id="tyreA" 
                  defaultValue="25" 
                  min="15" 
                  max="60"
                  onChange={() => (window as any).updateBoth()}
                  className="wheel-tyre-input w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 rounded-lg p-5 mt-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Gear Analysis</h3>
              <div id="chartA" className="bg-white rounded-lg p-4 mb-4 shadow-sm"></div>
              <div id="tableA"></div>
              <div id="summaryA" className="bg-bikotic-blue/10 rounded-lg p-3 mt-3 text-center font-semibold text-bikotic-blue"></div>
              <div id="legendA" className="mt-3 p-3 bg-white rounded-lg text-sm text-gray-600"></div>
            </div>
          </div>

          {/* Bike B */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
              Bike B
            </h2>

            {/* Chainring Setup */}
            <div className="mb-5">
              <label className="block mb-2 text-gray-700 font-medium text-sm">Chainring Setup</label>
              <div className="flex gap-2 mb-3">
                <button 
                  className="flex-1 py-2 px-4 border-2 border-bikotic-blue bg-bikotic-blue text-white rounded-lg font-semibold transition-colors hover:bg-bikotic-blue-dark active"
                  onClick={(e) => (window as any).setupRings('B', '1x', e)}
                >
                  1x
                </button>
                <button 
                  className="flex-1 py-2 px-4 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50"
                  onClick={(e) => (window as any).setupRings('B', '2x', e)}
                >
                  2x
                </button>
              </div>
              <div id="ringsB" className="flex gap-2">
                <input 
                  type="number" 
                  id="ring1B" 
                  placeholder="Chainring" 
                  min="20" 
                  max="60" 
                  defaultValue="46"
                  onChange={() => (window as any).updateBoth()}
                  className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
                />
              </div>
            </div>

            {/* Cassette */}
            <div className="mb-5">
              <label htmlFor="cassetteB" className="block mb-2 text-gray-700 font-medium text-sm">
                Cassette (comma separated)
              </label>
              <input 
                type="text" 
                id="cassetteB" 
                defaultValue="10,11,12,13,15,17,19,21,24,28,32,38,46"
                onChange={() => (window as any).updateBoth()}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
              />
            </div>

            {/* Wheel & Tyre */}
            <div className="flex gap-3 mb-5">
              <div className="flex-1">
                <label htmlFor="wheelB" className="block mb-2 text-gray-700 font-medium text-sm">Wheel Size</label>
                <select 
                  id="wheelB"
                  onChange={() => (window as any).updateBoth()}
                  className="wheel-tyre-input w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                >
                  <option value="622">700c (622mm)</option>
                  <option value="559">26" (559mm)</option>
                  <option value="584">27.5" / 650B (584mm)</option>
                  <option value="635">28" (635mm)</option>
                  <option value="630">27" (630mm)</option>
                  <option value="571">650C (571mm)</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="tyreB" className="block mb-2 text-gray-700 font-medium text-sm">Tyre Width (mm)</label>
                <input 
                  type="number" 
                  id="tyreB" 
                  defaultValue="25" 
                  min="15" 
                  max="60"
                  onChange={() => (window as any).updateBoth()}
                  className="wheel-tyre-input w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none transition-opacity"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 rounded-lg p-5 mt-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Gear Analysis</h3>
              <div id="chartB" className="bg-white rounded-lg p-4 mb-4 shadow-sm"></div>
              <div id="tableB"></div>
              <div id="summaryB" className="bg-bikotic-blue/10 rounded-lg p-3 mt-3 text-center font-semibold text-bikotic-blue"></div>
              <div id="legendB" className="mt-3 p-3 bg-white rounded-lg text-sm text-gray-600"></div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <section className="mt-12 bg-white border-2 border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-3">
              <strong>1. Choose your calculation method</strong> - Simple ratio for basic comparison, gear inches for US riders, development for European/track riders, gain ratio for accurate mechanical advantage, or speed for practical real-world use.
            </p>
            <p className="mb-3">
              <strong>2. Set up each bike</strong> - Select 1x or 2x chainring setup, enter your chainring sizes, cassette ratios (comma separated), wheel size, and tyre width.
            </p>
            <p className="mb-3">
              <strong>3. Adjust cadence and crank length</strong> - Set your preferred cadence (typically 80-100 RPM) and crank arm length if you know it.
            </p>
            <p>
              <strong>4. Compare the results</strong> - Matching colours show overlapping gears. The visual charts scale relative to each other so you can see which bike has the wider or taller gear range. Usable gears count tells you how many truly different gears you have after accounting for overlaps.
            </p>
          </div>
        </section>

      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        let speedUnit = 'mph';
        let dataA = null;
        let dataB = null;
        
        window.handleMethodChange = function() {
          const method = document.getElementById('method').value;
          const wheelTyreInputs = document.querySelectorAll('.wheel-tyre-input');
          const crankInput = document.getElementById('crank');
          const cadenceInput = document.getElementById('cadence');
          
          // ratio: disable wheel, tyre, crank, cadence
          // inches: disable crank, cadence
          // development: disable crank, cadence
          // gain: disable cadence
          // speed: disable crank
          
          if (method === 'ratio') {
            wheelTyreInputs.forEach(el => {
              el.disabled = true;
              el.style.opacity = '0.5';
              el.style.cursor = 'not-allowed';
            });
            crankInput.disabled = true;
            crankInput.style.opacity = '0.5';
            crankInput.style.cursor = 'not-allowed';
            cadenceInput.disabled = true;
            cadenceInput.style.opacity = '0.5';
            cadenceInput.style.cursor = 'not-allowed';
          } else if (method === 'inches' || method === 'development') {
            wheelTyreInputs.forEach(el => {
              el.disabled = false;
              el.style.opacity = '1';
              el.style.cursor = 'pointer';
            });
            crankInput.disabled = true;
            crankInput.style.opacity = '0.5';
            crankInput.style.cursor = 'not-allowed';
            cadenceInput.disabled = true;
            cadenceInput.style.opacity = '0.5';
            cadenceInput.style.cursor = 'not-allowed';
          } else if (method === 'gain') {
            wheelTyreInputs.forEach(el => {
              el.disabled = false;
              el.style.opacity = '1';
              el.style.cursor = 'pointer';
            });
            crankInput.disabled = false;
            crankInput.style.opacity = '1';
            crankInput.style.cursor = 'text';
            cadenceInput.disabled = true;
            cadenceInput.style.opacity = '0.5';
            cadenceInput.style.cursor = 'not-allowed';
          } else if (method === 'speed') {
            wheelTyreInputs.forEach(el => {
              el.disabled = false;
              el.style.opacity = '1';
              el.style.cursor = 'pointer';
            });
            crankInput.disabled = true;
            crankInput.style.opacity = '0.5';
            crankInput.style.cursor = 'not-allowed';
            cadenceInput.disabled = false;
            cadenceInput.style.opacity = '1';
            cadenceInput.style.cursor = 'text';
          }
          
          updateBoth();
        }
        
        window.toggleSpeed = function(unit, event) {
          speedUnit = unit;
          const buttons = event.target.parentElement.querySelectorAll('button');
          buttons.forEach(b => {
            b.classList.remove('bg-bikotic-blue', 'text-white');
            b.classList.add('bg-white', 'text-bikotic-blue');
          });
          event.target.classList.remove('bg-white', 'text-bikotic-blue');
          event.target.classList.add('bg-bikotic-blue', 'text-white');
          updateBoth();
        }
        
        window.updateBoth = function() {
          updateInfo();
          dataA = calcGears('A');
          dataB = calcGears('B');
          
          if (dataA && dataB) {
            const allVals = [...dataA.gears.map(g => parseFloat(g.val)), ...dataB.gears.map(g => parseFloat(g.val))];
            const min = Math.min(...allVals);
            const max = Math.max(...allVals);
            const range = max - min;
            
            showChart(dataA.gears, dataA.overlaps, 'A', min, range);
            showChart(dataB.gears, dataB.overlaps, 'B', min, range);
            showTable(dataA, 'A');
            showTable(dataB, 'B');
          }
        }
        
        function updateInfo() {
          document.querySelectorAll('.method-info').forEach(d => {
            d.classList.remove('active');
            d.classList.add('hidden');
          });
          const method = document.getElementById('method').value;
          const info = document.getElementById('info-' + method);
          if (info) {
            info.classList.remove('hidden');
            info.classList.add('active');
          }
        }
        
        window.setupRings = function(bike, type, event) {
          const container = document.getElementById('rings' + bike);
          const buttons = event.target.parentElement.querySelectorAll('button');
          buttons.forEach(b => {
            b.classList.remove('bg-bikotic-blue', 'text-white');
            b.classList.add('bg-white', 'text-bikotic-blue');
          });
          event.target.classList.remove('bg-white', 'text-bikotic-blue');
          event.target.classList.add('bg-bikotic-blue', 'text-white');
          
          const inputClass = "flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none";
          
          if (type === '1x') {
            const defaultVal = bike === 'B' ? '46' : '32';
            container.innerHTML = '<input type="number" id="ring1' + bike + '" placeholder="Chainring teeth" min="20" max="60" value="' + defaultVal + '" onchange="window.updateBoth()" class="' + inputClass + '">';
          } else {
            container.innerHTML = '<input type="number" id="ring1' + bike + '" placeholder="Small chainring" min="20" max="60" value="34" onchange="window.updateBoth()" class="' + inputClass + '">' +
                                '<input type="number" id="ring2' + bike + '" placeholder="Large chainring" min="20" max="60" value="50" onchange="window.updateBoth()" class="' + inputClass + '">';
          }
          window.updateBoth();
        }
        
        function calcGears(bike) {
          const rings = [];
          const r1 = document.getElementById('ring1' + bike);
          const r2 = document.getElementById('ring2' + bike);
          
          if (r1 && r1.value) rings.push(parseInt(r1.value));
          if (r2 && r2.value) rings.push(parseInt(r2.value));
          
          const cassetteText = document.getElementById('cassette' + bike).value;
          const cassette = cassetteText.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
          
          if (rings.length === 0 || cassette.length === 0) return null;
          
          const wheelDia = parseInt(document.getElementById('wheel' + bike).value);
          const tyreWidth = parseInt(document.getElementById('tyre' + bike).value || 0);
          const cadence = parseInt(document.getElementById('cadence').value || 90);
          const crankLen = parseFloat(document.getElementById('crank').value || 172.5);
          const method = document.getElementById('method').value;
          
          const wheelCirc = Math.PI * (wheelDia + 2 * tyreWidth) / 1000;
          const wheelRad = (wheelDia + 2 * tyreWidth) / 2000;
          const wheelInches = (wheelDia + 2 * tyreWidth) / 25.4;
          
          const gears = [];
          rings.forEach(ring => {
            cassette.forEach(cog => {
              const ratio = ring / cog;
              const speedMs = ratio * wheelCirc * cadence / 60;
              const speedMph = speedMs * 2.237;
              const speedKph = speedMs * 3.6;
              const dev = ratio * wheelCirc;
              const inches = ratio * wheelInches;
              const gain = ratio * (wheelRad / (crankLen / 1000));
              
              let val, unit;
              switch (method) {
                case 'ratio':
                  val = ratio.toFixed(2);
                  unit = '';
                  break;
                case 'inches':
                  val = inches.toFixed(1);
                  unit = '"';
                  break;
                case 'development':
                  val = dev.toFixed(2);
                  unit = 'm';
                  break;
                case 'gain':
                  val = gain.toFixed(2);
                  unit = '';
                  break;
                case 'speed':
                  val = speedUnit === 'mph' ? speedMph.toFixed(1) : speedKph.toFixed(1);
                  unit = speedUnit;
                  break;
              }
              
              gears.push({ ring: ring, cog: cog, ratio: ratio.toFixed(3), val: val, unit: unit });
            });
          });
          
          gears.sort((a, b) => parseFloat(a.ratio) - parseFloat(b.ratio));
          const overlaps = findOverlaps(gears);
          return { gears: gears, overlaps: overlaps, method: method };
        }
        
        function findOverlaps(gears) {
          const overlaps = [];
          const processed = new Set();
          
          for (let i = 0; i < gears.length; i++) {
            if (processed.has(i)) continue;
            const group = [i];
            const baseRatio = parseFloat(gears[i].ratio);
            
            for (let j = i + 1; j < gears.length; j++) {
              if (processed.has(j)) continue;
              const compareRatio = parseFloat(gears[j].ratio);
              const diff = Math.abs(baseRatio - compareRatio) / baseRatio;
              
              if (diff <= 0.05) {
                group.push(j);
                processed.add(j);
              }
            }
            
            if (group.length > 1) overlaps.push(group);
            group.forEach(idx => processed.add(idx));
          }
          
          return overlaps;
        }
        
        function showTooltip(text, x, y) {
          const tooltip = document.getElementById('tooltip');
          tooltip.textContent = text;
          tooltip.style.left = x + 10 + 'px';
          tooltip.style.top = y + 10 + 'px';
          tooltip.classList.remove('hidden');
        }
        
        function hideTooltip() {
          document.getElementById('tooltip').classList.add('hidden');
        }
        
        function showChart(gears, overlaps, bike, minVal, range) {
          const method = document.getElementById('method').value;
          const vals = gears.map(g => parseFloat(g.val));
          
          const overlapMap = {};
          overlaps.forEach((group, idx) => {
            group.forEach(gearIdx => {
              overlapMap[gearIdx] = 'overlap-' + ((idx % 8) + 1);
            });
          });
          
          const colors = {
            'overlap-1': 'from-red-400 to-red-500',
            'overlap-2': 'from-cyan-400 to-cyan-500',
            'overlap-3': 'from-blue-400 to-blue-500',
            'overlap-4': 'from-green-400 to-green-500',
            'overlap-5': 'from-yellow-300 to-yellow-400',
            'overlap-6': 'from-purple-400 to-purple-500',
            'overlap-7': 'from-teal-400 to-teal-500',
            'overlap-8': 'from-orange-400 to-orange-500'
          };
          
          const bars = gears.map((gear, idx) => {
            const height = range > 0 ? ((parseFloat(gear.val) - minVal) / range) * 70 + 10 : 40;
            const overlapClass = overlapMap[idx] || '';
            const gradient = overlapClass ? colors[overlapClass] : 'from-bikotic-blue to-bikotic-blue-dark';
            const cadence = document.getElementById('cadence').value || 90;
            
            let tooltip = gear.ring + '×' + gear.cog + ': ' + gear.val + gear.unit;
            if (method === 'speed') tooltip += ' at ' + cadence + ' RPM';
            
            return '<div class="min-w-[12px] bg-gradient-to-t ' + gradient + ' rounded-t cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg relative" style="height: ' + height + 'px;" onmouseenter="showTooltip(\\'' + tooltip + '\\', event.clientX, event.clientY)" onmouseleave="hideTooltip()"></div>';
          }).join('');
          
          let title = '';
          switch (method) {
            case 'ratio': title = 'Gear Ratio Distribution'; break;
            case 'inches': title = 'Gear Inches Range'; break;
            case 'development': title = 'Development Range (metres per revolution)'; break;
            case 'gain': title = 'Gain Ratio Distribution'; break;
            case 'speed': title = 'Speed Distribution (' + speedUnit + ')'; break;
          }
          
          const suffix = method === 'inches' ? '"' : method === 'development' ? 'm' : method === 'speed' ? ' ' + speedUnit : '';
          
          document.getElementById('chart' + bike).innerHTML = 
            '<div class="text-sm font-semibold text-gray-700 mb-3 text-center">' + title + '</div>' +
            '<div class="flex items-end h-20 gap-1 mb-2">' + bars + '</div>' +
            '<div class="flex justify-between text-xs text-gray-600">' +
              '<span>Low: ' + Math.min(...vals).toFixed(method === 'inches' ? 1 : 2) + suffix + '</span>' +
              '<span>High: ' + Math.max(...vals).toFixed(method === 'inches' ? 1 : 2) + suffix + '</span>' +
            '</div>';
        }
        
        function showTable(data, bike) {
          const gears = data.gears;
          const overlaps = data.overlaps;
          const method = data.method;
          
          let methodLabel;
          switch (method) {
            case 'ratio': methodLabel = 'Ratio'; break;
            case 'inches': methodLabel = 'Gear Inches'; break;
            case 'development': methodLabel = 'Development (m)'; break;
            case 'gain': methodLabel = 'Gain Ratio'; break;
            case 'speed': methodLabel = 'Speed (' + speedUnit + ')'; break;
          }
          
          const borderColors = {
            'overlap-1': 'border-l-red-400',
            'overlap-2': 'border-l-cyan-400',
            'overlap-3': 'border-l-blue-400',
            'overlap-4': 'border-l-green-400',
            'overlap-5': 'border-l-yellow-400',
            'overlap-6': 'border-l-purple-400',
            'overlap-7': 'border-l-teal-400',
            'overlap-8': 'border-l-orange-400'
          };
          
          let html = '<div class="grid grid-cols-2 gap-3 p-3 bg-bikotic-blue text-white rounded-lg mb-2 font-semibold text-sm"><div>Gear Combination</div><div class="text-center">' + methodLabel + '</div></div>';
          
          gears.forEach((gear, idx) => {
            let overlapClass = '';
            let borderClass = '';
            overlaps.forEach((group, groupIdx) => {
              if (group.includes(idx)) {
                overlapClass = 'overlap-' + ((groupIdx % 8) + 1);
                borderClass = borderColors[overlapClass];
              }
            });
            
            html += '<div class="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg mb-2 items-center shadow-sm border-l-4 border-transparent ' + borderClass + '">' +
                    '<div class="font-semibold text-bikotic-blue">' + gear.ring + '×' + gear.cog + '</div>' +
                    '<div class="text-center text-sm">' + gear.val + gear.unit + '</div></div>';
          });
          
          document.getElementById('table' + bike).innerHTML = html;
          
          const total = gears.length;
          const overlapCount = overlaps.reduce((sum, group) => sum + group.length, 0);
          const usable = total - overlapCount + overlaps.length;
          
          document.getElementById('summary' + bike).innerHTML = 
            'Total Usable Gears: ' + usable + ' of ' + total + ' (' + overlaps.length + ' overlap groups)';
          
          let legendText = '';
          if (overlaps.length > 0) {
            legendText = '<strong>Overlapping Gears:</strong> ' + overlaps.length + ' overlap group(s) found. Matching colours show similar gear ratios.';
          } else {
            legendText = 'No overlapping gears detected.';
          }
          document.getElementById('legend' + bike).innerHTML = legendText;
        }
        
        // Initialize on load
        if (typeof window !== 'undefined') {
          window.addEventListener('load', function() {
            setTimeout(function() {
              window.handleMethodChange(); // Set initial disabled states
              window.updateBoth();
            }, 100);
          });
        }
      `}} />
    </main>
  )
}
