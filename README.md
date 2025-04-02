# mis-design

- when creating new component, add it to the index.ts file
- when updating tailwind library, run 'npx tailwindcss -i ./src/input.css -o ./src/output.css --watch'
- yarn build before commit and push
- yarn export to release a new version
- use only branch develop and master. develop is for developing and master is for releasing
- version standar has to be x1.x2.x3
- increase x1 for major changes, x2 when release from master, and x3 when release from develop
- import with
  `yarn add git+http://192.168.88.22:7990/scm/imprv/mis-design.git/#v1.0.0`

if your project use tailwindcss, add this in the array of content of tailwind.config.js:
'./node\*modules/mis-design/\*\*/\_.{js,jsx,ts,tsx}', // Add this line
