import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log('VITE_DEBUG:', env.VITE_DEBUG)

  return {
    plugins: [react()],
    server: {
      ...(env.VITE_DEBUG === 'true' && {
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            secure: false
          }
        }
      })
    }
  }
})
