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

Start mock api server (port 3000).

```
$ node fake-server.js
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


## Other npm scripts

```
$ npm run build
$ ./build.sh
$ ./release.sh
```

