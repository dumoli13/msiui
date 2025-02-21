# mis-design

import with
yarn add git+http://192.168.88.22:7990/scm/imprv/mis-design.git/#develop

- when creating new component, add it to the index.ts file
- yarn build before commit and push
- update the version in package.json
- add new label branch with the version number
- create a new release in github

if your project use tailwindcss, add this in the array of content of tailwind.config.js:
'./node_modules/mis-design/\*_/_.{js,jsx,ts,tsx}', // Add this line
