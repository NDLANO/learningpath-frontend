import tape from 'tape';
import React from 'react';
import { Link } from 'react-router';
import TestUtils from 'react-addons-test-utils';
import jsxAssertions from '@kwltrs/tape-jsx-assertions';
import addAssertions from 'extend-tape';

const test = addAssertions(tape, jsxAssertions);

const learningPaths = [
  {
    id: '1',
    title: [
      { title: 'Hva er kunst og kultur?', language: 'nb' },
      { title: 'Kva er kunst og kultur?', language: 'nn' },
      { title: 'What is art and culture?', language: 'en' }
    ],
    description: [
      { description: 'Kurset dekker innføring og vil gi deg grunnleggende forståelse for vanlige begrep i kunst og kultur verden. Kurset fokuserer på kunst og kultur på et verdensperspektiv.', language: 'nb' },
      { description: 'Kurset dekker innføring og vil gje deg grunnleggjande forståing for vanlege omgrep i kunst og kultur verda. Kurset fokuserer på kunst og kultur på eit verdsperspektiv.', language: 'nn' },
      { description: 'The course covers the introduction and will give you a basic understanding of common concepts in the arts world. The course focuses on art and culture in a world perspective', language: 'en' }
    ],
    metaUrl: 'http://api.test.ndla.no/paths/1',
    duration: 1080,
    status: 'PUBLISHED',
    author: { type: 'Forfatter', name: 'Snurre Sprett' }
  },
  {
    id: '2',
    title: [
      { title: 'Leselighet og skrift', language: 'nb' },
      { title: 'Leselighet og skrift', language: 'nn' }
    ],
    description: [
      { description: 'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi, og ofte uten klare forestillinger om hva begrepene står for.', language: 'nb' },
      { description: 'Uttrykka "leselighet" og "lesbarhet" vert brukt om kvarandre i norsk fagterminologi, og ofte utan klåre førestillingar om kva omgrepa står for.', language: 'nn' }
    ],
    metaUrl: 'http://api.test.ndla.no/paths/2',
    duration: 1080,
    status: 'PUBLISHED',
    author: { type: 'Forfatter', name: 'Kaptein Sabeltann' }
  }
];

import { MyPage } from './MyPage';

function setup (props={}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<MyPage {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}


test('component/MyPage', t => {
  const { output } = setup({lang: 'nb', learningPaths});
  t.ok(output, 'renders');

  t.jsxIncludes(output, <Link to='/path/1'>Hva er kunst og kultur?</Link>, 'link');
  t.jsxIncludes(output, 'Kurset dekker innføring og vil gi deg grunnleggende forståelse', 'description');

  t.jsxIncludes(output, <Link to='/path/2'>Leselighet og skrift</Link>, 'link');
  t.jsxIncludes(output, 'Uttrykkene "leselighet" og "lesbarhet" brukes om hverandre i norsk fagterminologi', 'description');

  t.end();
});

test('component/MyPage without learning paths', t => {
  const { output } = setup({lang: 'nb'});
  t.ok(output, 'renders');
  t.end();
});
