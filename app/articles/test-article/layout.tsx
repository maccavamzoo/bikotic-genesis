export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <article className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Back Navigation */}
        <div className="mb-6">
          <a 
            href="/articles" 
            className="text-bikotic-blue hover:underline font-semibold"
          >
            ← Back to Articles
          </a>
        </div>

        {/* Article Container */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-12 shadow-sm">
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Published</p>
                <p className="text-gray-900 font-semibold">January 15, 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <span className="inline-block px-3 py-1 bg-bikotic-blue text-white text-sm font-bold rounded">
                  COMPARISON
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <a href="#" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue transition-colors">
              <div className="text-xs text-bikotic-blue font-bold mb-2">BUYER'S GUIDE</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Best Road Bikes Under $3000
              </h4>
              <p className="text-sm text-gray-600">
                Our top picks for value road bikes in 2025
              </p>
            </a>

            <a href="#" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue transition-colors">
              <div className="text-xs text-bikotic-blue font-bold mb-2">ANALYSIS</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Aero vs Lightweight: What Actually Matters?
              </h4>
              <p className="text-sm text-gray-600">
                We crunch the numbers on bike weight vs aerodynamics
              </p>
            </a>

          </div>
        </div>

      </article>
    </div>
  );
}
