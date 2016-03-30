import { logoutAction } from '.';
import fetchAboutMe from '../sources/fetchAboutMe.js';

export default function checkValidSession () {
  return (dispatch, getState) => fetchAboutMe( getState().authToken )
    .catch(err => dispatch(logoutAction()));
}
