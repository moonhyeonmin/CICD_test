import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },

  // 명시적으로 글로벌 변수를 readonly로 설정
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        global: 'readonly',
        ...globals.es2021, // 최신 ES 글로벌 변수 적용
      },
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

  // Jest 설정 추가
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        global: 'readonly',
        ...globals.es2021, // 최신 ES 글로벌 변수 적용
        ...pluginJest.environments.globals,
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
];