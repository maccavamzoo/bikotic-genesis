export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12 bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BIKOTIC Color Palette Options
          </h1>
          <p className="text-xl text-gray-600">
            Clean, Crisp, Carbon - Light Racing Aesthetic
          </p>
        </div>

        {/* OPTION 1: Clean White + Carbon Black + Racing Red */}
        <section className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg border-4 border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Option 1: Clean White + Racing Red</h2>
              <p className="text-gray-600">Minimal, sharp, race-ready - Pure performance aesthetic</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div>
                <div className="h-20 bg-white border-2 border-gray-300 rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Pure White</p>
                <p className="text-xs text-gray-500">#ffffff</p>
              </div>
              <div>
                <div className="h-20 bg-[#0a0a0a] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Carbon Black</p>
                <p className="text-xs text-gray-500">#0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#525252] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Dark Gray</p>
                <p className="text-xs text-gray-500">#525252</p>
              </div>
              <div>
                <div className="h-20 bg-[#dc2626] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Racing Red</p>
                <p className="text-xs text-gray-500">#dc2626</p>
              </div>
              <div>
                <div className="h-20 bg-[#e5e5e5] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Border Gray</p>
                <p className="text-xs text-gray-500">#e5e5e5</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4 text-[#0a0a0a]">Compare Bikes Visually</h3>
              <p className="text-[#525252] mb-6 text-lg">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#dc2626] text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-white p-6 rounded-lg border-2 border-[#e5e5e5] hover:border-[#dc2626] transition-colors">
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-[#525252] mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#dc2626] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 2: Light Gray + Carbon + Electric Blue */}
        <section className="mb-12 bg-[#fafafa] rounded-xl overflow-hidden shadow-lg border-4 border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Option 2: Light Gray + Electric Blue</h2>
              <p className="text-gray-600">Tech precision - Shimano Di2, engineering excellence</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div>
                <div className="h-20 bg-[#fafafa] border-2 border-gray-300 rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Off-White</p>
                <p className="text-xs text-gray-500">#fafafa</p>
              </div>
              <div>
                <div className="h-20 bg-white border-2 border-gray-300 rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">White Cards</p>
                <p className="text-xs text-gray-500">#ffffff</p>
              </div>
              <div>
                <div className="h-20 bg-[#0a0a0a] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Carbon Black</p>
                <p className="text-xs text-gray-500">#0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#525252] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Dark Gray</p>
                <p className="text-xs text-gray-500">#525252</p>
              </div>
              <div>
                <div className="h-20 bg-[#2563eb] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Electric Blue</p>
                <p className="text-xs text-gray-500">#2563eb</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4 text-[#0a0a0a]">Compare Bikes Visually</h3>
              <p className="text-[#525252] mb-6 text-lg">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#2563eb] text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#2563eb] transition-colors">
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-[#525252] mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#2563eb] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 3: White + Matte Carbon + Emerald Green */}
        <section className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg border-4 border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Option 3: White + Emerald Green</h2>
              <p className="text-gray-600">Modern racing tech - SRAM AXS, cutting edge energy</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div>
                <div className="h-20 bg-white border-2 border-gray-300 rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Pure White</p>
                <p className="text-xs text-gray-500">#ffffff</p>
              </div>
              <div>
                <div className="h-20 bg-[#171717] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Matte Black</p>
                <p className="text-xs text-gray-500">#171717</p>
              </div>
              <div>
                <div className="h-20 bg-[#525252] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Dark Gray</p>
                <p className="text-xs text-gray-500">#525252</p>
              </div>
              <div>
                <div className="h-20 bg-[#10b981] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Emerald Green</p>
                <p className="text-xs text-gray-500">#10b981</p>
              </div>
              <div>
                <div className="h-20 bg-[#f5f5f5] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Light Gray</p>
                <p className="text-xs text-gray-500">#f5f5f5</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-[#f5f5f5] border-2 border-gray-200 p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4 text-[#171717]">Compare Bikes Visually</h3>
              <p className="text-[#525252] mb-6 text-lg">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#10b981] text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-md">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#10b981] transition-colors">
              <h4 className="text-xl font-bold mb-3 text-[#171717]">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-[#525252] mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#10b981] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 4: Minimal White + Brushed Aluminum + Red */}
        <section className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg border-4 border-gray-200">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Option 4: Minimal + Brushed Aluminum</h2>
              <p className="text-gray-600">Ultra premium - Pinarello, Colnago, understated luxury</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div>
                <div className="h-20 bg-white border-2 border-gray-300 rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">White</p>
                <p className="text-xs text-gray-500">#ffffff</p>
              </div>
              <div>
                <div className="h-20 bg-[#0a0a0a] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Black</p>
                <p className="text-xs text-gray-500">#0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#737373] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Aluminum Gray</p>
                <p className="text-xs text-gray-500">#737373</p>
              </div>
              <div>
                <div className="h-20 bg-[#ef4444] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Bright Red</p>
                <p className="text-xs text-gray-500">#ef4444</p>
              </div>
              <div>
                <div className="h-20 bg-[#f5f5f5] rounded mb-2"></div>
                <p className="text-sm text-gray-900 font-semibold">Hover Gray</p>
                <p className="text-xs text-gray-500">#f5f5f5</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4 text-[#0a0a0a]">Compare Bikes Visually</h3>
              <p className="text-[#737373] mb-6 text-lg">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#737373] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#525252] transition-colors shadow-md">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:bg-[#f5f5f5] transition-colors">
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-[#737373] mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#ef4444] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
