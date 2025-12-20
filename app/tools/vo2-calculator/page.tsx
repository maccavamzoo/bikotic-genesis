'use client'

export default function VO2MaxCalculator() {
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            VO₂ Max Calculator
          </h1>
          <div className="text-lg text-[#525252] max-w-3xl space-y-3">
            <p>
              Estimate your VO₂ max using simple heart rate measurements. No lab testing required - just your resting heart rate and either your maximum heart rate or age.
            </p>
            <p className="text-base">
              This uses the Uth-Sørensen-Overgaard-Pedersen formula (2004) for estimation. It's a decent approximation but remember: proper lab testing is more accurate. Good for tracking trends over time though.
            </p>
          </div>
        </section>

        {/* Calculator Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
            Your Details
          </h2>

          <div className="space-y-6">
            
            {/* Resting Heart Rate */}
            <div>
              <label htmlFor="restingHR" className="block mb-2 text-gray-700 font-semibold">
                Resting Heart Rate (bpm)
              </label>
              <input 
                type="number" 
                id="restingHR" 
                placeholder="e.g., 60"
                min="30" 
                max="100"
                onChange={() => (window as any).calculateVO2Max()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                Measure this first thing in the morning before getting out of bed. Average over a few days for best results.
              </p>
            </div>

            {/* Max HR Method Toggle */}
            <div>
              <label className="block mb-3 text-gray-700 font-semibold">
                Maximum Heart Rate
              </label>
              <div className="flex gap-3 mb-4">
                <button 
                  className="flex-1 py-3 px-4 border-2 border-bikotic-blue bg-bikotic-blue text-white rounded-lg font-semibold transition-colors hover:bg-bikotic-blue-dark active"
                  onClick={(e) => (window as any).toggleMaxHRMethod('estimate', e)}
                  id="btn-estimate"
                >
                  Estimate from Age
                </button>
                <button 
                  className="flex-1 py-3 px-4 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50"
                  onClick={(e) => (window as any).toggleMaxHRMethod('known', e)}
                  id="btn-known"
                >
                  I Know My Max HR
                </button>
              </div>

              {/* Age Input (shown by default) */}
              <div id="age-input" className="space-y-2">
                <input 
                  type="number" 
                  id="age" 
                  placeholder="Your age"
                  min="15" 
                  max="100"
                  onChange={() => (window as any).calculateVO2Max()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none text-lg"
                />
                <p className="text-sm text-gray-500">
                  We'll estimate your max HR using the formula: 220 - age
                </p>
              </div>

              {/* Known Max HR Input (hidden by default) */}
              <div id="maxhr-input" className="space-y-2 hidden">
                <input 
                  type="number" 
                  id="maxHR" 
                  placeholder="Your maximum heart rate"
                  min="120" 
                  max="220"
                  onChange={() => (window as any).calculateVO2Max()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-bikotic-blue focus:outline-none text-lg"
                />
                <p className="text-sm text-gray-500">
                  If you've tested this properly (max effort test), enter it here for better accuracy.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Results Card */}
        <div id="results" className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-bikotic-blue">
            Your Estimated VO₂ Max
          </h2>

          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-bikotic-blue mb-2" id="vo2-value">
              --
            </div>
            <div className="text-lg text-gray-600">
              ml/kg/min
            </div>
          </div>

          {/* Category */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Fitness Category</div>
            <div className="text-xl font-semibold text-gray-900" id="category">
              --
            </div>
          </div>

          {/* Reference Table */}
          <div className="text-sm text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-3">VO₂ Max Reference Ranges (ml/kg/min)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-bikotic-blue mb-2">Men (Age 20-29)</div>
                <div className="space-y-1 text-xs">
                  <div>Elite: &gt;55</div>
                  <div>Excellent: 51-55</div>
                  <div>Good: 45-50</div>
                  <div>Average: 39-44</div>
                  <div>Below Average: &lt;39</div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-bikotic-blue mb-2">Women (Age 20-29)</div>
                <div className="space-y-1 text-xs">
                  <div>Elite: &gt;49</div>
                  <div>Excellent: 45-49</div>
                  <div>Good: 39-44</div>
                  <div>Average: 33-38</div>
                  <div>Below Average: &lt;33</div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
              Note: Values decrease with age. Competitive cyclists typically have values 60-85 ml/kg/min.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Important Notes</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• This is an <strong>estimation</strong> using the Uth-Sørensen-Overgaard-Pedersen formula from 2004 research</li>
            <li>• Accuracy varies - lab testing (treadmill or bike test with gas analysis) is the gold standard</li>
            <li>• Best used for tracking <strong>trends</strong> over time rather than absolute values</li>
            <li>• Make sure your resting HR measurement is accurate - take it multiple mornings</li>
            <li>• If you know your actual max HR from testing, use that instead of age estimate</li>
          </ul>
        </div>

      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{ __html: `
        let currentMethod = 'estimate';

        window.toggleMaxHRMethod = function(method, event) {
          currentMethod = method;
          
          // Update button styles
          const btnEstimate = document.getElementById('btn-estimate');
          const btnKnown = document.getElementById('btn-known');
          
          if (method === 'estimate') {
            btnEstimate.className = 'flex-1 py-3 px-4 border-2 border-bikotic-blue bg-bikotic-blue text-white rounded-lg font-semibold transition-colors hover:bg-bikotic-blue-dark active';
            btnKnown.className = 'flex-1 py-3 px-4 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50';
            document.getElementById('age-input').classList.remove('hidden');
            document.getElementById('maxhr-input').classList.add('hidden');
          } else {
            btnEstimate.className = 'flex-1 py-3 px-4 border-2 border-bikotic-blue text-bikotic-blue rounded-lg font-semibold transition-colors hover:bg-gray-50';
            btnKnown.className = 'flex-1 py-3 px-4 border-2 border-bikotic-blue bg-bikotic-blue text-white rounded-lg font-semibold transition-colors hover:bg-bikotic-blue-dark active';
            document.getElementById('age-input').classList.add('hidden');
            document.getElementById('maxhr-input').classList.remove('hidden');
          }
          
          window.calculateVO2Max();
        };

        window.calculateVO2Max = function() {
          const restingHR = parseFloat(document.getElementById('restingHR').value);
          let maxHR;
          
          if (currentMethod === 'estimate') {
            const age = parseFloat(document.getElementById('age').value);
            if (!age || age < 15 || age > 100) {
              document.getElementById('results').classList.add('hidden');
              return;
            }
            maxHR = 220 - age;
          } else {
            maxHR = parseFloat(document.getElementById('maxHR').value);
            if (!maxHR || maxHR < 120 || maxHR > 220) {
              document.getElementById('results').classList.add('hidden');
              return;
            }
          }
          
          if (!restingHR || restingHR < 30 || restingHR > 100) {
            document.getElementById('results').classList.add('hidden');
            return;
          }
          
          // Uth-Sørensen-Overgaard-Pedersen formula
          const vo2max = 15.3 * (maxHR / restingHR);
          
          // Display result
          document.getElementById('vo2-value').textContent = vo2max.toFixed(1);
          document.getElementById('results').classList.remove('hidden');
          
          // Determine category (using general male 20-29 ranges as baseline)
          let category = '';
          if (vo2max >= 55) {
            category = 'Elite';
          } else if (vo2max >= 51) {
            category = 'Excellent';
          } else if (vo2max >= 45) {
            category = 'Good';
          } else if (vo2max >= 39) {
            category = 'Average';
          } else {
            category = 'Below Average';
          }
          
          document.getElementById('category').textContent = category;
        };
      `}} />
    </main>
  )
}
