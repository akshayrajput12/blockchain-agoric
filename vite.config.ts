import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      'framer-motion',
    ],
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React dependencies
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'react-core';
          }
          
          // UI related dependencies
          if (id.includes('node_modules/@headlessui') || 
              id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/framer-motion')) {
            return 'ui-vendor';
          }
          
          // Web3 related dependencies - split into smaller chunks
          if (id.includes('node_modules/wagmi') || 
              id.includes('node_modules/@wagmi')) {
            return 'wagmi-vendor';
          }
          if (id.includes('node_modules/ethers')) {
            return 'ethers-vendor';
          }
          if (id.includes('node_modules/web3')) {
            return 'web3-core';
          }
          
          // Data management dependencies
          if (id.includes('node_modules/@supabase') || 
              id.includes('node_modules/@tanstack/react-query') || 
              id.includes('node_modules/zustand')) {
            return 'data-vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 500,
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
});
