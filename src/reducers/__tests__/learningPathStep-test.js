import test from 'tape';

import reducer from '../learningPathStep';

const payload = {id: '123'};

test('reducers/learningPathStep', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, {type: 'SET_LEARNING_PATH_STEP', payload}),
    {id: '123'},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, {type: 'SET_LEARNING_PATH_STEP', payload}),
    {id: '123'},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      {type: 'DO_NOT_SET_LEARNING_PATH_STEP', payload}),
    {id: 'abc'},
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      {type: 'SET_LEARNING_PATH_STEP', payload: new Error('fail'), error: true}),
    {id: 'abc'},
    'ignore errors'
  );

  t.deepEqual(
    reducer(undefined, {type: 'SET_OEMBED_OBJECT', payload}),
    {oembed: {id: '123'}},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, {type: 'SET_OEMBED_OBJECT', payload}),
    {id: 'abc', oembed: {id: '123'}},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      {type: 'SET_OEMBED_OBJECT', payload: new Error('fail'), error: true}),
    {id: 'abc'},
    'ignore errors'
  );

  t.end();
});

test('reducers/learningPathStep remove learning path step embed content', (t) => {
  let nextState = reducer({}, {type: 'REMOVE_LEARNING_PATH_STEP_EMBED_CONTENT'});

  t.equal(nextState.embedContent.length, 0);
  t.deepEqual(nextState.embedContent, []);

  nextState = reducer({
    embedContent: [
      {html: 'http://links'},
      {html: 'http://more_links'}
    ]
  },
    {type: 'REMOVE_LEARNING_PATH_STEP_EMBED_CONTENT'}
  );

  t.equal(nextState.embedContent.length, 0);
  t.deepEqual(nextState.embedContent, []);


  t.end();
});

test('reducers/learningPathStep update embed url', t => {
  let nextState = reducer({
    embedContent: [
      {html: 'http://links', language: 'nb'},
      {html: 'http://more_links', language: 'nn'}
    ]
  },
    {type: 'UPDATE_LEARNING_PATH_STEP_EMBED_URL', payload: {html: 'http://lolcats', language: 'nb'}}
  );

  t.equal(nextState.embedContent.length, 2);
  t.deepEqual(nextState.embedContent, [
    {html: 'http://lolcats', language: 'nb'},
    {html: 'http://more_links', language: 'nn'}
  ]);

  t.end();
});

test('reducers/learningPathStep type', t => {
  let nextState = reducer({}, {type: 'UPDATE_LEARNING_PATH_STEP_TYPE', payload: 'INTRO'});

  t.deepEqual(nextState, {type: 'INTRO'});

  nextState = reducer(nextState,
    {type: 'UPDATE_LEARNING_PATH_STEP_TYPE', payload: 'TEXT'}
  );

  t.deepEqual(nextState, {type: 'TEXT'});

  t.end();
});

test('reducers/learningPathStep update type', t => {
  let nextState = reducer({}, {type: 'UPDATE_LEARNING_PATH_STEP_TYPE', payload: 'INTRO'});
  t.deepEqual(nextState, {type: 'INTRO'});

  nextState = reducer({type: 'INTRODUCTION'},
    {type: 'UPDATE_LEARNING_PATH_STEP_TYPE', payload: 'TEXT'}
  );

  t.deepEqual(nextState, {type: 'TEXT'});

  t.end();
});

test('reducers/learningPathStep update title', t => {
  let nextState = reducer({}, {type: 'UPDATE_LEARNING_PATH_STEP_TITLE', payload: {title: 'ABCDEFG', language: 'nb'}});

  t.equals(nextState.title.length, 1);
  t.deepEqual(nextState.title, [{title: 'ABCDEFG', language: 'nb'}]);

  nextState = reducer({title: [{title: 'this is a title', language: 'nb'}]},
    {type: 'UPDATE_LEARNING_PATH_STEP_TITLE', payload: {title: 'this is the new title', language: 'nb'}}
  );

  t.equals(nextState.title.length, 1);
  t.deepEqual(nextState.title, [{title: 'this is the new title', language: 'nb'}]);

  t.end();
});

test('reducers/learningPathStep update description', t => {
  let nextState = reducer({},
    {type: 'UPDATE_LEARNING_PATH_STEP_DESCRIPTION', payload: {description: 'TTITL', language: 'nb'}}
  );

  t.equals(nextState.description.length, 1);
  t.deepEqual(nextState.description, [
    {description: 'TTITL', language: 'nb'}
  ]);

  nextState = reducer({
    description: [
      {description: 'dette er en tittel', language: 'nb'},
      {description: 'dette er ein tittel', language: 'nn'}
    ]
  },
    {type: 'UPDATE_LEARNING_PATH_STEP_DESCRIPTION', payload: {description: 'dette er en ny tittel', language: 'nb'}}
  );

  t.equals(nextState.description.length, 2);
  t.deepEqual(nextState.description, [
    {description: 'dette er en ny tittel', language: 'nb'},
    {description: 'dette er ein tittel', language: 'nn'}
  ]);

  t.end();
});
