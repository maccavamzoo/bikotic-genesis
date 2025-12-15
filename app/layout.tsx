import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'BIKOTIC - Visual Bike Comparisons & Reviews',
  description: 'Compare bikes visually with interactive geometry overlays. Road bikes, MTB, gravel, e-bikes and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa] m-0">
        {/* Header */}
        <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="BIKOTIC" 
                width={180} 
                height={48}
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="flex gap-6 md:gap-8 items-center">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-bikotic-blue font-semibold transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/articles" 
                className="text-gray-700 hover:text-bikotic-blue font-semibold transition-colors"
              >
                Articles
              </Link>
              <Link 
                href="/app" 
                className="bg-bikotic-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-bikotic-blue-dark transition-colors"
              >
                Compare
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t-2 border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {/* Column 1 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">BIKOTIC</h3>
                <p className="text-gray-600 text-sm">
                  Visual bike comparisons and reviews for serious cyclists since 2017.
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/articles" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Latest Articles
                    </Link>
                  </li>
                  <li>
                    <Link href="/app" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Comparison Tool
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://youtube.com/@bikotic" 
                      target="_blank"
                      className="text-gray-600 hover:text-bikotic-blue text-sm"
                    >
                      YouTube (18K subscribers)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 BIKOTIC - Visual Bike Comparisons Since 2017
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
