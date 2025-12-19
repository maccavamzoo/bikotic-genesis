import { getAllArticles } from '@/lib/mdx'

export const metadata = {
  title: 'Articles & Guides - BIKOTIC',
  description: 'Browse our collection of bike comparisons, buyer guides, and in-depth analysis',
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  
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
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-bikotic-blue font-semibold hover:underline">
                      Read article →
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles yet. Check back soon!</p>
          </div>
        )}

      </div>
    </main>
  );
}
