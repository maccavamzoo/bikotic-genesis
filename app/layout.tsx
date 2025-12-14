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
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
