import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log('VITE_DEBUG:', env.VITE_DEBUG)
  console.log('COMMAND:', command) // <--- This uses 'command', so TS won't complain

  return {
    plugins: [react()],
    server: {
      ...(command === 'serve' && env.VITE_DEBUG === 'true' && {
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
