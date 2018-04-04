export function scaleImage(imageUrl) {
  if (process.env.BUILD_TARGET === 'server') {
    return 400;
  }
  const newImageWidth =
    window.innerWidth > 400 ? window.innerWidth / 4 : window.innerWidth;
  return `${imageUrl}?width=${newImageWidth}`;
}
