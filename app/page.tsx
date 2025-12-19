import { getAllArticles, getAllReviews } from '@/lib/mdx'

export default function Home() {
  const articles = getAllArticles().slice(0, 3) // Latest 3 articles
  const reviews = getAllReviews().slice(0, 2) // Latest 2 reviews
  
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section - Comparison Tool */}
        <section className="bg-white border-2 border-gray-200 p-8 md:p-12 lg:p-16 rounded-xl mb-12 text-center shadow-sm">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Visual Bike Comparison Tool
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-[#525252] max-w-3xl mx-auto">
            Compare bikes visually with scaled photos side-by-side. Professional cycling calculators, tools, and expert reviews from our YouTube channel.
          </p>
          <button className="bg-bikotic-blue text-white border-none px-8 py-4 text-lg font-bold rounded-lg cursor-pointer hover:bg-bikotic-blue-dark transition-colors shadow-md">
            Launch Visual Bike Comparison Tool
          </button>
        </section>

        {/* Latest Articles Section */}
        {articles.length > 0 && (
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
              {articles.map((article) => (
                <a 
                  key={article.slug}
                  href={`/articles/${article.slug}`} 
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all block"
                >
                  {article.featuredImage && (
                    <div className="aspect-video bg-gray-300 relative overflow-hidden">
                      <img 
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs text-bikotic-blue font-bold mb-2">
                      {article.category.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                      {article.title}
                    </h3>
                    <p className="text-[#525252] mb-4">
                      {article.description}
                    </p>
                    <span className="text-bikotic-blue font-semibold hover:underline">
                      Read article →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

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
            {/* Gear Calculator */}
            <a href="/tools/gear-calculator" className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all block">
              <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">⚙️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                Gear Ratio Calculator
              </h3>
              <p className="text-[#525252] mb-4">
                Compare gear ratios between bikes. Calculate speeds, gear inches, development, and more.
              </p>
              <span className="text-bikotic-blue font-semibold hover:underline">
                Use tool →
              </span>
            </a>
          </div>
        </section>

        {/* YouTube Reviews Section */}
        {reviews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-[#0a0a0a] font-bold">
                Latest Video Reviews
              </h2>
              <a href="/reviews" className="text-bikotic-blue font-semibold hover:underline">
                View all →
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <a 
                  key={review.slug}
                  href={`/reviews/${review.slug}`} 
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-bikotic-blue hover:shadow-lg transition-all block"
                >
                  <div className="aspect-video bg-gray-300 relative overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${review.youtubeId}/maxresdefault.jpg`}
                      alt={review.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-bikotic-blue font-bold mb-2">
                      {review.category.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                      {review.title}
                    </h3>
                    <p className="text-[#525252] mb-4">
                      {review.description}
                    </p>
                    <span className="text-bikotic-blue font-semibold hover:underline">
                      Watch review →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
