/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const ltiForm = filter => `<form action="https://www.edu-apps.org/lti_public_resources/?tool_id=${filter.key}" method="post" id="ltiform">
      <input name="lti_message_type" type="hidden" value="basic-lti-launch-request" />
      <input name="lti_version" type="hidden" value="LTI-1p1" />
      <input name="roles" type="hidden" value="Instructor" />
      <input name="ext_content_return_url" type="hidden" value="${filter.returnUrl}" />
      <input name="ext_content_return_types" type="hidden" value="oembed,lti_launch_url,url,image_url" />
      <input name="ext_content_intended_use" type="hidden" value="embed" />
    </form>`;
