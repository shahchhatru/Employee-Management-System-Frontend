import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import  VitePrettierPlugin from 'vite-plugin-prettier';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
    , VitePrettierPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
