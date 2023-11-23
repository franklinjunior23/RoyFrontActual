import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@utils': path.resolve(__dirname, 'src/utils'),
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
