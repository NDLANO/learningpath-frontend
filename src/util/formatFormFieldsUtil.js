
export function formattedEmbedUrl(url) {
  return url && url.url ? { url: url.url, embedType: url.embedType } : undefined
}

export function formattedEmbedLicense(license) {
  return license && license.license ? license.license : '';
}

export function formattedEmbedDescription(description) {
  return description || '';
}
