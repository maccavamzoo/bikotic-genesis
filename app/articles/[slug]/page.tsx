import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

const components = {
  img: (props: any) => (
    <div className="flex justify-center my-8">
      <img {...props} className="rounded-lg shadow-lg max-w-full h-auto" />
    </div>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-gray-50" {...props} />
  ),
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-gray-50" {...props} />
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
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
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
