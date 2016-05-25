module.exports = {
  extends: "airbnb",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    "max-len": [2, 200, 2, {
      ignoreUrls: true,
      ignoreComments: false
    }],
    'react/prop-types': [ 2, {'ignore': ['children','className'] }],
    "comma-dangle": 0,
    "object-curly-spacing": 0,
    "react/prefer-stateless-function": 1
  }
};
