# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MIS Design Storybook is a private React component library and design system for PT. Sat Nusapersada, Tbk (MIS Department). It provides reusable UI components documented via Storybook.

## Commands

```bash
yarn storybook        # Start Storybook dev server on port 6006
yarn build:storybook  # Build static Storybook for production
yarn build:lib        # Build the component library to dist/ via Vite (runs build:css first)
yarn build:package    # Alternate unbundled build: tsc directly + copy CSS/assets to dist/
yarn build:css        # Regenerate Tailwind CSS output (run after adding new Tailwind classes)
yarn lint             # Lint src/ with ESLint (zero warnings allowed)
yarn lint:fix         # Auto-fix ESLint issues
yarn test             # Run unit tests once (vitest, jsdom)
yarn test:watch       # Run unit tests in watch mode
yarn test:coverage    # Run unit tests with coverage report
yarn test:storybook   # Run Storybook interaction tests (requires Storybook running)
yarn type:check       # TypeScript type check without emitting
yarn format           # Format all files with Prettier
yarn format:check     # Check formatting without writing
```

Unit tests live in `src/**/*.test.{ts,tsx}` and use `jsdom`. Storybook tests run in a headless Chromium browser via Playwright.

## Architecture

### Directory Structure

```
src/
├── components/          # React components, grouped by semantic category
│   ├── Displays/        # Non-interactive display components (Accordion, Avatar, Chip, Tag, Tooltip, etc.)
│   ├── Feedback/        # Drawer and feedback components
│   ├── Inputs/          # Form inputs (Button, TextField, DatePicker, Select, Uploader, etc.)
│   ├── Modals/          # Modal dialogs
│   ├── Navigations/     # Pagination and navigation
│   ├── Notification/    # Notification stack system
│   ├── Table/           # Advanced data table
│   ├── Toast/           # Toast notification system
│   ├── Icon.tsx
│   ├── Portal.tsx
│   └── Typography.tsx
├── types/               # TypeScript types, mirroring the components/ structure
├── context/             # MisDesignProvider (theme + notification/toast stacks)
├── const/               # Shared constants
├── libs/                # Utility/helper functions
├── input.css            # Tailwind entry point
└── output.css           # Generated — do not edit manually
stories/                 # Storybook story files, mirroring src/components/ structure
.storybook/              # Storybook config (main.js, preview.tsx)
```

### Key Patterns

**Component definition**: Use `React.forwardRef` for interactive components. Use `classnames` package for building conditional class strings. All style variants are defined inline as class maps (no CSS modules or styled-components).

**Dark mode**: All components include dark mode via Tailwind `dark:` prefixes. Dark mode is toggled by adding/removing the `class="dark"` on `<html>`. The `MisDesignProvider` manages this.

**Types**: Each component's props are defined in `src/types/<category>/ComponentName.ts` and exported through barrel files up to `src/index.ts`.

**Exports**: `src/index.ts` → re-exports from `src/components/` and `src/types/`. Each category directory has its own `index.ts`.

**Context**: Wrap the app in `<MisDesignProvider>` from `src/context/`. Use `useMisDesignContext()` to access `theme` and `toggleTheme`. The provider also mounts `NotificationStack` and `ToastStack`.

**Stories**: Placed in `stories/<category>/ComponentName.stories.tsx`. Import `../../src/output.css` in every story file. Use `tags: ['autodocs']`, define `argTypes` for all props, and export named stories as `StoryObj<Props>`. Show all variants (color, size, etc.) in separate named story exports.

### Table Component

The `Table` component (`src/components/Table/`) is the most complex component. It supports:

- Drag-and-drop column reordering via `@dnd-kit/core` and `@dnd-kit/sortable`
- Sticky header/footer and sticky columns via `useFreezeLayout` hook
- Sorting, filtering, search, pagination, row/column selection

### Styling

Tailwind config (`tailwind.config.js`) defines the full design token system:

- **Colors**: neutral, primary, danger, warning, success, info, highlight, accent — each with `light`/`dark` variants
- **Screens**: `xs`, `sm`, `md`, `lg`, `xl`
- **Custom animations**: accordion-open/close, plus standard Tailwind animations

After adding any new Tailwind classes, run `yarn build:css` to update `output.css`.

### Notable Dependencies

- `@dnd-kit/*` — drag-drop table reordering
- `@tiptap/*` — rich text editor (RichTextField component)
- `dayjs` — date handling in DatePicker
- `classnames` — conditional class composition
- `react-router-dom` v7
- `use-debounce` — debouncing in search/filter inputs

## Naming Conventions

- **Components**: PascalCase (e.g., `DateRangePicker`)
- **Files**: Match component name exactly (e.g., `DateRangePicker.tsx`)
- **Types**: PascalCase, suffix with `Props` for component props (e.g., `DateRangePickerProps`)
- **Hooks**: camelCase with `use` prefix (e.g., `useFreezeLayout`)
- **Constants**: SCREAMING_SNAKE_CASE for module-level, camelCase for local
- **Stories**: `ComponentName.stories.tsx`, named exports per variant

## Testing Patterns

- Unit tests live in `test/components/<Category>/ComponentName.test.tsx`
- Use `@testing-library/react` — query by role/label, not by class or test-id
- Test behavior, not implementation (no snapshot tests unless explicitly needed)
- Mock only at system boundaries (external APIs, browser APIs)
- Run tests with: `rtk yarn test`

## Git Workflow

- Branch from `develop`, PR target is `develop`
- Main/production branch is `master` — PRs to master only for releases
- Commit messages: imperative present tense ("Add X", "Fix Y", "Update Z")
- Run `yarn lint` and `yarn type:check` before committing
- Build dist before publishing: `yarn build:lib`
