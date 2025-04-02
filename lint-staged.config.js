/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const lintFix = (filenames) =>
  `yarn lint:fix ${filenames
    .filter((f) => !f.includes('make-executable.js'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const prettierWrite = (filenames) =>
  `yarn prettier --config ./.prettierrc.json --ignore-unknown --write ${filenames
    .filter((f) => !f.includes('make-executable.js'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '**/*.ts?(x)': () => 'yarn type:check',
  '*.{js,jsx,ts,tsx}': lintFix,
  '**/*': prettierWrite,
};
