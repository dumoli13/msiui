# mis-design

A reusable React component library built with Tailwind CSS.

## 📦 How to Install

```bash
yarn add git+http://192.168.88.22:7990/scm/imprv/mis-design.git/#VERSION_TAG
```

Replace `VERSION_TAG` with your desired version (e.g. #v1.2.3).

## ⚙️ TailwindCSS Setup

If your project uses TailwindCSS, add this to the `content` array in your `tailwind.config.js`,
so that mis-design tailwind config can be overrided:

```js
module.exports = {
  content: [
    // your existing paths...
    './node_modules/mis-design/**/*.{js,jsx,ts,tsx}',
  ],
};
```

## 🧱 Development Guide

- When creating a new component, add it to the `index.ts` file.

```js
# 1. Create new component
# 2. Add to index.ts:
export { default as Button } from './components/Button';

# 3. Add component type to index.ts:
export type { ButtonProps } from './Button';

```

- When updating the TailwindCSS library, run:

  ```bash
  npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
  ```

- Run `yarn build` before committing and pushing.
- Run `yarn export` to release a new version.

## 🌱 Branching Strategy

- Use only the `develop` and `master` branches.

  - `develop` is for ongoing development.
  - `master` is for releases.

## 🔖 Versioning Standard

- Follow the format: `x.y.z`

| Increment | When                          | Example       |
| --------- | ----------------------------- | ------------- |
| (x)       | for major changes             | 1.0.0 → 2.0.0 |
| (y)       | when releasing from `master`  | 1.0.0 → 1.1.0 |
| (z)       | when releasing from `develop` | 1.0.0 → 1.0.1 |

## License

**Proprietary** - © 2025 PT. Sat Nusapersada, Tbk - MIS Dept
