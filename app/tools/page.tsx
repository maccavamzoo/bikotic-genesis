export default function ToolsPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Cycling Calculators & Tools
          </h1>
          <p className="text-lg md:text-xl text-[#525252] max-w-3xl">
            Professional cycling calculators for gear ratios, training zones, and bike fit. Built for riders who want proper data, not marketing bollocks.
          </p>
        </section>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Gear Ratio Calculator */}
          <a 
            href="/tools/gear-calculator" 
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all block"
          >
            <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">⚙️</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-[#0a0a0a]">
              Gear Ratio Calculator
            </h2>
            <p className="text-[#525252] mb-4">
              Compare gear ratios side-by-side between two bikes. Calculate speeds at different cadences, gear inches, development, gain ratios, and identify overlapping gears in 2x setups.
            </p>
            <div className="text-sm text-[#737373] mb-4">
              • Side-by-side comparison<br/>
              • Multiple calculation methods<br/>
              • Overlap detection<br/>
              • Visual charts
            </div>
            <span className="text-bikotic-blue font-semibold hover:underline">
              Use calculator →
            </span>
          </a>

        </div>

        {/* Coming Soon Section */}
        <section className="mt-16 bg-gray-100 border-2 border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-[#0a0a0a]">
            More Tools Coming Soon
          </h2>
          <p className="text-[#525252]">
            We're working on additional calculators including frame size, tyre pressure, FTP zones, and more. Check back soon.
          </p>
        </section>

      </div>
    </main>
  )
}
