/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BEMHelper from 'react-bem-helper';
import polyglot from '../../i18n';
import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';
import Icon from '../../common/Icon';
import TileUserInformation from './TileUserInformation';
import ActionToolTip from '../../myPage/ActionToolTip';

const classes = new BEMHelper({
  name: 'tile',
  prefix: 'c-',
});

const LearningPathTile = ({ learningPath, dropdown }, { lang }) => {
  const duration = formatDuration(learningPath.duration, lang);
  const lastUpdated = formatDate(learningPath.lastUpdated, lang);
  return (
    <div {...classes()}>
      <div {...classes('header')}>
        <div {...classes('date')}>{lastUpdated}</div>
        <div {...classes('context-menu')}>{dropdown}</div>
      </div>
      <Link
        {...classes('body')}
        to={`/learningpaths/${learningPath.id}/first-step`}>
        <h3 {...classes('title')}>{learningPath.title}</h3>
        <p>{learningPath.description}</p>
      </Link>
      <div {...classes('footer')}>
        <div {...classes('property')}>
          <div {...classes('propterty-icon')}>
            <Icon.Duration />
          </div>
          <p {...classes('property-description')}>
            {polyglot.t('tilePage.path.duration')}
          </p>
          <p>{duration}</p>
        </div>
        <ActionToolTip status={learningPath.status}>
          <div {...classes('property')}>
            <div {...classes('propterty-icon')}>
              <Icon.Visibility />
            </div>
            <p {...classes('property-description')}>
              {polyglot.t('tilePage.path.status')}
            </p>
            <p>
              {polyglot.t(`tilePage.path.statusValue.${learningPath.status}`)}
            </p>
          </div>
        </ActionToolTip>
        <TileUserInformation owner={learningPath.owner} />
      </div>
    </div>
  );
};

LearningPathTile.propTypes = {
  learningPath: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    lastUpdated: PropTypes.string,
    duration: PropTypes.number,
    status: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  dropdown: PropTypes.node,
};

LearningPathTile.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LearningPathTile;
