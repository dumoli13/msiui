# MIS Design — React Component Library

A reusable React component library and design system for PT. Sat Nusapersada, Tbk (MIS Department), built with React, TypeScript, and Tailwind CSS, documented via Storybook.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Setup Provider](#setup-provider)
  - [Importing Components](#importing-components)
  - [Importing Styles](#importing-styles)
  - [Dark Mode](#dark-mode)
- [Available Commands](#available-commands)
  - [Development](#development)
  - [Building](#building)
  - [Testing](#testing)
  - [Code Quality](#code-quality)
- [Component Reference](#component-reference)
  - [Inputs](#inputs)
  - [Displays](#displays)
  - [Feedback](#feedback)
  - [Modals](#modals)
  - [Navigations](#navigations)
  - [Table](#table)
  - [Notification & Toast](#notification--toast)
  - [Typography & Icon](#typography--icon)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Requirements

- Node.js >= 18
- React >= 18
- yarn (preferred) or npm

---

## Installation

Install the package from the registry:

```bash
yarn add mis-design
# or
npm install mis-design
```

Import the stylesheet in your application entry point:

```tsx
import 'mis-design/dist/output.css';
```

---

## Usage

### Setup Provider

Wrap your application root with `MisDesignProvider`. This enables theme management and mounts the global `NotificationStack` and `ToastStack`.

```tsx
import { MisDesignProvider } from 'mis-design';

function App() {
  return (
    <MisDesignProvider defaultTheme="light">
      <YourApp />
    </MisDesignProvider>
  );
}
```

**Props:**

| Prop           | Type                  | Default   | Description                                             |
| -------------- | --------------------- | --------- | ------------------------------------------------------- |
| `defaultTheme` | `"light"` \| `"dark"` | `"light"` | Initial theme when no persisted preference is found     |
| `theme`        | `"light"` \| `"dark"` | —         | Controlled theme (overrides internal state and storage) |
| `children`     | `ReactNode`           | —         | Your application content                                |

### Importing Components

All components are exported from the root package:

```tsx
import { Button, Modal, Table, TextField } from 'mis-design';
```

### Importing Styles

The library ships pre-built CSS. Import it once at the top level of your app:

```tsx
// In your root file (e.g. main.tsx or App.tsx)
import 'mis-design/dist/output.css';
```

### Dark Mode

The provider handles dark mode by toggling `class="dark"` on `<html>` and persisting the preference in `localStorage`.

```tsx
import { useMisDesignContext } from 'mis-design';

function ThemeToggle() {
  const { theme, toggleTheme } = useMisDesignContext();

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
```

---

## Available Commands

### Development

| Command          | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `yarn storybook` | Start the Storybook dev server on **port 6006** for component development and documentation |

```bash
yarn storybook
```

### Building

| Command                | Description                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `yarn build:css`       | Regenerate `src/output.css` from Tailwind sources. **Run this after adding new Tailwind classes.**          |
| `yarn build:lib`       | Build the component library to `dist/` using Vite (runs `build:css` first)                                  |
| `yarn build:package`   | Alternative unbundled build: compiles TypeScript directly with `tsc`, then copies CSS and assets to `dist/` |
| `yarn build:storybook` | Build a static Storybook site for deployment                                                                |

```bash
# Typical library release build
yarn build:lib

# Alternative if you need unbundled output
yarn build:package

# Rebuild CSS only (after adding new Tailwind classes)
yarn build:css
```

**When to use each build command:**

- **`build:lib`** — Standard bundled build via Vite. Use this for publishing the library. Output: `dist/index.js` (ESM) and `dist/index.cjs` (CJS).
- **`build:package`** — Unbundled TypeScript output. Use when consumers need to tree-shake individual files. Runs two `tsc` configs: one for the library, one for type declarations.
- **`build:storybook`** — Creates a static documentation site in `storybook-static/`. Deploy this to a static host for team reference.
- **`build:css`** — Only regenerates the Tailwind output CSS. Run this whenever you add new Tailwind utility classes that aren't already in `src/output.css`.

### Testing

| Command               | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| `yarn test`           | Run all unit tests once (Vitest + jsdom)                                        |
| `yarn test:watch`     | Run unit tests in watch mode (re-runs on file changes)                          |
| `yarn test:coverage`  | Run unit tests and generate a coverage report                                   |
| `yarn test:storybook` | Run Storybook interaction tests (requires Storybook to be running on port 6006) |
| `yarn test:all`       | Run all test suites (unit + Storybook)                                          |

```bash
# During development
yarn test:watch

# Before committing
yarn test

# Check coverage
yarn test:coverage

# Run Storybook interaction tests
yarn storybook          # In one terminal
yarn test:storybook     # In another terminal
```

### Code Quality

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `yarn lint`         | Lint `src/` with ESLint (zero warnings allowed)              |
| `yarn lint:fix`     | Auto-fix ESLint issues                                       |
| `yarn format`       | Format all files with Prettier                               |
| `yarn format:check` | Check formatting without writing changes                     |
| `yarn type:check`   | Run TypeScript type checking without emitting files          |
| `yarn clean`        | Remove `dist/`, `coverage/`, and `storybook-static/`         |
| `yarn validate`     | Run lint, type-check, tests, and format check in one command |

```bash
# Check everything before pushing
yarn validate

# Or run individually
yarn type:check && yarn lint && yarn format:check && yarn test
```

> **Note:** A pre-commit hook (via Husky + lint-staged) automatically runs ESLint and Prettier on staged files before each commit.

---

## Component Reference

### Inputs

Form controls and interactive input components.

| Component              | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `Button`               | Standard button with variants and sizes                                     |
| `IconButton`           | Button that displays an icon                                                |
| `TextField`            | Single-line text input                                                      |
| `NumberTextField`      | Numeric input with formatting                                               |
| `PasswordField`        | Password input with visibility toggle                                       |
| `TextArea`             | Multi-line text input                                                       |
| `RichTextField`        | Rich text editor (Tiptap-based, supports formatting, images, links, tables) |
| `Select`               | Dropdown select                                                             |
| `AutoComplete`         | Single-value autocomplete dropdown select with search                       |
| `AutoCompleteMultiple` | Multi-value autocomplete dropdown select with search                        |
| `InputDropdown`        | Combined text input with dropdown                                           |
| `Checkbox`             | Checkbox input                                                              |
| `RadioGroup`           | Radio button group                                                          |
| `Switch`               | Toggle switch                                                               |
| `DatePicker`           | Single date picker (dayjs-based)                                            |
| `DateRangePicker`      | Date range selection                                                        |
| `MultipleDatePicker`   | Select multiple individual dates                                            |
| `TimerField`           | Time input                                                                  |
| `Uploader`             | File upload input                                                           |
| `Form`                 | Form wrapper with layout utilities                                          |

```tsx
import { Button, TextField, Select } from 'mis-design';

<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

<TextField label="Name" placeholder="Enter your name" />

<Select
  options={[{ label: 'Option 1', value: '1' }]}
  onChange={(val) => console.log(val)}
/>
```

### Displays

Non-interactive display and presentation components.

| Component      | Description                                  |
| -------------- | -------------------------------------------- |
| `Accordion`    | Collapsible content panel                    |
| `Avatar`       | User avatar with image or initials fallback  |
| `Chip`         | Compact element for tags or filters          |
| `Tag`          | Label/badge for categorization               |
| `Tooltip`      | Hover tooltip                                |
| `Popover`      | Click-triggered overlay with content         |
| `Popper`       | Low-level positioning primitive              |
| `Skeleton`     | Loading placeholder                          |
| `ImageViewer`  | Lightbox-style image viewer                  |
| `PdfViewer`    | PDF document viewer with zoom and pagination |
| `PdfThumbnail` | Clickable PDF thumbnail preview              |

### Feedback

| Component | Description         |
| --------- | ------------------- |
| `Drawer`  | Slide-in side panel |

### Modals

Compose modal dialogs using the sub-components:

| Component     | Description                  |
| ------------- | ---------------------------- |
| `Modal`       | Modal container and backdrop |
| `ModalHeader` | Modal title bar              |
| `ModalBody`   | Modal content area           |
| `ModalFooter` | Modal action bar             |

```tsx
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'mis-design';

<Modal open={isOpen} onClose={() => setOpen(false)}>
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content goes here.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>;
```

### Navigations

| Component    | Description             |
| ------------ | ----------------------- |
| `Pagination` | Page navigation control |

### Table

The most feature-rich component in the library.

| Export  | Description               |
| ------- | ------------------------- |
| `Table` | Main data table component |

Features:

- Column sorting and filtering
- Global search
- Row and column selection
- Sticky header, footer, and columns
- Drag-and-drop column reordering (`@dnd-kit`)
- Pagination integration

### Notification & Toast

Global notification and toast systems are mounted automatically by `MisDesignProvider`. Use the hooks to trigger them:

```tsx
import { useNotification, useToast } from 'mis-design';

function MyComponent() {
  const { notify } = useNotification();
  const { toast } = useToast();

  return (
    <>
      <button
        onClick={() => notify({ title: 'Done!', message: 'Task completed.' })}
      >
        Show Notification
      </button>
      <button onClick={() => toast({ message: 'Saved!', type: 'success' })}>
        Show Toast
      </button>
    </>
  );
}
```

### Typography & Icon

| Export       | Description                                        |
| ------------ | -------------------------------------------------- |
| `Typography` | Semantic text component with style variants        |
| `Icon`       | SVG icon component — accepts an `IconNames` string |

```tsx
import { Typography, Icon } from 'mis-design';

<Typography variant="h1">Heading</Typography>
<Icon name="check-circle" size={24} />
```

---

## Project Structure

```
src/
├── components/          # React components grouped by category
│   ├── Displays/        # Accordion, Avatar, Chip, Tag, Tooltip, etc.
│   ├── Feedback/        # Drawer
│   ├── Inputs/          # Button, TextField, DatePicker, Select, etc.
│   ├── Modals/          # Modal, ModalHeader, ModalBody, ModalFooter
│   ├── Navigations/     # Pagination
│   ├── Notification/    # NotificationStack + useNotification hook
│   ├── Table/           # Advanced data table
│   ├── Toast/           # ToastStack + useToast hook
│   ├── Icon.tsx
│   ├── Portal.tsx
│   └── Typography.tsx
├── types/               # TypeScript prop types mirroring components/
├── context/             # MisDesignProvider + useMisDesignContext
├── const/               # Shared constants (Theme enum, etc.)
├── libs/                # Utility/helper functions
├── input.css            # Tailwind CSS entry point
└── output.css           # Generated — do not edit manually

test/                    # Unit tests mirroring src/components/ structure
stories/                 # Storybook stories mirroring src/components/
.storybook/              # Storybook config (main.js, preview.tsx)
dist/                    # Build output (not committed)
```

---

## Accessibility

Components follow WAI-ARIA patterns where applicable:

- **Modal** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linked to `ModalHeader`, focus trapping, and focus restoration on close.
- **Drawer** — `role="dialog"`, `aria-modal="true"`, `aria-label="Drawer"`.
- **Accordion** — `aria-expanded`, `aria-controls` on trigger buttons; `role="region"` and `aria-labelledby` on content panels.
- **Tooltip** — `role="tooltip"` with `aria-describedby` linkage; keyboard-accessible via focus/blur.
- **Popover** — `role="dialog"` on content; Escape key dismissal.
- **AutoComplete** — `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`.

All components support dark mode via Tailwind `dark:` prefixes.

---

## Contributing

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start Storybook for component development:

   ```bash
   yarn storybook
   ```

3. Add or update a component under `src/components/<Category>/`.

4. Add or update corresponding types in `src/types/<Category>/`.

5. Export the component through the category `index.ts` barrel file.

6. Add a story in `stories/<Category>/ComponentName.stories.tsx`. Make sure to:
   - Import `../../src/output.css`
   - Add `tags: ['autodocs']`
   - Define `argTypes` for all props
   - Export named stories for each variant

7. If you added new Tailwind classes, rebuild CSS:

   ```bash
   yarn build:css
   ```

8. Add unit tests in `test/components/<Category>/ComponentName.test.tsx`.

9. Run the full validation suite before committing:

   ```bash
   yarn validate
   ```

   The pre-commit hook (Husky + lint-staged) will automatically lint and format staged files.
