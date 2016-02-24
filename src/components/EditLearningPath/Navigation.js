import React from 'react';
import get from 'lodash/get';
import Icon from '../Icon';
import { titleI18N } from '../../util/i18nFieldFinder';

export default function Navigation({learningPath, lang}) {
  let stepNavItems = get(learningPath, 'learningsteps', []).map(step => (
    <li className='step-nav_item' key={step.seqNo}>
      <a className='step-nav_link' href={'#step' + step.seqNo}>{titleI18N(step, lang)}</a>
    </li>
  ));

  return (
    <div className='step-nav'>
      <div className='step-nav_learningpath-general-info'>
        <h2 className='step-nav_h'>{titleI18N(learningPath, lang)}</h2>
      </div>
      <ul className='step-nav_list'>
        <li className='step-nav_item'><a className='step-nav_link' href='#intro'>Introdukjson</a></li>
        {stepNavItems}
      </ul>
      <div className='vertical-menu'>
        <a className='cta cta-link cta-link--block' href='#'>
          <Icon.Save />
          <span className="icon--space">Lagre og lukk</span>
        </a>
      </div>
    </div>
  );
}
