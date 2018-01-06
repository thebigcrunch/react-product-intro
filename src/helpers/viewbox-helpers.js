export const isElementBelowViewBox = (viewBoxHeight, top) => viewBoxHeight - top < 0;
export const isElementAboveViewBox = (bottom) => bottom < 0;

export const shouldPositionLeft = (viewBoxWidth, left) =>
  (viewBoxWidth - left) < (viewBoxWidth / 2)

export const shouldPositionAbove = ({ viewBoxHeight, top, bottom, tooltipHeight }) =>
  (viewBoxHeight - bottom) < tooltipHeight && top > tooltipHeight

export const shouldPositionBelow = ({ viewBoxWidth, viewBoxHeight, top, right, bottom, tooltipWidth, tooltipHeight }) =>
  top < tooltipHeight && (viewBoxHeight - bottom) > tooltipHeight
