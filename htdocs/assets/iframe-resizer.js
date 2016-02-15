/* Based on http://ndla.no/sites/all/modules/h5p/library/js/h5p-resizer.js */
/* Pages from http://ndla.no/node/.../oembed emit an event containing the pages height. */
(function () {
  'use strict';
  if (!window.postMessage || !window.addEventListener || window.resizerInitialized) {
    return;
  }

  window.resizerInitialized = true;

  window.addEventListener('message', function (evt) {
    if (!evt.data.height) { return; }

    var iframe = (function (iframes) {
      for (var i=0, len=iframes.length; i < len; i++) {
        if (iframes[i].contentWindow === evt.source) {
          return iframes[i];
        }
      }
    }(document.getElementsByTagName('iframe')));

    if (!iframe) { return; }

    iframe.style.height = (evt.data.height + 25) + 'px';
  }, false);
}());

