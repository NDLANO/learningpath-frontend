
export function formattedEmbedUrl(step, url) {
  const defaultValue = step.id ? { url: '', embedType: 'oembed' } : undefined;
  return url && url.url ? { url: url.url, embedType: url.embedType } : defaultValue;
}

export function formattedEmbedLicense(license) {
  return license && license.license ? license.license : '';
}

export function formattedEmbedDescription(step, description) {
  const defaultValue = step.id ? '' : undefined;
  return description || defaultValue;
}
