module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.config.ts'], optionalDependencies: true, peerDependencies: true },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': ['warn', { allow: ['_id'] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
}
