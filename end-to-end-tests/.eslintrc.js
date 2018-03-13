module.exports = {
  extends: 'ndla',
  rules: {
    'jsx-a11y/href-no-hash': 1,

    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    'no-undef': 0,
    'no-unused-expressions': 0,
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
