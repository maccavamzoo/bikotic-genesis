import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

const components = {
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />
  ),
}

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
    components,
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
