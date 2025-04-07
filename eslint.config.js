import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  { ignores: ['dist'] },

  // JS + JSX
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    ...js.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    plugins: {
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prefer-const': 'warn',
      'prettier/prettier': 'error',
      'no-console': 'warn',
      // 'react/prop-types': 'off',
    },
  },

  // TS + TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.app.json'),
      },
    },
    extends: [...tseslint.configs.recommended, configPrettier],
    plugins: {
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      'prefer-const': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/no-unsafe-assignment': 'warn',
      'react-refresh/only-export-components': [
        'warn',

        {
          allowConstantExport: true,
        },
      ],
    },
  },
);
