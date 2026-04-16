import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.*'],
      rollupTypes: false, // merges all .d.ts into one index.d.ts
      tsconfigPath: './tsconfig.types.json',
    }),
  ],
  build: {
    target: ['es2020', 'chrome80', 'edge80', 'safari13', 'firefox78'],
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MisDesign',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'gsap',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          gsap: 'gsap',
        },
        assetFileNames: 'output.css', // matches mis-design's existing convention
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
