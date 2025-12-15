export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <section className="bg-white border-2 border-gray-200 p-8 md:p-12 lg:p-16 rounded-xl mb-12 text-center shadow-sm">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Visual Bike Comparisons & Pro Tools
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-[#525252] max-w-3xl mx-auto">
            Compare bikes visually, use professional cycling calculators, and read expert reviews from our YouTube channel.
          </p>
          <button className="bg-bikotic-blue text-white border-none px-8 py-4 text-lg font-bold rounded-lg cursor-pointer hover:bg-bikotic-blue-dark transition-colors shadow-md">
            Launch Visual Comparison Tool
          </button>
        </section>

        {/* Cycling Tools Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl text-[#0a0a0a] font-bold">
              Cycling Calculators & Tools
            </h2>
            <a href="/tools" className="text-bikotic-blue font-semibold hover:underline">
              View all →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool Card 1 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Gear Ratio Calculator
              </h3>
              <p className="text-[#525252] mb-4">
                Calculate optimal gear ratios for climbing, sprinting, and time trials.
              </p>
              <a href="/tools/gear-calculator" className="text-bikotic-blue font-semibold hover:underline">
                Use tool →
              </a>
            </article>

            {/* Tool Card 2 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">💨</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Tire Pressure Calculator
              </h3>
              <p className="text-[#525252] mb-4">
                Find your optimal tire pressure based on weight, tire size, and conditions.
              </p>
              <a href="/tools/tire-pressure" className="text-bikotic-blue font-semibold hover:underline">
                Use tool →
              </a>
            </article>

            {/* Tool Card 3 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                FTP Calculator
              </h3>
              <p className="text-[#525252] mb-4">
                Estimate your Functional Threshold Power and training zones.
              </p>
              <a href="/tools/ftp-calculator" className="text-bikotic-blue font-semibold hover:underline">
                Use tool →
              </a>
            </article>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl text-[#0a0a0a] font-bold">
              Latest Articles & Guides
            </h2>
            <a href="/articles" className="text-bikotic-blue font-semibold hover:underline">
              View all →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Article Card 1 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="text-xs text-bikotic-blue font-bold mb-2">COMPARISON</div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Shimano Dura-Ace vs SRAM Red AXS
              </h3>
              <p className="text-[#525252] mb-4">
                In-depth comparison of the two flagship groupsets. Weight, shifting performance, and value analysis.
              </p>
              <a href="/articles/shimano-vs-sram" className="text-bikotic-blue font-semibold hover:underline">
                Read article →
              </a>
            </article>

            {/* Article Card 2 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="text-xs text-bikotic-blue font-bold mb-2">BUYER'S GUIDE</div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Best Aero Wheels Under $2000
              </h3>
              <p className="text-[#525252] mb-4">
                Our top picks for aero wheels that won't break the bank. Real-world testing included.
              </p>
              <a href="/articles/best-aero-wheels" className="text-bikotic-blue font-semibold hover:underline">
                Read guide →
              </a>
            </article>

            {/* Article Card 3 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="text-xs text-bikotic-blue font-bold mb-2">ANALYSIS</div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Aero vs Lightweight: What Actually Matters?
              </h3>
              <p className="text-[#525252] mb-4">
                We crunch the numbers on aero savings vs weight penalties for different riding scenarios.
              </p>
              <a href="/articles/test-article" className="text-bikotic-blue font-semibold hover:underline">
                Read analysis →
              </a>
            </article>
          </div>
        </section>

        {/* YouTube Reviews Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl text-[#0a0a0a] font-bold">
              Latest Video Reviews
            </h2>
            <a href="https://youtube.com/@bikotic" target="_blank" className="text-bikotic-blue font-semibold hover:underline">
              View channel →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Card 1 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="aspect-video bg-gray-300 flex items-center justify-center">
                <span className="text-6xl">▶️</span>
              </div>
              <div className="p-6">
                <div className="text-xs text-bikotic-blue font-bold mb-2">VIDEO REVIEW</div>
                <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                  Specialized Tarmac SL8 - Full Review
                </h3>
                <p className="text-[#525252] mb-4">
                  Our complete review of the latest Tarmac. Geometry analysis, weight weigh-in, and ride impressions.
                </p>
                <a href="/reviews/tarmac-sl8" className="text-bikotic-blue font-semibold hover:underline">
                  Watch review →
                </a>
              </div>
            </article>

            {/* Video Card 2 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all">
              <div className="aspect-video bg-gray-300 flex items-center justify-center">
                <span className="text-6xl">▶️</span>
              </div>
              <div className="p-6">
                <div className="text-xs text-bikotic-blue font-bold mb-2">VIDEO COMPARISON</div>
                <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                  Trek Madone vs Cervelo S5 - Back to Back Test
                </h3>
                <p className="text-[#525252] mb-4">
                  We ride both bikes on the same route to compare aero performance and handling.
                </p>
                <a href="/reviews/madone-vs-s5" className="text-bikotic-blue font-semibold hover:underline">
                  Watch comparison →
                </a>
              </div>
            </article>
          </div>
        </section>

      </div>
    </main>
  );
}
