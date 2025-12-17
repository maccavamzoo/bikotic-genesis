import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  category: string
  date: string
}

export interface ReviewMeta {
  slug: string
  title: string
  description: string
  category: string
  date: string
  youtubeId: string
}

export function getAllArticles(): ArticleMeta[] {
  const articlesDir = path.join(process.cwd(), 'content/articles')
  
  if (!fs.existsSync(articlesDir)) {
    return []
  }
  
  const files = fs.readdirSync(articlesDir)
  
  const articles = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(articlesDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
      }
    })
  
  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllReviews(): ReviewMeta[] {
  const reviewsDir = path.join(process.cwd(), 'content/reviews')
  
  if (!fs.existsSync(reviewsDir)) {
    return []
  }
  
  const files = fs.readdirSync(reviewsDir)
  
  const reviews = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(reviewsDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        youtubeId: data.youtubeId,
      }
    })
  
  // Sort by date (newest first)
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
