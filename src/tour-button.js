import React from "react";

const TourButton = (props) => {
  const style = {
    width: 86,
    height: 30,
    backgroundColor: "#cbd1d4",
    color: "#494949",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
    cursor: "pointer",
    float: "right",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: "30px",
    ...props.style
  }

	return (
		<div style={style} onClick={props.onClick} className={props.className}>
			{props.children}
		</div>
	);
};

TourButton.defaultProps = {
	onClick: () => {}
};

export default TourButton;
