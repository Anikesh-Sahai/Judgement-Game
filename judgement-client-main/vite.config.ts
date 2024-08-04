import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Apis': path.resolve(__dirname, './src/apis'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Constants': path.resolve(__dirname, './src/constants'),
      '@Containers': path.resolve(__dirname, './src/containers'),
      '@Models': path.resolve(__dirname, './src/models'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Routers': path.resolve(__dirname, './src/routers'),
      '@Schemas': path.resolve(__dirname, './src/schemas'),
      '@Sockets': path.resolve(__dirname, './src/sockets'),
      '@Stores': path.resolve(__dirname, './src/stores'),
      '@Utils': path.resolve(__dirname, './src/utils'),
      '@Themes': path.resolve(__dirname, './src/themes'),
    },
  },
  plugins: [react()],
})
