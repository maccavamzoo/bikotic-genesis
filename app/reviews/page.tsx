export const metadata = {
  title: 'Video Reviews - BIKOTIC',
  description: 'Watch our in-depth bike reviews and comparisons on YouTube',
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video Reviews
          </h1>
          <p className="text-xl text-gray-600">
            In-depth bike reviews from our YouTube channel (18K+ subscribers)
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-bikotic-blue text-white rounded-lg font-semibold whitespace-nowrap">
            All Videos
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Road Bikes
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            MTB
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Gravel
          </button>
          <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-bikotic-blue transition-colors whitespace-nowrap">
            Comparisons
          </button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Video Card 1 */}
          <article className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all">
            <div className="aspect-video bg-gray-300 flex items-center justify-center relative">
              <span className="text-6xl">▶️</span>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-bold rounded">
                12:34
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-bikotic-blue font-bold mb-2">ROAD BIKE</div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                Specialized Tarmac SL8 - Full Review
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Complete review of the latest Tarmac. Geometry analysis, weight weigh-in, and ride impressions.
              </p>
              <div className="flex items-center justify-between">
                <a href="/reviews/tarmac-sl8" className="text-bikotic-blue font-semibold hover:underline">
                  Watch review →
                </a>
                <span className="text-sm text-gray-500">Dec 10, 2024</span>
              </div>
            </div>
          </article>

          {/* Video Card 2 */}
          <article className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all">
            <div className="aspect-video bg-gray-300 flex items-center justify-center relative">
              <span className="text-6xl">▶️</span>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-bold rounded">
                15:22
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-bikotic-blue font-bold mb-2">COMPARISON</div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                Trek Madone vs Cervelo S5 - Back to Back
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                We ride both bikes on the same route to compare aero performance and handling.
              </p>
              <div className="flex items-center justify-between">
                <a href="/reviews/madone-vs-s5" className="text-bikotic-blue font-semibold hover:underline">
                  Watch review →
                </a>
                <span className="text-sm text-gray-500">Dec 5, 2024</span>
              </div>
            </div>
          </article>

          {/* Placeholder Cards */}
          <article className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all opacity-60">
            <div className="aspect-video bg-gray-300 flex items-center justify-center relative">
              <span className="text-6xl">▶️</span>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-bold rounded">
                10:15
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-bikotic-blue font-bold mb-2">GRAVEL</div>
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                Canyon Grizl CF SLX Review
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Testing Canyon's latest gravel bike on mixed terrain and rough roads.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-semibold">Coming soon...</span>
                <span className="text-sm text-gray-500">Dec 15, 2024</span>
              </div>
            </div>
          </article>

        </div>

      </div>
    </main>
  );
}
