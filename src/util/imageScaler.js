export function scaleImage(imageUrl) {
  const newImageWidth = window.innerWidth > 400 ? window.innerWidth / 4 : window.innerWidth;
  return `${imageUrl}?width=${newImageWidth}`;
}
