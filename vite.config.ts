const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'jx3-dps-core',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  // 🌸:alias @ for ./src
  resolve: {
    alias: [
      { find: '@calculator', replacement: path.resolve('src/calculator') },
      { find: '@componet', replacement: path.resolve('src/componet') },
      { find: '@config', replacement: path.resolve('src/config') },
      { find: '@packages', replacement: path.resolve('src/packages') },
      { find: '@types', replacement: path.resolve('src/types.ts') },
    ],
  },

  // 🍬:loaders
  plugins: [react()],
});
