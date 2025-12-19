import './globals.css'
import Link from 'next/link'
import Navigation from './components/Navigation'
import Logo from './components/Logo'

export const metadata = {
  title: 'BIKOTIC - Visual Bike Comparison Tool & Reviews',
  description: 'Compare bikes visually with scaled photos side-by-side. Professional cycling calculators, tools, and expert reviews.',
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
            <Link href="/" className="flex items-center text-bikotic-blue">
              <Logo />
            </Link>

            {/* Navigation */}
            <Navigation />
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
                  "I just really like bikes."
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/app" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Visual Bike Comparison Tool
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Latest Articles
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Cycling Calculators & Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/reviews" className="text-gray-600 hover:text-bikotic-blue text-sm">
                      Video Reviews
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
                      className="text-gray-600 hover:text-bikotic-blue text-sm flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
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
