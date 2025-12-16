export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <article className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Back Navigation */}
        <div className="mb-6">
          <a 
            href="/reviews" 
            className="text-bikotic-blue hover:underline font-semibold"
          >
            ← Back to Reviews
          </a>
        </div>

        {/* Review Container */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-12 shadow-sm">
          
          {/* Review Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>

          {/* Review Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Published</p>
                <p className="text-gray-900 font-semibold">December 10, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <span className="inline-block px-3 py-1 bg-bikotic-blue text-white text-sm font-bold rounded">
                  ROAD BIKE
                </span>
              </div>
              <div>
                <a 
                  href="https://youtube.com/@bikotic" 
                  target="_blank"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Related Reviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <a href="/reviews/madone-gen7" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue transition-colors">
              <div className="aspect-video bg-gray-300 flex items-center justify-center">
                <span className="text-4xl">▶️</span>
              </div>
              <div className="p-4">
                <div className="text-xs text-bikotic-blue font-bold mb-2">ROAD BIKE</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Trek Madone Gen 7 Review
                </h4>
                <p className="text-sm text-gray-600">
                  Complete review of Trek's latest aero race bike
                </p>
              </div>
            </a>

            <a href="/reviews/cervelo-s5" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue transition-colors">
              <div className="aspect-video bg-gray-300 flex items-center justify-center">
                <span className="text-4xl">▶️</span>
              </div>
              <div className="p-4">
                <div className="text-xs text-bikotic-blue font-bold mb-2">ROAD BIKE</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Cervelo S5 Review
                </h4>
                <p className="text-sm text-gray-600">
                  Testing Cervelo's aero flagship
                </p>
              </div>
            </a>

          </div>
        </div>

      </article>
    </div>
  );
}
