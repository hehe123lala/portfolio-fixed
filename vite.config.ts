
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for flexible deployment
  define: {
    // CRITICAL FIX: Do NOT expose the entire process.env object to the client.
    // This causes build failures on Netlify due to circular references or large env vars.
    // Instead, we safely fallback undefined keys to an empty string.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // Provide a safe empty object for other random process.env accesses by libraries
    'process.env': {} 
  },
  server: {
    host: true, 
    hmr: {
        overlay: false 
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
})
