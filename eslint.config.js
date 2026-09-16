import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Atomic Design: forbid upward UI imports & leftover FSD paths
  {
    files: ['src/components/atoms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/molecules', '@/components/molecules/*'],
              message: 'Atoms must not import molecules.',
            },
            {
              group: ['@/components/organisms', '@/components/organisms/*'],
              message: 'Atoms must not import organisms.',
            },
            {
              group: ['@/components/templates', '@/components/templates/*'],
              message: 'Atoms must not import templates.',
            },
            {
              group: ['@/components/pages', '@/components/pages/*'],
              message: 'Atoms must not import pages.',
            },
            {
              group: [
                '@/lib/book',
                '@/lib/book/*',
                '@/lib/cart',
                '@/lib/cart/*',
                '@/lib/auth',
                '@/lib/auth/*',
                '@/lib/user',
                '@/lib/user/*',
                '@/lib/order',
                '@/lib/order/*',
                '@/lib/favorite',
                '@/lib/favorite/*',
                '@/lib/review',
                '@/lib/review/*',
                '@/lib/admin',
                '@/lib/admin/*',
                '@/lib/api',
                '@/lib/api/*',
                '@/lib/hooks',
                '@/lib/hooks/*',
              ],
              message: 'Atoms may only import @/lib/utils (e.g. cn), not domain lib.',
            },
            {
              group: [
                '@/entities',
                '@/entities/*',
                '@/features',
                '@/features/*',
                '@/widgets',
                '@/widgets/*',
                '@/shared',
                '@/shared/*',
              ],
              message: 'FSD paths removed — use Atomic Design layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/molecules/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/organisms', '@/components/organisms/*'],
              message: 'Molecules must not import organisms.',
            },
            {
              group: ['@/components/templates', '@/components/templates/*'],
              message: 'Molecules must not import templates.',
            },
            {
              group: ['@/components/pages', '@/components/pages/*'],
              message: 'Molecules must not import pages.',
            },
            {
              group: [
                '@/entities',
                '@/entities/*',
                '@/features',
                '@/features/*',
                '@/widgets',
                '@/widgets/*',
                '@/shared',
                '@/shared/*',
              ],
              message: 'FSD paths removed — use Atomic Design layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/organisms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/templates', '@/components/templates/*'],
              message: 'Organisms must not import templates.',
            },
            {
              group: ['@/components/pages', '@/components/pages/*'],
              message: 'Organisms must not import pages.',
            },
            {
              group: [
                '@/entities',
                '@/entities/*',
                '@/features',
                '@/features/*',
                '@/widgets',
                '@/widgets/*',
                '@/shared',
                '@/shared/*',
              ],
              message: 'FSD paths removed — use Atomic Design layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/templates/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/pages', '@/components/pages/*'],
              message: 'Templates must not import pages.',
            },
            {
              group: [
                '@/entities',
                '@/entities/*',
                '@/features',
                '@/features/*',
                '@/widgets',
                '@/widgets/*',
                '@/shared',
                '@/shared/*',
              ],
              message: 'FSD paths removed — use Atomic Design layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/entities',
                '@/entities/*',
                '@/features',
                '@/features/*',
                '@/widgets',
                '@/widgets/*',
                '@/shared',
                '@/shared/*',
                '@/pages',
                '@/pages/*',
              ],
              message: 'FSD paths removed — use @/components/* and @/lib/*.',
            },
          ],
        },
      ],
    },
  },
);
