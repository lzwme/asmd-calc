/*
 * @Author: renxia
 * @Date: 2024-04-10 10:10:45
 * @LastEditors: renxia
 * @LastEditTime: 2025-04-02 16:46:22
 * @Description:
 */
// module.exports = [
//   ...require('./preset/eslint'),
// ];
const path = require('path');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        globals: {
          ...globals.node,
        },
        parserOptions: {
          tsconfigRootDir: path.resolve(__dirname),
          project: path.resolve('./tsconfig.eslint.json'),
          projectFolderIgnoreList: ['**/node_modules/**', '**/dist/**'],
          warnOnUnsupportedTypeScriptVersion: false,
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2023,
          sourceType: 'module',
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: false,
      },
      plugins: {
        prettier: require('eslint-plugin-prettier'),
        // unicorn: require('eslint-plugin-unicorn'),
      },
      ignores: ['**/node_modules/**', 'dist/**', 'cjs/**', 'esm/**', 'docs/**', 'mock/**', '**/*.js', '**/*.d.ts'],
      rules: {
        'prettier/prettier': 'warn',
        indent: ['off', 2],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
        // TODO
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
      files: ['src/**/*.ts'],
    },
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      ...tseslint.configs.disableTypeChecked,
    },
  ),
];
