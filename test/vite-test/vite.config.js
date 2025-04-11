import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vue-notification-center': resolve(__dirname, '../../dist/'),
      '@lib': resolve(__dirname, '../../src/lib/')
    }
  }
})
