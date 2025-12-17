import { getAllReviews } from '@/lib/mdx'

export const metadata = {
  title: 'Video Reviews - BIKOTIC',
  description: 'Watch our in-depth bike reviews and comparisons on YouTube',
}

export default function ReviewsPage() {
  const reviews = getAllReviews()
  
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
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review) => (
              <a 
                key={review.slug}
                href={`/reviews/${review.slug}`} 
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all block"
              >
                <div className="aspect-video bg-gray-300 flex items-center justify-center relative">
                  <span className="text-6xl">▶️</span>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-bold rounded">
                    12:34
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-bikotic-blue font-bold mb-2">
                    {review.category.toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">
                    {review.title}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    {review.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-bikotic-blue font-semibold hover:underline">
                      Watch review →
                    </span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No reviews yet. Check back soon!</p>
          </div>
        )}

      </div>
    </main>
  );
}
