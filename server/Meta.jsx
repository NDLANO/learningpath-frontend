import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from '../src/config';

const Meta = () => (
  <Helmet
    title={config.app.head.title}
    meta={config.app.head.meta}
  />
);


ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
