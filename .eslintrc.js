module.exports = {
  'rules': {
    'indent': [ 2, 2 ],
    'quotes': [ 2, 'single' ],
    'linebreak-style': [ 2, 'unix' ],
    'semi': [ 2, 'always' ],
    'no-unused-vars': [ 1 ]
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': 'eslint:recommended',
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react'
  ]
};
