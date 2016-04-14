# NDLA Læringsstier Front-End

## Requirements

- Node.JS ~4.2
- npm
- Docker (optional)

## Getting started

What's in the box?

- React
- Redux
- Webpack + Babel (ES6)

### Dependencies

All dependencies are defined in `package.json` and are managed with npm.  To
initially install all dependencies and when the list dependency has changed,
run `npm install`.

```
$ npm install
```

### Start development server

Start webpack-dev-server listening on port 8080.

```
$ npm start
```

To use a different api, change `NDLA_API_URL` in `./htdocs/index.html` accordingly.

### Unit tests

Test framework: tap/tape with enzyme.

```
$ npm test
```
### Code style

*tl;dr*: Use eslint! Rules: indent with 2 spaces, no tabs; single quotes.

Lint code with [eslint](http://eslint.org/), including [eslint react plugin](https://github.com/yannickcr/eslint-plugin-react).
Beside linting with globally installed eslint, eslint can be invoked with `npm`:

```
$ npm run lint
```

Rules are configured in `./.eslintrc.js`. If feeling brave, try `eslint --fix`.


## Other scripts

```
# webpack
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

**react:**
React is a JavaScript library for building user interfaces.
https://facebook.github.io/react/

**react-dom:**
React package for working with the DOM.
https://facebook.github.io/react/

**react-redux:**
Official React bindings for Redux.
https://github.com/gaearon/react-redux

**react-router:**
A complete routing library for React.js.
https://reactjs.org/react-router/

**react-router-form:**
\<Form\> is to \<form\> as \<Link\> is to \<a\>.
https://github.com/insin/react-router-form

**redux:**
Predictable state container for JavaScript apps.
http://rackt.github.io/redux

**redux-actions:**
Flux Standard Action utlities for Redux
https://github.com/acdlite/redux-actions

**redux-localstorage:**
Store enhancer that syncs (a subset of) your redux store state to localstorage.
https://github.com/elgerlambert/redux-localstorage#readme

**redux-simple-router:**
Ruthlessly simple bindings to keep react-router and redux in sync.
https://github.com/rackt/redux-simple-router#readme

**redux-thunk:**
Thunk middleware for Redux.
https://github.com/gaearon/redux-thunk


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

**moment:**
Parse, validate, manipulate, and display dates
http://momentjs.com

**node-polyglot**
Give your JavaScript the ability to speak many languages
https://github.com/airbnb/polyglot.js#readme

**query-string:**
Parse and stringify URL query strings.
https://github.com/sindresorhus/query-string#readme

**sanitize-html:**
Clean up user-submitted HTML, preserving whitelisted elements and whitelisted attributes on a per-element basis.
https://github.com/punkave/sanitize-html#readme

### ES6

**babel-core:**
Babel compiler core.
https://babeljs.io/

**babel-preset-es2015:**
Babel preset for all es2015 plugins.
https://babeljs.io/

**babel-preset-react:**
Babel preset for all React plugins.
https://babeljs.io/

**es6-promise:**
A lightweight library that provides tools for organizing asynchronous code.
https://github.com/jakearchibald/ES6-Promises#readme

**isomorphic-fetch:**
Isomorphic WHATWG Fetch API, for Node & Browserify.
https://github.com/matthew-andrews/isomorphic-fetch/issues

### Webpack and friends

**babel-loader:**
babel module loader for webpack.
https://github.com/babel/babel-loader

**babel-register:**
babel require hook
https://babeljs.io/

**if-loader:**
This is a preprocesser for the webpack module bundler. It support the `if` directive, similar to C `#ifdef`.
https://www.npmjs.com/package/if-loader

**json-loader:**
json loader module for webpack
https://github.com/webpack/json-loader#readme

**webpack:**
Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.
https://github.com/webpack/webpack

**webpack-dev-server:**
Serves a webpack app. Updates the browser on changes.
http://github.com/webpack/webpack-dev-server


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

**flux-standard-action:**
A human-friendly standard for Flux action objects.
https://www.npmjs.com/package/flux-standard-action

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



### Code style

**babel-eslint:**
allows you to lint **all** valid Babel code with the fantastic [ESLint](https://github.com/eslint/eslint).
https://github.com/babel/babel-eslint

**eslint:**
An AST-based pattern checker for JavaScript.
http://eslint.org

**eslint-plugin-react:**
React specific linting rules for ESLint.
https://github.com/yannickcr/eslint-plugin-react

