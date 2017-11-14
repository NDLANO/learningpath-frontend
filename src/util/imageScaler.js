export function scaleImage(imageUrl) {
  if (__SERVER__) {
    return 400;
  }
  const newImageWidth =
    window.innerWidth > 400 ? window.innerWidth / 4 : window.innerWidth;
  return `${imageUrl}?width=${newImageWidth}`;
}
