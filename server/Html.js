import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const config = {
  app: {
    head: {
      titleTemplate: 'NDLA Læringsstier',
      meta: [
        {name: 'description', content: 'NDLA Læringsstier'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'NDLA Læringsstier'},
      ]
    }
  }
};

const Html = (props) => {
  const { lang } = props;

  return (
    <html lang={lang}>
      <head>
        <Helmet {...config.app.head} />
        <link rel="stylesheet" type="text/css" href="/assets/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/Draft.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,300|Signika:400,600,300,700" />
        <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="appContainer" />
        <script src="/assets/app.js"></script>
      </body>
    </html>
  );
};

Html.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default Html;
