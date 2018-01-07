import React from "react";
import { arrowUp, arrowDown, arrowLeft, arrowRight } from "./helpers/arrow-styles";

const Arrow = ({position, width, height, size, color}) => {
	let arrowStyle;
	switch (position) {
		case "left":
			arrowStyle = arrowRight({size, color});
			arrowStyle.left = width;
      arrowStyle.top = "50%";
      arrowStyle.transform = "translateY(-50%)";
			break;
		case "right":
			arrowStyle = arrowLeft({size, color});
      arrowStyle.top = "50%";
      arrowStyle.transform = "translateY(-50%)";
			break;
		case "top":
			arrowStyle = arrowDown({size, color});
			arrowStyle.top = height;
      arrowStyle.left = "50%";
      arrowStyle.transform = "translateX(-50%)";
			break;
		case "topLeft":
			arrowStyle = arrowDown({size, color});
			arrowStyle.top = height;
			arrowStyle.left = width - (size * 2);
			break;
    case "topRight":
      arrowStyle = arrowDown({size, color});
      arrowStyle.top = height;
      arrowStyle.left = 0
      break;
		case "bottom":
			arrowStyle = arrowUp({size, color});
      arrowStyle.left = "50%";
      arrowStyle.transform = "translateX(-50%)";
			break;
		case "bottomLeft":
			arrowStyle = arrowUp({size, color});
			arrowStyle.left = width - (size * 2);
			break;
    case "bottomRight":
      arrowStyle = arrowUp({size, color});
      arrowStyle.left = 0
      break;
		default:
			arrowStyle = {};
	}
	return <div className="react-user-tour-arrow" style={arrowStyle} />;
};

export default Arrow;
