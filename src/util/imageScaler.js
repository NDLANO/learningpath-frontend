export function scaleImage(imageUrl) {
  const newImageWidth = window.innerWidth / 4;
  return `${imageUrl}?width=${newImageWidth}`;
}
