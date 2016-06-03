import { LEFT, RIGHT, TOP, BOTTOM } from '../constants';

export default function calcOverlayPosition(placement, overlay, target) {
  let positionLeft = 0;
  let positionTop = 0;
  const overlayRect = overlay.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  if (placement === LEFT || placement === RIGHT) {
    positionTop = targetRect.top + (targetRect.height - overlayRect.height) / 2;
    if (placement === LEFT) {
      positionLeft = targetRect.left - overlayRect.width;
    } else {
      positionLeft = targetRect.right;
    }
  } else if (placement === TOP || placement === BOTTOM) {
    positionLeft = targetRect.left + (targetRect.width - overlayRect.width) / 2;
    if (placement === TOP) {
      positionTop = targetRect.top - overlayRect.height;
    } else {
      positionTop = targetRect.bottom;
    }
  }
  return { positionLeft, positionTop };
}
