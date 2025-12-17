import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const reviewsDir = path.join(process.cwd(), 'content/reviews')
  const files = fs.readdirSync(reviewsDir)
  
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))
}

export default async function ReviewPage({
  params,
}: {
  params: { slug: string }
}) {
  const filePath = path.join(process.cwd(), 'content/reviews', `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  })

  const youtubeId = (frontmatter as any).youtubeId

  return (
    <>
      <div className="mb-8">
        <div className="text-xs text-bikotic-blue font-bold mb-2">
          {(frontmatter as any).category?.toUpperCase()}
        </div>
        <p className="text-sm text-gray-500">
          {(frontmatter as any).date}
        </p>
      </div>
      
      {/* YouTube Embed */}
      {youtubeId && (
        <div className="aspect-video mb-8">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      )}
      
      {content}
    </>
  )
}
