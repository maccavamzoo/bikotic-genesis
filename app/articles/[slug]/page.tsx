import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), 'content/articles')
  const files = fs.readdirSync(articlesDir)
  
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const filePath = path.join(process.cwd(), 'content/articles', `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  })

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
      {content}
    </>
  )
}
