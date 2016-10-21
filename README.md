# NDLA Læringsstier Front-End
[![Build Status](https://travis-ci.org/NDLANO/learningpath-frontend.svg?branch=master)](https://travis-ci.org/NDLANO/learningpath-frontend)

## Requirements

- Node.JS ~6.2
- npm ~3.9
- Docker (optional)

## Getting started

What's in the box?

- React
- Redux
- Express
- Webpack + Babel (ES6)

### Dependencies

All dependencies are defined in `package.json` and are managed with yarn. To
initially install all dependencies and when the list dependency has changed,
run `yarn install`.

```
$ yarn install
```

### Start development server

Start node server with hot reloading middleware listening on port 3000.

```
$ npm start
```

To use a different api set the `NDLA_API_URL` environment variable.

### Unit tests

Test framework: tap/tape with enzyme.

```
$ npm test
```
### Code style

*tl;dr*: Use eslint! Rules: [Airbnb Styleguide]https://github.com/airbnb/javascript.

Lint code with [eslint](http://eslint.org/), including [eslint react plugin](https://github.com/yannickcr/eslint-plugin-react), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme).
Beside linting with globally installed eslint, eslint can be invoked with `npm`:

```
$ npm run lint
```

Rules are configured in `./.eslintrc.js` and extends [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). If feeling brave, try `eslint --fix`.


## Other scripts

```
# Create minified production ready build with webpack:
$ npm run build
```

```
# Docker stuff
$ ./build.sh
$ ./release.sh
```

## Dependencies

Please update this section if you add or remove dependencies.
Hint: Running `npm ls --long --depth 0` prints a list of dependencies including a brief description.

### React, Redux and friends

**draft-js:**
A React framework for building text editors.
https://facebook.github.io/draft-js

**draft-js-export-html**
DraftJS: Export ContentState to HTML.
https://github.com/sstur/draft-js-export-html#readme

**draft-js-import-html**
DraftJS: import HTML to ContentState.
https://github.com/sstur/draft-js-import-html#readme

**react:**
React is a JavaScript library for building user interfaces.
https://facebook.github.io/react/

**react-dom:**
React package for working with the DOM.
https://facebook.github.io/react/

**react-dnd:**
Drag and Drop for React
https://github.com/gaearon/react-dnd

**react-dnd-html5-backend:**
HTML5 backend for React DnD
https://github.com/gaearon/react-dnd-html5-backend

**react-helmet:**
A document head manager for React
https://github.com/nfl/react-helmet#readme

**react-redux:**
Official React bindings for Redux.
https://github.com/gaearon/react-redux

**react-widgets:**
An à la carte set of polished, extensible, and accessible inputs built for React
http://jquense.github.io/react-widgets/docs/

**react-router:**
A complete routing library for React.js.
https://reactjs.org/react-router/

**history:**
Manage browser history with JavaScript
https://github.com/mjackson/history#readme

**redux:**
Predictable state container for JavaScript apps.
http://rackt.github.io/redux

**redux-actions:**
Flux Standard Action utlities for Redux
https://github.com/acdlite/redux-actions

**redux-form**
A higher order component decorator for forms using Redux and React.
https://redux-form.com/

**redux-localstorage:**
Store enhancer that syncs (a subset of) your redux store state to localstorage.
https://github.com/elgerlambert/redux-localstorage#readme

**redux-simple-router:**
Ruthlessly simple bindings to keep react-router and redux in sync.
https://github.com/rackt/redux-simple-router#readme

**redux-thunk:**
Thunk middleware for Redux.
https://github.com/gaearon/redux-thunk

**reselect:**
Selectors for Redux.
https://github.com/reactjs/reselect#readme

### Serverside

**express:**
Fast, unopinionated, minimalist web framework
http://expressjs.com/

**nodemon:**
Simple monitor script for use during development of a node.js app.
http://nodemon.io

**compression**
Node.js compression middleware
https://github.com/expressjs/compression#readme

**serialize-javascript**
Serialize JavaScript to a superset of JSON that includes regular expressions and functions.
https://github.com/yahoo/serialize-javascript

### Util

**classnames:**
A simple utility for conditionally joining classNames together.
https://github.com/JedWatson/classnames#readme

**defined:**
return the first argument that is `!== undefined`.
https://github.com/substack/defined

**lodash:**
Lodash modular utilities.
https://lodash.com/

**date-fns:**
Modern JavaScript date utility library
https://github.com/date-fns/date-fns#readme

**node-polyglot**
Give your JavaScript the ability to speak many languages
https://github.com/airbnb/polyglot.js#readme

**query-string:**
Parse and stringify URL query strings.
https://github.com/sindresorhus/query-string#readme

**svg4everybody**
Use external SVG spritemaps in any browser (IE Polyfill)
https://github.com/jonathantneal/svg4everybody#readme

**node-uuid**
Rigorous implementation of RFC4122 (v1 and v4) UUIDs.
https://github.com/broofa/node-uuid

### ES2015

**babel-core:**
Babel compiler core.
https://babeljs.io/

**babel-register:**
babel require hook
https://babeljs.io/

**babel-preset-es2015:**
Babel preset for all ES2015 plugins.
https://babeljs.io/

**babel-polyfill:**
Polyfill for  a full ES2015 environment
https://babeljs.io/

**babel-preset-react:**
Babel preset for all React plugins.
https://babeljs.io/

**babel-plugin-transform-object-rest-spread:**
Compile object rest and spread to ES5
https://babeljs.io/

**isomorphic-fetch:**
Isomorphic WHATWG Fetch API, for Node & Browserify.
https://github.com/matthew-andrews/isomorphic-fetch/issues

### Webpack and friends

**webpack:**
Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.
https://github.com/webpack/webpack

**babel-loader:**
babel module loader for webpack.
https://github.com/babel/babel-loader

**json-loader:**
json loader module for webpack
https://github.com/webpack/json-loader#readme

**file-loader**
file loader module for webpack
https://github.com/webpack/file-loader

**css-loader**
CSS loader module for webpack
https://github.com/webpack/css-loader#readme

**webpack-dev-middleware:**
Offers a dev middleware for webpack, which arguments a live bundle to a directory
http://github.com/webpack/webpack-dev-middleware

**webpack-hot-middleware:**
Webpack hot reloading you can attach to your own server
https://github.com/glenjamin/webpack-hot-middleware#readme

**webpack-dev-server:**
Serves a webpack app. Updates the browser on changes.
http://github.com/webpack/webpack-dev-server

**webpack-manifest-plugin**
Webpack plugin for generating asset manifests
https://github.com/danethurber/webpack-manifest-plugin

**extract-text-webpack-plugin**
Extract text from bundle into a file.
http://github.com/webpack/extract-text-webpack-plugin

### Testing

**babel-tape-runner:**
Babel + Tape for running your ES Next tests.
https://github.com/wavded/babel-tape-runner

**enzyme:**
JavaScript Testing utilities for React.
https://github.com/airbnb/enzyme#readme

**faucet:**
human-readable TAP summarizer.
https://github.com/substack/faucet

**tap-spec:**
Formatted TAP output like Mocha's spec reporter
https://github.com/scottcorgan/tap-spec#readme

**flux-standard-action:**
A human-friendly standard for Flux action objects.
https://www.npmjs.com/package/flux-standard-action

**jsdom:**
A JavaScript implementation of the DOM and HTML standards.
https://github.com/tmpvar/jsdom#readme

**nock:**
HTTP Server mocking for Node.js.
https://github.com/node-nock/nock#readme

**react-addons-test-utils:**
This package provides the React TestUtils add-on.
https://github.com/facebook/react#readme

**redux-mock-store:**
A mock store for your testing your redux async action creators and middleware.
https://github.com/arnaudbenard/redux-mock-store#readme

**sinon:**
JavaScript test spies, stubs and mocks.
http://sinonjs.org/

**tape:**
tap-producing test harness for node and browsers.
https://github.com/substack/tape

**watch:**
Utilities for watching file trees.
https://github.com/mikeal/watch

### Code style

**babel-eslint:**
allows you to lint **all** valid Babel code with the fantastic [ESLint](https://github.com/eslint/eslint).
https://github.com/babel/babel-eslint

**eslint:**
An AST-based pattern checker for JavaScript.
http://eslint.org

**eslint-config-airbnb:**
Airbnb's ESLint config, following their styleguide
https://github.com/airbnb/javascript

**eslint-plugin-import:**
Import with sanity.
https://github.com/benmosher/eslint-plugin-import

**eslint-plugin-jsx-a11y:**
A static analysis linter of jsx and their accessibility with screen readers.
https://github.com/evcohen/eslint-plugin-jsx-a11y#readme

**eslint-plugin-react:**
React specific linting rules for ESLint.
https://github.com/yannickcr/eslint-plugin-react
