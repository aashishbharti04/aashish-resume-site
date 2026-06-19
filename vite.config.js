import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/<your-repo-name>/' BEFORE deploying to GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/aashish-resume-site/'
})
