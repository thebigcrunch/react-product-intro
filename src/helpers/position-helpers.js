const positions = {
	right: ({ position, tourElHeight, margin }) => {
		return {
			left: Math.floor(position.right + margin),
			top: Math.floor(position.top + window.pageYOffset - ((tourElHeight - position.height) / 2)),
			positioned: "right"
		};
	},
	left: ({ position, tourElWidth, tourElHeight, margin }) => {
		return {
			left: Math.floor((position.left - margin) - tourElWidth),
			top: Math.floor(position.top + window.pageYOffset - ((tourElHeight - position.height) / 2)),
			positioned: "left"
		};
	},
	top: ({ position, tourElWidth, tourElHeight, arrowSize, margin }) => {
		return {
			left: Math.floor(position.left - ( (tourElWidth - position.width) / 2 )),
			top: Math.floor((position.top + window.pageYOffset - margin) - tourElHeight - arrowSize),
			positioned: "top"
		};
	},
	topLeft: ({ position, tourElWidth, tourElHeight, arrowSize, margin }) => {
		return {
			left: Math.floor((position.left + margin) - tourElWidth),
			top: Math.floor((position.top + window.pageYOffset - margin) - tourElHeight - arrowSize),
			positioned: "topLeft"
		};
	},
  topRight: ({ position, tourElHeight, arrowSize, margin }) => {
    return {
      left: Math.floor((position.left + margin)),
      top: Math.floor((position.top + window.pageYOffset + margin) - tourElHeight - arrowSize),
      positioned: "topRight"
    };
  },
	bottom: ({ position, tourElWidth, arrowSize, offsetHeight, margin }) => {
		return {
			left: Math.floor(position.left - ( (tourElWidth - position.width) / 2 )),
			top: Math.floor((position.top + window.pageYOffset + margin) + offsetHeight + arrowSize),
			positioned: "bottom"
		};
	},
	bottomLeft: ({ position, tourElWidth, arrowSize, offsetHeight, margin }) => {
		return {
			left: Math.floor((position.left + margin) - tourElWidth),
			top: Math.floor((position.top + window.pageYOffset + margin) + offsetHeight + arrowSize),
			positioned: "bottomLeft"
		};
	},
  bottomRight: ({ position, arrowSize, offsetHeight, margin }) => {
    return {
      left: Math.floor((position.left + margin)),
      top: Math.floor((position.top + window.pageYOffset + margin) + offsetHeight + arrowSize),
      positioned: "bottomRight"
    };
  },
  ontop: ({ position, tourElWidth, arrowSize, offsetHeight, margin }) => {
    return {
      left: Math.floor(position.left + ( (position.width - tourElWidth) / 2 )),
      top: Math.floor(position.top + margin + window.pageYOffset),
      positioned: "ontop"
    }
  }
}

export default positions;
