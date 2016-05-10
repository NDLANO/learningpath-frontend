module.exports = {
  'rules': {
    'indent': [ 2, 2 ],
    'quotes': [ 2, 'single' ],
    'linebreak-style': [ 2, 'unix' ],
    'semi': [ 2, 'always' ],
    'no-unused-vars': [ 1 ],
    'react/display-name': [ 0 ],
    'react/no-danger': [ 1 ],
    'react/prop-types': [ 2, {'ignore': ['children','className'] }]
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  'plugins': [
    'react'
  ]
};
