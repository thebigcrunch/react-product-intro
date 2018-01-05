export const isElementBelowViewBox = (viewBoxHeight, top) => viewBoxHeight - top < 0;
export const isElementAboveViewBox = (bottom) => bottom < 0;

export const shouldPositionLeft = (viewBoxWidth, left) => {
  // console.log('shouldPositionLeft', (viewBoxWidth - left) < (viewBoxWidth / 2))
  return (viewBoxWidth - left) < (viewBoxWidth / 2);
}
export const shouldPositionAbove = ({ viewBoxHeight, top, bottom, tooltipHeight }) => {
  // console.log('shouldPositionAbove', (viewBoxHeight - bottom) < tooltipHeight && (viewBoxHeight - top) > tooltipHeight )
  // console.log('viewBoxHeight', viewBoxHeight)
  // console.log('bottom', bottom)
  // console.log('viewBoxHeight - bottom', viewBoxHeight - bottom)
  // console.log('tooltipHeight', tooltipHeight)
  // console.log('top', top)
  // console.log('viewBoxHeight - top', viewBoxHeight - top)
  // console.log('----------')
  return (viewBoxHeight - bottom) < tooltipHeight && top > tooltipHeight
}

export const shouldPositionBelow = ({ viewBoxWidth, viewBoxHeight, top, right, bottom, tooltipWidth, tooltipHeight }) => {
  // console.log('shouldPositionBelow', top < tooltipHeight && (viewBoxHeight - bottom) > tooltipHeight) // || viewBoxWidth - right < tooltipWidth)
  // console.log('top', top)
  // console.log('bottom', bottom)
  // console.log('tooltipHeight', tooltipHeight)
  // console.log('top < tooltipHeight', top < tooltipHeight)
  // console.log('viewBoxWidth - right < tooltipWidth', viewBoxWidth - right < tooltipWidth)
  // console.log('----------')
  return top < tooltipHeight && (viewBoxHeight - bottom) > tooltipHeight // || viewBoxWidth - right < tooltipWidth;
}
