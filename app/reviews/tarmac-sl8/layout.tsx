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

        </div>

      </article>
    </div>
  );
}
