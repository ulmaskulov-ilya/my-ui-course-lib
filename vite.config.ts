import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    cssCodeSplit: false,

    rolldownOptions: {
      output: {
        assetFileNames: (asset) => {
          if (asset.names.some((name) => name.endsWith('.css'))) {
            return 'my-ui-library.css'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
});