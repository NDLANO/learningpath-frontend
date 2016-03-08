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
      {stepNavItems}
    </ul>
  );
}
