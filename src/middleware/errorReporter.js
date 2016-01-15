const errorReporter = store => next => action => {
  if (action.error) {
    console.error(action.payload, action, store.getState()); // eslint-disable-line no-console
  }

  return next(action);
};

export default errorReporter;
