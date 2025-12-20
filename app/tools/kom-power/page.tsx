'use client'

export default function KOMPowerCalculator() {
 return (
  <main className="min-h-screen p-4 md:p-8 font-sans bg-[#fafafa]">
   <div className="max-w-4xl mx-auto">
    
    {/* Page Header */}
    <section className="mb-8">
     <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
      KOM Power Calculator
     </h1>
     <div className="text-lg text-[#525252] max-w-4xl space-y-3">
      <p>
       Work out how much power you'd need to get that Strava KOM. Enter the segment details and your weight, see what's required.
      </p>
      <p className="text-base">
       Uses standard cycling physics - gravity, air resistance, rolling resistance. Assumes road position and typical conditions. Your actual power needs might vary with wind, road surface, and how aero you are.
      </p>
     </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
     {/* Left Column - Inputs */}
     <div className="space-y-6">
      
      {/* Segment Details */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
       <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
        Segment Details
       </h2>

       <div className="space-y-4">
        
        {/* Distance */}
        <div>
         <label htmlFor="distance" className="block mb-2 text-gray-700 font-semibold">
          Distance
         </label>
         <div className="flex gap-2">
          <input 
           type="number" 
           id="distance" 
           placeholder="5.2"
           min="0.1" 
           step="0.1"
           onChange={() => (window as any).calculatePower()}
           className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
          />
          <div className="flex border-2 border-bikotic-blue rounded-lg overflow-hidden">
           <button 
            className="px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark"
            onClick={(e) => (window as any).toggleUnits('distance', 'km', e)}
            id="btn-distance-km"
           >
            km
           </button>
           <button 
            className="px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50"
            onClick={(e) => (window as any).toggleUnits('distance', 'mi', e)}
            id="btn-distance-mi"
           >
            mi
           </button>
          </div>
         </div>
        </div>

        {/* Elevation Gain */}
        <div>
         <label htmlFor="elevation" className="block mb-2 text-gray-700 font-semibold">
          Elevation Gain
         </label>
         <div className="flex gap-2">
          <input 
           type="number" 
           id="elevation" 
           placeholder="250"
           min="0" 
           step="1"
           onChange={() => (window as any).calculatePower()}
           className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
          />
          <div className="flex border-2 border-bikotic-blue rounded-lg overflow-hidden">
           <button 
            className="px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark"
            onClick={(e) => (window as any).toggleUnits('elevation', 'm', e)}
            id="btn-elevation-m"
           >
            m
           </button>
           <button 
            className="px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50"
            onClick={(e) => (window as any).toggleUnits('elevation', 'ft', e)}
            id="btn-elevation-ft"
           >
            ft
           </button>
          </div>
         </div>
        </div>

        {/* KOM Time */}
        <div>
         <label htmlFor="timeMinutes" className="block mb-2 text-gray-700 font-semibold">
          KOM Time (or Your Target)
         </label>
         <div className="flex gap-2 items-center">
          <input 
           type="number" 
           id="timeMinutes" 
           placeholder="12"
           min="0"
           onChange={() => (window as any).calculatePower()}
           className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
          />
          <span className="text-gray-600 font-semibold">min</span>
          <input 
           type="number" 
           id="timeSeconds" 
           placeholder="34"
           min="0"
           max="59"
           onChange={() => (window as any).calculatePower()}
           className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
          />
          <span className="text-gray-600 font-semibold">sec</span>
         </div>
        </div>

       </div>
      </div>

      {/* Rider Details */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
       <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
        Your Details
       </h2>

       <div className="space-y-4">
        
        {/* Rider Weight */}
        <div>
         <label htmlFor="riderWeight" className="block mb-2 text-gray-700 font-semibold">
          Your Weight (kg)
         </label>
         <input 
          type="number" 
          id="riderWeight" 
          placeholder="75"
          min="40" 
          max="150"
          step="0.1"
          onChange={() => (window as any).calculatePower()}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
         />
        </div>

        {/* Bike Weight */}
        <div>
         <label htmlFor="bikeWeight" className="block mb-2 text-gray-700 font-semibold">
          Bike Weight (kg)
         </label>
         <input 
          type="number" 
          id="bikeWeight" 
          placeholder="8"
          min="5" 
          max="20"
          step="0.1"
          defaultValue="8"
          onChange={() => (window as any).calculatePower()}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
         />
         <p className="text-sm text-gray-500 mt-2">Default is 8kg (typical road bike)</p>
        </div>

        {/* FTP (Optional) */}
        <div>
         <label htmlFor="ftp" className="block mb-2 text-gray-700 font-semibold">
          Your FTP (Optional)
         </label>
         <input 
          type="number" 
          id="ftp" 
          placeholder="250"
          min="100" 
          max="500"
          onChange={() => (window as any).calculatePower()}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
         />
         <p className="text-sm text-gray-500 mt-2">For comparison - see if the effort is sustainable</p>
        </div>

        {/* CdA (Optional) */}
        <div>
         <label htmlFor="cda" className="block mb-2 text-gray-700 font-semibold">
          CdA - Drag Coefficient (Optional)
         </label>
         <input 
          type="number" 
          id="cda" 
          placeholder="0.32"
          min="0.2" 
          max="0.5"
          step="0.01"
          defaultValue="0.32"
          onChange={() => (window as any).calculatePower()}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none" 
         />
         <p className="text-sm text-gray-500 mt-2">Default 0.32 is typical road position. Lower = more aero</p>
        </div>

       </div>
      </div>

     </div>

     {/* Right Column - Results */}
     <div className="space-y-6">
      
      {/* Main Result */}
      <div id="results" className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hidden">
       <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
        Required Power
       </h2>

       <div className="text-center mb-6">
        <div className="text-6xl font-bold text-bikotic-blue mb-2" id="power-value">
         --
        </div>
        <div className="text-lg text-gray-600 mb-4">watts</div>
        <div className="text-3xl font-bold text-gray-700" id="watts-per-kg">
         -- w/kg
        </div>
       </div>

       {/* Category */}
       <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
        <div className="text-sm text-gray-600 mb-1">Rider Category</div>
        <div className="text-xl font-semibold text-gray-900" id="category">
         --
        </div>
       </div>

       {/* FTP Comparison */}
       <div id="ftp-comparison" className="hidden mb-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
         <div className="font-semibold text-gray-900 mb-2">FTP Comparison</div>
         <div className="text-sm text-gray-700" id="ftp-text">--</div>
        </div>
       </div>

       {/* Segment Stats */}
       <div className="text-sm text-gray-600 space-y-2 mb-6">
        <div className="flex justify-between">
         <span>Average Gradient:</span>
         <span className="font-semibold" id="gradient">--%</span>
        </div>
        <div className="flex justify-between">
         <span>Average Speed:</span>
         <span className="font-semibold" id="avg-speed">-- km/h</span>
        </div>
       </div>

      </div>

      {/* Power Breakdown */}
      <div id="breakdown" className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hidden">
       <h2 className="text-xl font-bold text-gray-900 mb-4">
        Power Breakdown
       </h2>
       <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
         <span className="text-gray-700">Overcoming Gravity:</span>
         <span className="font-semibold text-bikotic-blue" id="power-gravity">-- W</span>
        </div>
        <div className="flex justify-between items-center">
         <span className="text-gray-700">Overcoming Air Drag:</span>
         <span className="font-semibold text-bikotic-blue" id="power-drag">-- W</span>
        </div>
        <div className="flex justify-between items-center">
         <span className="text-gray-700">Rolling Resistance:</span>
         <span className="font-semibold text-bikotic-blue" id="power-rolling">-- W</span>
        </div>
        <div className="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between items-center">
         <span className="font-semibold text-gray-900">Total Power:</span>
         <span className="font-bold text-bikotic-blue" id="power-total">-- W</span>
        </div>
       </div>
      </div>

      {/* Reverse Calculator */}
      <div id="reverse-calc" className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hidden">
       <h2 className="text-xl font-bold text-gray-900 mb-4">
        What If Calculator
       </h2>
       <div className="mb-4">
        <label htmlFor="whatif-power" className="block mb-2 text-gray-700 font-semibold text-sm">
         If I can hold (watts):
        </label>
        <input 
         type="number" 
         id="whatif-power" 
         placeholder="300"
         min="50" 
         max="600"
         onChange={() => (window as any).calculateTime()}
         className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none"
        />
       </div>
       <div className="bg-bikotic-blue bg-opacity-10 rounded-lg p-4 text-center">
        <div className="text-sm text-gray-600 mb-1">Your Time</div>
        <div className="text-3xl font-bold text-bikotic-blue" id="whatif-time">
         --:--
        </div>
       </div>
      </div>

     </div>

    </div>

    {/* Reference Table */}
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
     <h3 className="font-semibold text-gray-900 mb-4">Power-to-Weight Reference (w/kg)</h3>
     <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
      <div className="text-center">
       <div className="font-semibold text-bikotic-blue mb-1">Recreational</div>
       <div className="text-gray-600">2.0 - 3.0</div>
      </div>
      <div className="text-center">
       <div className="font-semibold text-bikotic-blue mb-1">Club Rider</div>
       <div className="text-gray-600">3.0 - 4.0</div>
      </div>
      <div className="text-center">
       <div className="font-semibold text-bikotic-blue mb-1">Cat 1/2</div>
       <div className="text-gray-600">4.0 - 5.0</div>
      </div>
      <div className="text-center">
       <div className="font-semibold text-bikotic-blue mb-1">Pro</div>
       <div className="text-gray-600">5.0 - 6.0</div>
      </div>
      <div className="text-center">
       <div className="font-semibold text-bikotic-blue mb-1">World Tour</div>
       <div className="text-gray-600">6.0+</div>
      </div>
     </div>
    </div>

    {/* Disclaimer */}
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5 mt-6">
     <h3 className="font-semibold text-gray-900 mb-2">How Accurate Is This?</h3>
     <ul className="text-sm text-gray-700 space-y-2">
      <li>• Default CdA of 0.32 assumes typical road position - adjust if you know yours</li>
      <li>• Doesn't account for wind (tailwind helps, headwind hurts)</li>
      <li>• Assumes decent tarmac (rough roads need more power)</li>
      <li>• Your actual power might vary ±10% depending on conditions</li>
      <li>• Still useful for ballpark estimates and comparing segments</li>
     </ul>
    </div>

   </div>

   {/* JavaScript */}
   <script dangerouslySetInnerHTML={{ __html: `
    let distanceUnit = 'km';
    let elevationUnit = 'm';

    window.toggleUnits = function(type, unit, event) {
     if (type === 'distance') {
      distanceUnit = unit;
      const btnKm = document.getElementById('btn-distance-km');
      const btnMi = document.getElementById('btn-distance-mi');
      if (unit === 'km') {
       btnKm.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
       btnMi.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
      } else {
       btnKm.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
       btnMi.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
      }
     } else if (type === 'elevation') {
      elevationUnit = unit;
      const btnM = document.getElementById('btn-elevation-m');
      const btnFt = document.getElementById('btn-elevation-ft');
      if (unit === 'm') {
       btnM.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
       btnFt.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
      } else {
       btnM.className = 'px-4 py-2 bg-white text-bikotic-blue font-semibold transition-colors hover:bg-gray-50';
       btnFt.className = 'px-4 py-2 bg-bikotic-blue text-white font-semibold transition-colors hover:bg-bikotic-blue-dark';
      }
     }
     window.calculatePower();
    };

    window.calculatePower = function() {
     // Get inputs
     let distance = parseFloat(document.getElementById('distance').value);
     let elevation = parseFloat(document.getElementById('elevation').value);
     const timeMin = parseFloat(document.getElementById('timeMinutes').value) || 0;
     const timeSec = parseFloat(document.getElementById('timeSeconds').value) || 0;
     const riderWeight = parseFloat(document.getElementById('riderWeight').value);
     const bikeWeight = parseFloat(document.getElementById('bikeWeight').value) || 8;
     const ftp = parseFloat(document.getElementById('ftp').value);
     const CdA = parseFloat(document.getElementById('cda').value) || 0.32;

     // Convert to metric
     if (distanceUnit === 'mi') distance = distance * 1.60934;
     if (elevationUnit === 'ft') elevation = elevation * 0.3048;

     // Validate
     if (!distance || !elevation || (!timeMin && !timeSec) || !riderWeight) {
      document.getElementById('results').classList.add('hidden');
      document.getElementById('breakdown').classList.add('hidden');
      document.getElementById('reverse-calc').classList.add('hidden');
      return;
     }

     const timeSeconds = (timeMin * 60) + timeSec;
     const distanceMeters = distance * 1000;
     const totalWeight = riderWeight + bikeWeight;

     // Calculate velocity (m/s)
     const velocity = distanceMeters / timeSeconds;
     const velocityKmh = velocity * 3.6;

     // Calculate gradient
     const gradient = Math.atan(elevation / distanceMeters);
     const gradientPercent = (elevation / distanceMeters) * 100;

     // Physics constants
     const g = 9.81; // gravity
     const rho = 1.225; // air density (sea level)
     const Crr = 0.004; // rolling resistance coefficient

     // Calculate power components
     const powerGravity = totalWeight * g * Math.sin(gradient) * velocity;
     const powerDrag = 0.5 * rho * CdA * Math.pow(velocity, 3);
     const powerRolling = totalWeight * g * Math.cos(gradient) * Crr * velocity;
     const totalPower = powerGravity + powerDrag + powerRolling;

     const wattsPerKg = totalPower / riderWeight;

     // Display results
     document.getElementById('power-value').textContent = Math.round(totalPower);
     document.getElementById('watts-per-kg').textContent = wattsPerKg.toFixed(2) + ' w/kg';
     document.getElementById('gradient').textContent = gradientPercent.toFixed(1) + '%';
     document.getElementById('avg-speed').textContent = velocityKmh.toFixed(1) + ' km/h';

     // Power breakdown
     document.getElementById('power-gravity').textContent = Math.round(powerGravity) + ' W';
     document.getElementById('power-drag').textContent = Math.round(powerDrag) + ' W';
     document.getElementById('power-rolling').textContent = Math.round(powerRolling) + ' W';
     document.getElementById('power-total').textContent = Math.round(totalPower) + ' W';

     // Category
     let category = '';
     if (wattsPerKg < 2.0) category = 'Beginner';
     else if (wattsPerKg < 3.0) category = 'Recreational Rider';
     else if (wattsPerKg < 4.0) category = 'Competitive Club Rider';
     else if (wattsPerKg < 5.0) category = 'Cat 1/2 Racer';
     else if (wattsPerKg < 6.0) category = 'Pro Level';
     else category = 'World Tour Pro';
     document.getElementById('category').textContent = category;

     // FTP comparison
     if (ftp) {
      const ftpPercent = (totalPower / ftp) * 100;
      let ftpText = 'That\\'s ' + Math.round(ftpPercent) + '% of your FTP. ';
      if (ftpPercent > 100) {
       ftpText += 'Above threshold - unsustainable for most riders.';
      } else if (ftpPercent > 95) {
       ftpText += 'Just below threshold - very hard effort.';
      } else if (ftpPercent > 85) {
       ftpText += 'Sweet spot - hard but sustainable.';
      } else {
       ftpText += 'Below threshold - should be achievable.';
      }
      document.getElementById('ftp-text').textContent = ftpText;
      document.getElementById('ftp-comparison').classList.remove('hidden');
     } else {
      document.getElementById('ftp-comparison').classList.add('hidden');
     }

     // Show results
     document.getElementById('results').classList.remove('hidden');
     document.getElementById('breakdown').classList.remove('hidden');
     document.getElementById('reverse-calc').classList.remove('hidden');

     // Store values for reverse calc
     window.segmentData = {
      distanceMeters, elevation, gradient, totalWeight, velocity, velocityKmh,
      g, rho, CdA, Crr
     };
    };

    window.calculateTime = function() {
     if (!window.segmentData) return;

     const power = parseFloat(document.getElementById('whatif-power').value);
     if (!power) return;

     const { distanceMeters, elevation, gradient, totalWeight, g, rho, CdA, Crr } = window.segmentData;

     // Iterative solution to find velocity for given power
     // P = (m*g*sin(θ) + m*g*cos(θ)*Crr)*v + 0.5*ρ*CdA*v³
     let v = 5; // initial guess (m/s)
     for (let i = 0; i < 50; i++) {
      const pGravity = totalWeight * g * Math.sin(gradient) * v;
      const pRolling = totalWeight * g * Math.cos(gradient) * Crr * v;
      const pDrag = 0.5 * rho * CdA * Math.pow(v, 3);
      const pTotal = pGravity + pRolling + pDrag;
      
      // Adjust velocity
      const error = power - pTotal;
      v += error / 500; // simple gradient descent
      if (Math.abs(error) < 1) break;
     }

     const timeSeconds = distanceMeters / v;
     const minutes = Math.floor(timeSeconds / 60);
     const seconds = Math.round(timeSeconds % 60);
     
     document.getElementById('whatif-time').textContent = 
      minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };
   `}} />
  </main>
 )
}
