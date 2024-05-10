# NDLA Learningpath front-end

![CI](https://github.com/NDLANO/learningpath-frontend/workflows/CI/badge.svg)

The front-end code powering [https://stier.ndla.no](https://stier.ndla.no).

Norwegian Digital Learning Arena (NDLA) (Norwegian: Nasjonal digital læringsarena) is a joint county enterprise offering [open digital learning assets](https://en.wikipedia.org/wiki/Digital_learning_assets) for upper secondary education. In addition to being a compilation of [open educational resources (OER)](https://en.wikipedia.org/wiki/Open_educational_resources), NDLA provides a range of other online tools for sharing and cooperation.

## Requirements

- Node.JS 20.13
- yarn ~1.15
- Docker (optional)

## Getting started

What's in the box?

- React
- Redux
- Express
- Webpack + Babel (ES6) via Razzle

### Dependencies

All dependencies are defined in `package.json` and are managed with yarn. To
initially install all dependencies and when the list dependency has changed,
run `yarn`.

```
$ yarn
```

### Start development server

Start node server with hot reloading middleware listening on port 3000.

```
$ yarn start
```

To use a different api set the `NDLA_ENVIRONMENT` environment variable.

### Unit tests

Test framework: [Jest](https://github.com/facebook/jest) with [Enzyme](https://airbnb.io/enzyme/)

```
$ yarn test
```

### e2e tests

[Cypress](https://www.cypress.io/) is used for end to end testing.

```
$ yarn e2e
```

### Code style

[Prettier](https://prettier.io/) is used for automatic code formatting.

```
$ yarn format
```

```
$ yarn format-check
```

### ES Linting

Eslint is used for linting javascript code.

```
$ yarn lint-es
```

Rules are configured in `./eslintrc` and extends [esling-config-ndla](https://github.com/NDLANO/frontend-packages/tree/master/packages/eslint-config-ndla).

### CSS Linting

j
Check for errors with [stylelint](https://github.com/stylelint/stylelint):

```
$ yarn lint-style
```

Rules are configured in `./.stylelintrc.js` and extends [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard).

## Other scripts

```
# GTG? Checks code formating, linting and runs unit tests:
$ yarn check-all
```

```
# Create minified production ready build:
$ yarn build
```

```
# Start a production build:
$ yarn start-prod
```

```
# Do you TDD?
$ yarn tdd
```

```
# Docker stuff
$ ./build.sh
```
