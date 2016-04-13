import React from 'react';
import { reduxForm } from 'redux-form';
//import get from 'lodash/get';
//import { createLearningPath } from '../actions';

export function CreateLearningPath () {
  return <div>paula brillant!</div>;
}

export default reduxForm({
  form: 'create-learning-path',
  fields: ['title', 'description']
})(CreateLearningPath);
