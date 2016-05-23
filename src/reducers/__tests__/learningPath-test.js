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

test('reducers/learningPaths remove learning path step', (t) => {
  let step1 = {id: 123, seqNo: 0, title: [{title: 'testTitle', language: 'nb'}]};
  let step2 = {id: 124, seqNo: 1, title: [{title: 'another Title', language: 'nb'}]};
  let step3 = {id: 125, seqNo: 2, title: [{title: 'another Title', language: 'nb'}]};

  let path = {learningsteps: [step1, step2, step3]};
  t.deepEqual(
    reducer(path, {type: 'REMOVE_LEARNING_PATH_STEP', payload: {seqNo: 0}}),
    {learningsteps: [step2, step3]},
    'seqno removed'
  );

  t.deepEqual(
    reducer(path, {type: 'REMOVE_LEARNING_PATH_STEP', payload: {seqNo: 99}}),
    path,
    'no seqno'
  );
  t.end();
});

test('redurcers/learningPath drag and drop sort learning steps', t => {
  let step1 = {id: 123, title: [{title: 'testTitle', language: 'nb'}]};
  let step2 = {id: 124, title: [{title: 'another Title', language: 'nb'}]};
  let step3 = {id: 125, title: [{title: 'another Title', language: 'nb'}]};

  let nextState1 = reducer({learningsteps: [step1, step2, step3]}, {type: 'SORT_LEARNING_PATH_STEPS', payload: []});
  t.deepEqual(
    nextState1.learningsteps,
    [step1, step2, step3],
    'set empty state'
  );

  let nextState2 = reducer({learningsteps: [step1, step2, step3]}, {type: 'SORT_LEARNING_PATH_STEPS', payload: [step3, step2, step1]});
  t.deepEqual(
    nextState2.learningsteps,
    [step3, step2, step1],
    'change state'
  );

  let nextState3 = reducer({learningsteps: []}, {type: 'SORT_LEARNING_PATH_STEPS', payload: [step2, step3, step1]});
  t.deepEqual(
    nextState3.learningsteps,
    [],
    'change state'
  );
  t.end();
});
