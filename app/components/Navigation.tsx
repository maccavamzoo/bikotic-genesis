'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 md:gap-8 items-center">
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
          href="/tools" 
          className="text-gray-700 hover:text-bikotic-blue font-semibold transition-colors"
        >
          Tools
        </Link>
        <Link 
          href="/reviews" 
          className="text-gray-700 hover:text-bikotic-blue font-semibold transition-colors"
        >
          Reviews
        </Link>
        <Link 
          href="/app" 
          className="bg-bikotic-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-bikotic-blue-dark transition-colors"
        >
          Compare Bikes
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-gray-700 hover:text-bikotic-blue"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b-2 border-gray-200 md:hidden shadow-lg">
          <nav className="flex flex-col py-4">
            <Link 
              href="/" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-bikotic-blue font-semibold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/articles" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-bikotic-blue font-semibold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link 
              href="/tools" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-bikotic-blue font-semibold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              href="/reviews" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-bikotic-blue font-semibold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </Link>
            <Link 
              href="/app" 
              className="mx-4 mt-2 bg-bikotic-blue text-white px-4 py-3 rounded-lg font-bold hover:bg-bikotic-blue-dark transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare Bikes
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
