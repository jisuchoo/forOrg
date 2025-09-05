import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify에서 상대 경로 동작을 위해 base를 './'로 지정
export default defineConfig({
  plugins: [react()],
  base: './'
})
