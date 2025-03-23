import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import pluginJest from 'eslint-plugin-jest'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      globals: Object.entries(globals.node).reduce((acc, [key, val]) => {
        acc[key] = { readonly: true }
        return acc
      }, {}),
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        ...Object.fromEntries(
            Object.keys(globals.node).map((key) => [key, { readonly: true }])
        ),
        ...Object.fromEntries(
            Object.keys(pluginJest.environments.globals || {}).map((key) => [
              key,
              { readonly: true },
            ])
        ),
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
]