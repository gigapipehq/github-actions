module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  plugins: ['jest', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
}
