export default function Home() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BIKOTIC Color Palette Options
          </h1>
          <p className="text-xl text-gray-600">
            Carbon, Modern, Racing Aesthetic - Pick Your Style
          </p>
        </div>

        {/* OPTION 1: Carbon + Racing Red */}
        <section className="mb-16 rounded-xl overflow-hidden border-4 border-gray-300">
          <div className="bg-[#0a0a0a] text-white p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Option 1: Carbon + Racing Red</h2>
              <p className="text-gray-400">F1 vibes - Ferrari, McLaren, aggressive performance</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="h-20 bg-[#0a0a0a] border border-gray-700 rounded mb-2"></div>
                <p className="text-sm">Deep Black #0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#2d2d2d] rounded mb-2"></div>
                <p className="text-sm">Carbon Gray #2d2d2d</p>
              </div>
              <div>
                <div className="h-20 bg-[#f5f5f5] rounded mb-2"></div>
                <p className="text-sm text-gray-900">Off-White #f5f5f5</p>
              </div>
              <div>
                <div className="h-20 bg-[#dc2626] rounded mb-2"></div>
                <p className="text-sm">Racing Red #dc2626</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-[#2d2d2d] to-[#0a0a0a] p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4">Compare Bikes Visually</h3>
              <p className="text-gray-300 mb-6">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#dc2626] text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-[#2d2d2d] p-6 rounded-lg border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-white">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-gray-400 mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#dc2626] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 2: Carbon + Electric Blue */}
        <section className="mb-16 rounded-xl overflow-hidden border-4 border-gray-300">
          <div className="bg-[#0a0a0a] text-white p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Option 2: Carbon + Electric Blue</h2>
              <p className="text-gray-400">High-tech racing - Shimano Di2, precision engineering</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="h-20 bg-[#0a0a0a] border border-gray-700 rounded mb-2"></div>
                <p className="text-sm">Deep Black #0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#2d2d2d] rounded mb-2"></div>
                <p className="text-sm">Carbon Gray #2d2d2d</p>
              </div>
              <div>
                <div className="h-20 bg-[#f5f5f5] rounded mb-2"></div>
                <p className="text-sm text-gray-900">Off-White #f5f5f5</p>
              </div>
              <div>
                <div className="h-20 bg-[#3b82f6] rounded mb-2"></div>
                <p className="text-sm">Electric Blue #3b82f6</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-[#2d2d2d] to-[#0a0a0a] p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4">Compare Bikes Visually</h3>
              <p className="text-gray-300 mb-6">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#3b82f6] text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-[#2d2d2d] p-6 rounded-lg border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-white">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-gray-400 mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#3b82f6] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 3: Carbon + Neon Green */}
        <section className="mb-16 rounded-xl overflow-hidden border-4 border-gray-300">
          <div className="bg-[#0a0a0a] text-white p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Option 3: Carbon + Neon Green</h2>
              <p className="text-gray-400">Modern racing tech - SRAM AXS, cutting edge</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <div className="h-20 bg-[#0a0a0a] border border-gray-700 rounded mb-2"></div>
                <p className="text-sm">Deep Black #0a0a0a</p>
              </div>
              <div>
                <div className="h-20 bg-[#2d2d2d] rounded mb-2"></div>
                <p className="text-sm">Carbon Gray #2d2d2d</p>
              </div>
              <div>
                <div className="h-20 bg-[#f5f5f5] rounded mb-2"></div>
                <p className="text-sm text-gray-900">Off-White #f5f5f5</p>
              </div>
              <div>
                <div className="h-20 bg-[#10b981] rounded mb-2"></div>
                <p className="text-sm">Neon Green #10b981</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-[#2d2d2d] to-[#0a0a0a] p-8 rounded-lg text-center mb-6">
              <h3 className="text-3xl font-bold mb-4">Compare Bikes Visually</h3>
              <p className="text-gray-300 mb-6">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#10b981] text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-[#2d2d2d] p-6 rounded-lg border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-white">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-gray-400 mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#10b981] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

        {/* OPTION 4: Matte Carbon Minimalist */}
        <section className="mb-16 rounded-xl overflow-hidden border-4 border-gray-300">
          <div className="bg-[#111111] text-white p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Option 4: Matte Carbon Minimalist</h2>
              <p className="text-[#a3a3a3]">Ultra premium - Cervelo, Pinarello, understated luxury</p>
            </div>
            
            {/* Color swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div>
                <div className="h-20 bg-[#111111] border border-gray-700 rounded mb-2"></div>
                <p className="text-sm">Matte Black #111111</p>
              </div>
              <div>
                <div className="h-20 bg-[#1f1f1f] rounded mb-2"></div>
                <p className="text-sm">Carbon #1f1f1f</p>
              </div>
              <div>
                <div className="h-20 bg-[#e5e5e5] rounded mb-2"></div>
                <p className="text-sm text-gray-900">Soft White #e5e5e5</p>
              </div>
              <div>
                <div className="h-20 bg-[#737373] rounded mb-2"></div>
                <p className="text-sm">Metal Gray #737373</p>
              </div>
              <div>
                <div className="h-20 bg-[#dc2626] rounded mb-2"></div>
                <p className="text-sm">Red Accent #dc2626</p>
              </div>
            </div>

            {/* Sample hero */}
            <div className="bg-gradient-to-br from-[#1f1f1f] to-[#111111] p-8 rounded-lg text-center mb-6 border border-[#2d2d2d]">
              <h3 className="text-3xl font-bold mb-4 text-[#e5e5e5]">Compare Bikes Visually</h3>
              <p className="text-[#a3a3a3] mb-6">Precision geometry comparison for serious cyclists</p>
              <button className="bg-[#737373] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#525252] transition-colors border border-[#525252]">
                Launch Comparison Tool
              </button>
            </div>

            {/* Sample card */}
            <div className="bg-[#1f1f1f] p-6 rounded-lg border border-[#2d2d2d]">
              <h4 className="text-xl font-bold mb-3 text-[#e5e5e5]">Specialized Tarmac SL8 vs Trek Madone</h4>
              <p className="text-[#a3a3a3] mb-4">Aero vs lightweight - the ultimate carbon race bike showdown</p>
              <a href="#" className="text-[#dc2626] font-semibold hover:underline">Read comparison →</a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
