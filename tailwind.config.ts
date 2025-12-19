/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bikotic-blue': '#1F3A5F',
        'bikotic-blue-dark': '#3a3b6b',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#4a4b88',
              '&:hover': {
                color: '#3a3b6b',
              },
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            strong: {
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
