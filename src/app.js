const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, combineReducers } = require('redux');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute } = require('react-router');
const createHistory = require('history/lib/createHashHistory');
const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');

const reducers = require('./reducers');
const { App, Home, Foo, Bar } = require('./components');

const history = createHistory();
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));
const store = createStore(reducer);

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="foo" component={Foo}/>
          <Route path="bar" component={Bar}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('appContainer')
);
