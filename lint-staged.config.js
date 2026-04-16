/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const filterFiles = (filenames) => {
  return filenames
    .map((f) => path.relative(process.cwd(), f).replace(/\\/g, '/'))
    .filter((f) => !f.includes('make-executable.js'))
    .filter((f) => !f.startsWith('dist/'))
    .filter((f) => !f.startsWith('stories/'));
};

const prettierWrite = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f).replace(/\\/g, '/'))
    .filter((f) => !f.includes('make-executable.js'))
    .filter((f) => !f.startsWith('dist/'));

  if (files.length === 0) return 'echo "No formattable files"';

  return `yarn prettier --config ./.prettierrc.json --ignore-unknown --write ${files.join(' ')}`;
};

module.exports = {
  '*.[jt]s?(x)': (filenames) => {
    const files = filterFiles(filenames);
    if (files.length === 0) return 'echo "No lintable files"';

    return [`eslint --fix --cache --max-warnings 0 ${files.join(' ')}`];
  },

  '*': prettierWrite,
};
