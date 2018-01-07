export const isElementBelowViewBox = (viewBoxHeight, top) => viewBoxHeight - top < 0;
export const isElementAboveViewBox = (bottom) => bottom < 0;

export const shouldPositionLeft = ({ viewBoxWidth, left, tooltipWidth }) => {
  return (viewBoxWidth - left) < (viewBoxWidth / 2) && left > tooltipWidth || left > tooltipWidth
}

export const shouldPositionRight = ({ viewBoxWidth, right, left, tooltipWidth }) => {
  return (left + tooltipWidth) < (viewBoxWidth / 2) && (viewBoxWidth - right) > tooltipWidth || (viewBoxWidth - right) > tooltipWidth
}

export const shouldPositionAbove = ({ viewBoxHeight, top, bottom, tooltipHeight }) => {
  return (viewBoxHeight - bottom) < tooltipHeight && top > tooltipHeight
}

export const shouldPositionBelow = ({ viewBoxHeight, top, bottom, tooltipHeight }) => {
  return top < tooltipHeight && (viewBoxHeight - bottom) > tooltipHeight || (viewBoxHeight - bottom) > tooltipHeight
}
