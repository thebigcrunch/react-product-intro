import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  to {
    box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);
  }
`

export default ({ style = {}, position, width, height, margin, size, arrowSize }) => {
  switch (position) {
    case "left":
      style.left = width + (size * 2);;
      style.top = "50%";
      style.transform = "translateY(-50%)";
      break;
    case "right":
      style.top = "50%";
      style.transform = "translateY(-50%)";
      style.left = 0 - margin - (size / 2)
      break;
    case "top":
      style.top = height + margin + size;
      style.left = "50%";
      style.transform = "translateX(-50%)";
      break;
    case "topLeft":
      style.top = height + margin + size;
      style.left = width - (size * 2);
      break;
    case "topRight":
      style.top = height + margin + size;
      style.left = 0 + size;
      break;
    case "bottom":
      style.top = 0 - margin - arrowSize - (size / 2);
      style.left = "50%";
      style.transform = "translateX(-50%)";
      break;
    case "bottomLeft":
      style.top = 0 - margin - arrowSize - (size / 2);
      style.left = width - (size * 2);
      break;
    case "bottomRight":
      style.top = 0 - margin - arrowSize - (size / 2);
      style.left = arrowSize - (size / 2);
      break;
    default:
      style.display = "none"
      break;
  }

  const Beacon = styled.div`
    padding: 0;
    position: absolute;
    width: 10px;
    height: 10px;
    border: none;
    box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
    border-radius: 50%;
    background-color: #e84c3d;
    animation: ${pulse} 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  `
  return <Beacon style={style} />
}
