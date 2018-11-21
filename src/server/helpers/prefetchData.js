import { bindActionCreators } from 'redux';
import { matchPath } from 'react-router-dom';
import { serverRoutes } from '../serverRoutes';

export default function prefetchData(req, dispatch) {
  const promises = [];
  serverRoutes.forEach(route => {
    const match = matchPath(req.url, route);
    if (match && route.component.fetchData) {
      promises.push(
        route.component.fetchData({
          match,
          location: { search: req.query },
          ...bindActionCreators(route.component.mapDispatchToProps, dispatch),
        }),
      );
    }
    return match;
  });
  return Promise.all(promises);
}
