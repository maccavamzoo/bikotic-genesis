import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // The gear calculator moved to its own app (Vercel project bikotic-gearing).
      // Temporary (307) so it can point at bikotic.com later.
      { source: '/tools/gear-calculator', destination: 'https://bikotic-gearing.vercel.app/', permanent: false },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
