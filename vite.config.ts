// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // resolve: {
  //   extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  //   alias: {
  //     '@': resolve(__dirname, './src')
  //   }
  // }
})
