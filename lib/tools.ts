import fs from 'fs'
import path from 'path'

export interface ToolMeta {
  slug: string
  title: string
  description: string
  icon: string
  features: string[]
  date: string
}

export function getAllTools(): ToolMeta[] {
  const toolsDir = path.join(process.cwd(), 'app/tools')
  
  if (!fs.existsSync(toolsDir)) {
    return []
  }
  
  const entries = fs.readdirSync(toolsDir, { withFileTypes: true })
  
  const tools = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name
      const metadataPath = path.join(toolsDir, slug, 'metadata.json')
      
      // Skip if no metadata file exists
      if (!fs.existsSync(metadataPath)) {
        return null
      }
      
      const metadataContent = fs.readFileSync(metadataPath, 'utf8')
      const metadata = JSON.parse(metadataContent)
      
      return {
        slug,
        ...metadata
      }
    })
    .filter((tool): tool is ToolMeta => tool !== null)
  
  // Sort by date (newest first)
  return tools.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
