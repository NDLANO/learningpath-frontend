module.exports = {
  extends: 'ndla',
  rules: {
    'jsx-a11y/href-no-hash': 1,

    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,

    'react/no-string-refs': 1,
    'react/no-find-dom-node': 1,
    'react/prop-types': [2, { 'ignore': ['children', 'className'] }],
    'react/forbid-prop-types': 0,

    'react/prefer-stateless-function': 1,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }]
  },
  "env": {
    "jest": true
  },
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
    '__DISABLE_SSR__': true
  }
};
