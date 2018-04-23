module.exports = {
  extends: 'airbnb',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
};
