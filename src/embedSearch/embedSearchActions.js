import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchGoogleContent } from '../sources/embedSearch';
import { fetchOembedUrl } from '../sources/learningpaths';

export const setEmbedPreview = createAction('SET_EMBED_PREVIEW');
export const setEmbedResults = createAction('SET_EMBED_RESULTS');
export const removeEmbedPreview = createAction('REMOVE_GOOGLE_OEMBED_PREVIEW');
export const setEmbedSearchQuery = createAction('SET_EMBED_SEARCH_QUERY');


export function fetchEmbedSearch(query) {
  return (dispatch, getState) => fetchGoogleContent(query)
    .then((items) => {
      dispatch(setEmbedResults(items));
    })
    .then(() => {
      console.log(getState());
      const result = getState().embedSearch.result;
      const nextIndex = result.queries.nextPage ? result.queries.nextPage[0].startIndex : undefined;
      const previousIndex = result.queries.nextPage ? result.queries.previousPage[0].startIndex : undefined;
      const numberOfPages = result.queries.request ? result.queries.request[0].totalResults / 10 : 1;
      const updatedQuery = Object.assign({}, query, { nextIndex, previousIndex, numberOfPages });
      dispatch(setEmbedSearchQuery(updatedQuery));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchOembed(url, lang) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      dispatch(setEmbedPreview(Object.assign({}, oembed, { url, language: lang })));
    })
    .catch(err => dispatch(applicationError(err)));
}
