import { URL, fileURLToPath } from 'node:url'

import VueRouter from 'unplugin-vue-router/vite'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [VueRouter({}), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
