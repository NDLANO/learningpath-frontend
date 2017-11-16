function ltiForm(filter) {
  return `<form action="https://www.edu-apps.org/lti_public_resources/?tool_id=${
    filter.key
  }" method="post" id="ltiform">
      <input name="lti_message_type" type="hidden" value="basic-lti-launch-request" />
      <input name="lti_version" type="hidden" value="LTI-1p1" />
      <input name="roles" type="hidden" value="Instructor" />
      <input name="ext_content_return_url" type="hidden" value="${
        filter.returnUrl
      }" />
      <input name="ext_content_return_types" type="hidden" value="oembed,lti_launch_url,url,image_url" />
      <input name="ext_content_intended_use" type="hidden" value="embed" />
    </form>`;
}
export function changeIframeContent(filter = undefined) {
  if (filter) {
    const frameDiv = document.getElementById('ltiiframewrapper');
    const iframe = frameDiv.getElementsByTagName('iframe')[0];
    const frame = document.createElement('iframe');
    frame.id = 'ltiiframe';
    frameDiv.replaceChild(frame, iframe);
    const newIframe = frameDiv.getElementsByTagName('iframe')[0].contentWindow
      .document;
    const body = newIframe.getElementsByTagName('body')[0];
    body.innerHTML = ltiForm(filter);
    newIframe.getElementById('ltiform').submit();
  }
}
