import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 根据环境变量设置基本路径
  // 在 GitHub Pages 中使用仓库名称作为基本路径
  // 例如，如果你的 GitHub 仓库是 username/plan-manager，那么 base 就是 '/plan-manager/'
  base: process.env.NODE_ENV === 'production' ? '/plan-manager/' : '/',
  plugins: [react()],
  server: {
    port: 9528,
  },
})
