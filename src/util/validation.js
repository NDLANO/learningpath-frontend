/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import polyglot from '../i18n';

const isEmpty = (value) => {
  if (value && value.hasText) { // handle draf-js ContentState
    return !value.hasText();
  }
  return value === undefined || value === null || value === '';
};
const join = rules => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function required(msgKey = 'validation.required') {
  return (value) => {
    if (isEmpty(value)) {
      return polyglot.t(msgKey);
    }
    return null;
  };
}

export function oneOfIsRequired(msgKey, ...fields) {
  return (value, data) => {
    if (fields.some(field => !isEmpty(data[field]))) {
      return null;
    }
    return polyglot.t(msgKey);
  };
}

export function minLength(min, msgKey = 'validation.min') {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return polyglot.t(msgKey, { min });
    }
    return null;
  };
}

export function maxLength(max, msgKey = 'validation.max') {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return polyglot.t(msgKey, { max });
    }
    return null;
  };
}

export function integer(msgKey = 'validation.integer') {
  return (value) => {
    if (!Number.isInteger(Number(value))) {
      return polyglot.t(msgKey);
    }
    return null;
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
