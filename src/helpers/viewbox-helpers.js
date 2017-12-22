export const isElementBelowViewBox = (viewBoxHeight, top) => viewBoxHeight - top < 0;
export const isElementAboveViewBox = (bottom) => bottom < 0;
export const shouldPositionLeft = (viewBoxWidth, left) => (viewBoxWidth - left) < (viewBoxWidth /2);
export const shouldPositionAbove = (viewBoxHeight, bottom) => (viewBoxHeight - bottom) < 100;
export const shouldPositionBelow = (windowWidth, top) => {
  console.log('viewBoxWidth - left', viewBoxWidth - left)
  return top < 50
};
