import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_SERVER_DOMAIN': JSON.stringify(
        env.VITE_SERVER_DOMAIN || 'https://nsd-backend-8vtz.onrender.com'
      )
    }
  }
})
