export const metadata = {
  title: 'Articles & Guides - BIKOTIC',
  description: 'Browse our collection of bike comparisons, buyer guides, and in-depth analysis',
}

export default function ArticlesPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Articles & Guides
          </h1>
          <p className="text-xl text-gray-600">
            Expert analysis, comparisons, and buyer guides for serious cyclists
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-bikotic-blue text-white rounded-lg font-semibold whitespace-nowrap">
            All Articles
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Comparisons
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Buyer's Guides
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Analysis
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Article Card 1 - Real Article */}
          <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all">
            <div className="text-xs text-bikotic-blue font-bold mb-2">COMPARISON</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
              Specialized Tarmac SL8 vs Trek Madone Gen 7
            </h2>
            <p className="text-gray-600 mb-4">
              The ultimate aero vs lightweight race bike showdown. We compare geometry, aerodynamics, and real-world performance.
            </p>
            <div className="flex items-center justify-between">
              <a href="/articles/test-article" className="text-bikotic-blue font-semibold hover:underline">
                Read article →
              </a>
              <span className="text-sm text-gray-500">Jan 15, 2025</span>
            </div>
          </article>

          {/* Placeholder Cards - Will be replaced with real articles */}
          <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all opacity-60">
            <div className="text-xs text-bikotic-blue font-bold mb-2">BUYER'S GUIDE</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
              Best Road Bikes Under $3000 (2025)
            </h2>
            <p className="text-gray-600 mb-4">
              Our comprehensive buyer's guide for the best value road bikes. Real geometry comparisons included.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-semibold">Coming soon...</span>
              <span className="text-sm text-gray-500">Jan 20, 2025</span>
            </div>
          </article>

          <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all opacity-60">
            <div className="text-xs text-bikotic-blue font-bold mb-2">ANALYSIS</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
              Shimano Dura-Ace vs SRAM Red AXS
            </h2>
            <p className="text-gray-600 mb-4">
              In-depth comparison of the two flagship groupsets. Weight, shifting performance, and value analysis.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-semibold">Coming soon...</span>
              <span className="text-sm text-gray-500">Jan 22, 2025</span>
            </div>
          </article>

        </div>

        {/* No Articles Message (hidden when there are articles) */}
        {/* <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No articles found. Check back soon!</p>
        </div> */}

      </div>
    </main>
  );
}
