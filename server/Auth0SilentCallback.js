/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import config from '../src/config';

const Auth0SilentCallback = `
  <html lang="no">
    <head />
    <body>
      <script src="https://cdn.auth0.com/js/auth0/8.4.0/auth0.min.js"></script>
      <script type="text/javascript">
        var webAuth = new auth0.WebAuth({
          domain: '${config.auth0Domain}',
          clientID: '${config.ndlaPersonalClientId}'
        });
        var result = webAuth.parseHash(window.location.hash, function(err, data) {
          parent.postMessage(err || data, window.location.origin);
        });
      </script>
    </body>
  </html>
  `;

export default Auth0SilentCallback;
