import React, { PropTypes } from 'react';
import polyglot from '../../i18n';


export default function CopyLearningPath({ onClose, onCopy }) {
  return (
    <div className="copy_learning-path">
      <h2>{polyglot.t('copyLearningPath.copyTitle')}</h2>
      <p>{polyglot.t('copyLearningPath.copyText')}</p>
      <button className="button button-copy_abort" onClick={onClose}>
        {polyglot.t('copyLearningPath.abortCopy')}
      </button>
      <button className="button button-copy_save" onClick={onCopy}>
        {polyglot.t('copyLearningPath.createCopy')}
      </button>
    </div>
    );
}

CopyLearningPath.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};
