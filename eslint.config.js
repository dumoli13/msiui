/* eslint-disable @typescript-eslint/no-require-imports */
const pluginJs = require('@eslint/js');
const pluginImport = require('eslint-plugin-import-x');
const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginSonarjs = require('eslint-plugin-sonarjs');
const pluginPromise = require('eslint-plugin-promise');
const pluginUnicorn = require('eslint-plugin-unicorn').default;
const pluginTestingLibrary = require('eslint-plugin-testing-library');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = [
  {
    ignores: ['stories/**', 'dist/**', 'storybook-static/**'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginSonarjs.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'import-x': pluginImport,
      'jsx-a11y': pluginJsxA11y,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      unicorn: pluginUnicorn,
    },
    rules: {
      // ── Console ──
      'no-console': ['error', { allow: ['error'] }],

      // ── React ──
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'ignore',
        },
      ],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      'react/no-string-refs': 'error',
      'react/no-danger': 'error',

      // ── TypeScript ──
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      // ── React Hooks ──
      'react-hooks/exhaustive-deps': 'error',

      // ── Import rules ──
      'import-x/named': 'error',
      'import-x/no-restricted-paths': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-internal-modules': 'off',
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-unused-modules': 'off',

      // ── Accessibility (all errors, not warnings) ──
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/autocomplete-valid': 'error',
      'jsx-a11y/control-has-associated-label': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
      'jsx-a11y/no-noninteractive-tabindex': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',

      // ── Security ──
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // ── Variable hygiene ──
      'prefer-const': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-var': 'error',

      // ── Dead code ──
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',

      // ── Promise handling ──
      'no-promise-executor-return': 'error',

      // ── Code clarity ──
      // Disabled: sonarjs/no-nested-conditional covers this with more nuance
      'no-nested-ternary': 'off',
      'no-unneeded-ternary': 'error',
      'no-else-return': ['error', { allowElseIf: false }],

      // ── Redundant code ──
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-lonely-if': 'error',
      'object-shorthand': ['error', 'always'],

      // ── SonarJS overrides ──
      'sonarjs/cognitive-complexity': ['error', 40],
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-unused-collection': 'error',

      // ── Unicorn (cherry-picked) ──
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-useless-undefined': 'error',
    },
  },

  // ── Test file overrides ──
  {
    files: ['test/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    plugins: { 'testing-library': pluginTestingLibrary },
    rules: {
      'testing-library/await-async-queries': 'error',
      'testing-library/no-unnecessary-act': 'error',
      'testing-library/prefer-screen-queries': 'error',
      // Non-null assertions are standard in tests after expect() assertions
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Test descriptions and selectors are naturally repetitive
      'sonarjs/no-duplicate-string': 'off',
      // Test helpers often share identical setup/teardown logic
      'sonarjs/no-identical-functions': 'off',
    },
  },

  // ── eslint-config-prettier MUST be last to override formatting rules ──
  eslintConfigPrettier,
];
