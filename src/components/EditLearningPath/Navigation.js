import React from 'react';
import { titleI18N } from '../../util/i18nFieldFinder';

export default function Navigation({learningSteps, lang}) {
  let stepNavItems = learningSteps.map(step => (
    <li className='step-nav_item' key={step.seqNo}>
      <a className='step-nav_link' href={'#step' + step.seqNo}>{titleI18N(step, lang) || '(unnamed)'}</a>
    </li>
  ));

  return (
    <ul className='step-nav_list'>
      <li className='step-nav_item'><a className='step-nav_link' href='#intro'>Introdukjson</a></li>
      {stepNavItems}
    </ul>
  );
}
