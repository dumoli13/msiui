import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: [['@babel/preset-react', { runtime: 'automatic' }]],
      },
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./test/setup.ts'],
          include: ['test/**/*.test.{ts,tsx}'],
          pool: 'forks',
          maxForks: 4,
          coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.d.ts', 'src/output.css', 'src/input.css'],
          },
        },
      },
    ],
  },
});
