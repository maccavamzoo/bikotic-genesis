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

          {/* YouTube Subscribe Button */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
            <a 
              href="https://youtube.com/@bikotic" 
              target="_blank"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Subscribe on YouTube
            </a>
          </div>

        </div>

      </article>
    </div>
  );
}
