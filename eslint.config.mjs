import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        ignores: [
            '**/.eslintrc.js',
            'postcss.config.*',
            'tailwind.config.*',
            'packages/types/index.ts',
            'eslint.config.mjs',
        ],
    },

    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ),

    {
        plugins: {
            '@typescript-eslint': typescriptEslintEslintPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            prettier: prettierPlugin,
            react,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                React: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',

            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^@?\\w'],
                        ['^@/'],
                        ['^\\.'],
                    ],
                },
            ],

            'unused-imports/no-unused-imports': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4,
                    useTabs: false,
                },
            ],

            'react/display-name': 'off',
            'react/no-unescaped-entities': 'off',

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    },
];
