module.exports = {
  extends: 'ndla',
  rules: {
    'jsx-a11y/href-no-hash': 1,

    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,

    'react/no-string-refs': 1,
    'react/no-find-dom-node': 1,
    'react/prop-types': [ 2, {'ignore': ['children','className'] }],

    'react/prefer-stateless-function': 1
  },
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
    '__DISABLE_SSR__': true
  }
};
