import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'olya-portfolio',
  title: 'Olya Portfolio',
  projectId: 'v18r1vne',
  dataset: 'production',
  plugins: [structureTool({ title: 'Content' }), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
})
