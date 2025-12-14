export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="bg-white border-b-2 border-gray-200 pb-4 mb-8 md:mb-12 px-6 pt-6 rounded-t-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl m-0 text-[#0a0a0a] font-bold">
            BIKOTIC
          </h1>
          <p className="text-lg md:text-xl mt-2 text-[#525252]">
            Visual Bike Comparisons & Reviews
          </p>
        </header>

        {/* Hero Section */}
        <section className="bg-white border-2 border-gray-200 p-8 md:p-12 lg:p-16 rounded-xl mb-8 md:mb-12 text-center shadow-sm">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Compare Bikes Visually
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-[#525252] max-w-3xl mx-auto">
            The ultimate tool for visual bike comparisons. See real geometry differences, fade between models, and make informed decisions.
          </p>
          <button className="bg-bikotic-blue text-white border-none px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-lg cursor-pointer hover:bg-bikotic-blue-dark transition-colors shadow-md">
            Launch Comparison Tool
          </button>
        </section>

        {/* Featured Content */}
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 text-[#0a0a0a] font-bold">
            Latest Comparisons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Article Card 1 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <h3 className="text-xl md:text-2xl mb-4 text-[#0a0a0a] font-bold">
                Specialized Tarmac SL8 vs Trek Madone Gen 7
              </h3>
              <p className="text-[#525252] leading-relaxed mb-4">
                The ultimate aero vs lightweight showdown. We compare geometry, aerodynamics, and real-world performance.
              </p>
              <a href="#" className="text-bikotic-blue no-underline font-semibold hover:underline">
                Read comparison →
              </a>
            </article>

            {/* Article Card 2 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <h3 className="text-xl md:text-2xl mb-4 text-[#0a0a0a] font-bold">
                Best Road Bikes Under $3000 (2025)
              </h3>
              <p className="text-[#525252] leading-relaxed mb-4">
                Our comprehensive buyer's guide for the best value road bikes. Real geometry comparisons included.
              </p>
              <a href="#" className="text-bikotic-blue no-underline font-semibold hover:underline">
                Read guide →
              </a>
            </article>

            {/* Article Card 3 */}
            <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
              <h3 className="text-xl md:text-2xl mb-4 text-[#0a0a0a] font-bold">
                Latest YouTube Review
              </h3>
              <p className="text-[#525252] leading-relaxed mb-4">
                Watch our latest bike review on the BIKOTIC YouTube channel with 18K subscribers.
              </p>
              <a href="#" className="text-bikotic-blue no-underline font-semibold hover:underline">
                Watch now →
              </a>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t-2 border-gray-200 text-[#525252] text-center bg-white px-6 pb-6 rounded-b-xl">
          <p>© 2025 BIKOTIC - Visual Bike Comparisons Since 2017</p>
        </footer>
      </div>
    </main>
  );
}
