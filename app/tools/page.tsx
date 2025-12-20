import { getAllTools } from '@/lib/tools'

export default function ToolsPage() {
  const tools = getAllTools()
  
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Cycling Calculators & Tools
          </h1>
          <p className="text-lg md:text-xl text-[#525252] max-w-3xl">
            Sometimes I build tools to explain concepts in videos, free to use if you find them useful.
          </p>
        </section>

        {/* Tools Grid */}
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <a 
                key={tool.slug}
                href={`/tools/${tool.slug}`} 
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bikotic-blue hover:shadow-lg transition-all block"
              >
                <div className="w-12 h-12 bg-bikotic-blue rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">{tool.icon}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-[#0a0a0a]">
                  {tool.title}
                </h2>
                <p className="text-[#525252] mb-4">
                  {tool.description}
                </p>
                <div className="text-sm text-[#737373] mb-4">
                  {tool.features.map((feature, idx) => (
                    <span key={idx}>
                      • {feature}
                      {idx < tool.features.length - 1 && <br/>}
                    </span>
                  ))}
                </div>
                <span className="text-bikotic-blue font-semibold hover:underline">
                  Use calculator →
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No tools yet. Check back soon!</p>
          </div>
        )}

        {/* Coming Soon Section */}
        <section className="mt-16 bg-gray-100 border-2 border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-[#0a0a0a]">
            More Tools Coming Soon
          </h2>
          <p className="text-[#525252]">
            More cycling tools are in the works. Check back soon.
          </p>
        </section>

      </div>
    </main>
  )
}
