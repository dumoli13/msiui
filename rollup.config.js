import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    resolve(),
    typescript(),
    postcss({
      extract: true, // Extracts CSS into separate files
      modules: true, // Enables CSS modules (optional)
      plugins: [require('tailwindcss'), require('autoprefixer')],
    }),
    copy({
      targets: [
        { src: 'src/**/*.css', dest: 'dist' }, // Copy CSS files to dist
      ],
    }),
  ],
};