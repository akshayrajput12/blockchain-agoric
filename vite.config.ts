import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
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
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-hot-toast', 'react-dropzone', 'react-icons'],
          'ui-vendor': ['@headlessui/react', 'lucide-react', 'framer-motion'],
          'web3-vendor': ['wagmi', 'viem', 'ethers', 'web3', '@wagmi/core', '@wagmi/connectors', '@web3modal/wagmi'],
          'data-vendor': ['@supabase/supabase-js', '@tanstack/react-query', 'zustand', 'date-fns']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
