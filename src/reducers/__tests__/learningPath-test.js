import test from 'tape';

import reducer from '../learningPath';

const payload = { id: '123', learningsteps: [] };

test('reducers/learningPath', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATH', payload }),
    {id: '123', learningsteps: []},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'SET_LEARNING_PATH', payload }),
    {id: '123', learningsteps: []},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'DO_NOT_SET_LEARNING_PATH', payload }),
    {id: 'abc'},
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'SET_LEARNING_PATH', payload: new Error('fail'), error: true }),
    {id: 'abc'},
    'ignore errors'
  );

  t.end();
});

test('reducers/learningPath create new step', (t) => {
  let nextState = reducer({learningsteps: []}, { type: 'CREATE_LEARNING_PATH_STEP' });

  t.deepEqual(nextState.learningsteps,
    [{
      seqNo: 1,
      title: [],
      description: [],
      embedContent: [],
      type: '',
      license: ''
    }],
    'add first');

  nextState = reducer(nextState, { type: 'CREATE_LEARNING_PATH_STEP' });

  t.equal(nextState.learningsteps.length, 2, 'add second length');

  t.deepEqual(nextState.learningsteps,
    [{
      seqNo: 1,
      title: [],
      description: [],
      embedContent: [],
      type: '',
      license: ''
    }, {
      seqNo: 2,
      title: [],
      description: [],
      embedContent: [],
      type: '',
      license: ''
    }],
    'add second');

  t.deepEqual(
    reducer({learningsteps: ['hello']},
      { type: 'CREATE_LEARNING_PATH_STEP', payload: new Error('fail'), error: true }),
    {learningsteps: ['hello']},
    'ignore errors'
  );
  t.end();
});

test('reducers/learningPath update learning step', (t) => {
  let nextState = reducer({learningsteps: [
    { seqNo: 1, id: 12, license: 'any' },
    { seqNo: 2, id: 34, license: 'public domain' },
    { seqNo: 3, id: 56, license: 'none' }
  ]}, {
    type: 'UPDATE_LEARNING_PATH_STEP',
    payload: {
      seqNo: 2,
      license: 'GPL'
    }
  });

  t.equal(nextState.learningsteps.length, 3);
  t.deepEqual(
    nextState.learningsteps[1],
    {
      seqNo: 2,
      id: 34,
      license: 'GPL'
    }
  );

  nextState = reducer(nextState, {
    type: 'UPDATE_LEARNING_PATH_STEP',
    payload: {
      id: 78,
      seqNo: 4,
      license: 'o_O'
    }
  });

  t.equal(nextState.learningsteps.length, 4);
  t.deepEqual(nextState.learningsteps.map(s => s.id), [12, 34, 56, 78]);

  t.end();
});

test('reducers/learningPath update title', t => {
  let nextState = reducer({title: [
    { title: 'title no', language: 'nb' },
    { title: 'title en', language: 'en' },
    { title: 'title nn', language: 'nn' }
  ]}, {
    type: 'UPDATE_LEARNING_PATH_TITLE',
    payload: {
      title: 'new title en',
      language: 'en'
    }
  });

  t.equal(nextState.title.length, 3);
  t.deepEqual(
    nextState.title[1],
    {
      title: 'new title en',
      language: 'en'
    }
  );

  nextState = reducer(nextState, {
    type: 'UPDATE_LEARNING_PATH_TITLE',
    payload: {
      title: 'new title sv',
      language: 'sv'
    }
  });

  t.equal(nextState.title.length, 4);
  t.deepEqual(nextState.title.map(s => s.language), ['nb', 'en', 'nn', 'sv']);

  t.end();
});

test('reducers/learningPath update description', t => {
  let nextState = reducer({description: [
    { description: 'description no', language: 'nb' },
    { description: 'description en', language: 'en' },
    { description: 'description nn', language: 'nn' }
  ]}, {
    type: 'UPDATE_LEARNING_PATH_DESCRIPTION',
    payload: {
      description: 'new description en',
      language: 'en'
    }
  });

  t.equal(nextState.description.length, 3);
  t.deepEqual(
    nextState.description[1],
    {
      description: 'new description en',
      language: 'en'
    }
  );

  nextState = reducer(nextState, {
    type: 'UPDATE_LEARNING_PATH_DESCRIPTION',
    payload: {
      description: 'new description sv',
      language: 'sv'
    }
  });

  t.equal(nextState.description.length, 4);
  t.deepEqual(nextState.description.map(s => s.language), ['nb', 'en', 'nn', 'sv']);

  t.end();
});
