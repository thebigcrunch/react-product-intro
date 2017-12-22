import React, { Component } from "react";
import {Motion, spring} from "react-motion";
import TourButton from "./tour-button";
import TourButtonContainer from "./tour-button-container";
import Arrow from "./arrow";
import positions from "./helpers/position-helpers";
import * as viewBoxHelpers from "./helpers/viewbox-helpers";
import scrollToPosition from "./helpers/scroll-to-position";

export default class ReactUserTour extends Component {

	constructor(props) {
		super(props);
		this.prevPos = {
			top: 0,
			left: 0
		};
		this.getStepPosition = this.getStepPosition.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.step !== nextProps.step ||
			this.props.active !== nextProps.active ||
			this.props.hideButtons !== nextProps.hideButtons ||
			this.props.hideClose !== nextProps.hideClose;
	}

	getMaskPositionAndDimensions({ selector }) {
		const el = document.querySelector(selector);
		if (el) {
			const position = el ? el.getBoundingClientRect() : {};
			return position
		}
	}

	getStepPosition({
		selector,
		tourElWidth,
		tourElHeight,
		overridePos,
		margin = 25,
		horizontalOffset = 0,
		verticalOffset = 0
	}) {
		const windowHeight = window.innerHeight;
		const windowWidth = window.innerWidth;
		const el = document.querySelector(selector);
		if (el) {
			let elPosition = el ? el.getBoundingClientRect() : {};

			const isElementBelowViewBox = viewBoxHelpers.isElementBelowViewBox(windowHeight, elPosition.top);
			const isElementAboveViewBox = viewBoxHelpers.isElementBelowViewBox(elPosition.bottom);
			if (isElementBelowViewBox) {
				elPosition = scrollToPosition(el, elPosition.bottom);
			}
			else if (isElementAboveViewBox) {
				elPosition = scrollToPosition(el, window.pageYOffset + elPosition.top);
			}

			let elPos;

			if (overridePos && positions[overridePos]) {
				elPos = positions[overridePos]({
					position: elPosition,
					tourElWidth,
					tourElHeight,
					arrowSize: this.props.arrowSize,
					offsetHeight: el.offsetHeight,
					margin
				});
			}
			else {
        const shouldPositionLeft = viewBoxHelpers.shouldPositionLeft(windowWidth, elPosition.left);
        const shouldPositionAbove = viewBoxHelpers.shouldPositionAbove(windowHeight, elPosition.bottom);
        const shouldPositionBelow =
          viewBoxHelpers.shouldPositionBelow({
            viewBoxWidth: windowWidth,
            top: elPosition.top,
            right: elPosition.right,
            tooltipWidth: tourElWidth
          });

        if (shouldPositionLeft && !shouldPositionAbove && !shouldPositionBelow) {
  				elPos = positions.left({
  					position: elPosition,
  					tourElWidth,
            tourElHeight,
  					margin
  				});
  			}
  			else if (shouldPositionAbove) {
  				elPos = shouldPositionLeft ? positions.topLeft({
  					position: elPosition,
  					tourElWidth,
  					tourElHeight,
  					arrowSize: this.props.arrowSize,
  					margin
  				}) :
  				positions.top({
  					position: elPosition,
            tourElWidth,
  					tourElHeight,
  					arrowSize: this.props.arrowSize,
  					margin
  				});
  			}
  			else if (shouldPositionBelow) {
  				elPos = shouldPositionLeft ? positions.bottomLeft({
  					position: elPosition,
  					tourElWidth,
  					arrowSize: this.props.arrowSize,
  					offsetHeight: el.offsetHeight,
  					margin
  				}) :
  				positions.bottom({
  					position: elPosition,
            tourElWidth,
  					arrowSize: this.props.arrowSize,
  					offsetHeight: el.offsetHeight,
  					margin
  				});
  			}
  			else {
  				elPos = positions.right({
  					position: elPosition,
            tourElHeight,
  					margin
  				});
  			}
      }

			elPos.left += horizontalOffset;
			elPos.top += verticalOffset;

			this.prevPos = elPos;
			return elPos;
		}
		else {
			return this.prevPos;
		}
	}

	getCustomArrow(position) {
		return (
				typeof this.props.arrow === "function"
				?
				this.props.arrow({
					position: position.positioned,
					width: this.props.style.width,
					height: this.props.style.height,
					size: this.props.arrowSize,
					color: this.props.arrowColor
				})
				:
				this.props.arrow
			);
	}

	render() {
		const currentTourStep = this.props.steps.filter(step => step.step === this.props.step)[0];
		if (!this.props.active || !currentTourStep) {
			return null;
		}

    if (currentTourStep.before) {
      currentTourStep.before();
    }

		const stepPosition = this.getStepPosition({
      selector: currentTourStep.selector,
      tourElWidth: this.props.style.width,
      tourElHeight: this.props.style.height,
      overridePos: currentTourStep.position,
      margin: currentTourStep.margin,
      horizontalOffset: currentTourStep.horizontalOffset,
      verticalOffset: currentTourStep.verticalOffset
		});

		const arrow = (
			this.props.arrow
			?
			this.getCustomArrow(stepPosition)
			:
			<Arrow
				position={stepPosition.positioned}
				width={this.props.style.width}
				height={this.props.style.height}
				size={this.props.arrowSize}
				color={this.props.arrowColor}
			/>
		);

		const extraButtonProps = this.props.buttonStyle ? {style: this.props.buttonStyle} : {};

		const nextButton = (
			this.props.step !== this.props.steps.length ?
				<TourButton
					onClick={() => this.props.onNext(this.props.step + 1)}
					{...extraButtonProps}
					className="react-user-tour-next-button">
						{this.props.nextButtonText}
				</TourButton> : ""
		);

		const backButton = (
			this.props.step !== 1 ?
				<TourButton
					onClick={() => this.props.onBack(this.props.step - 1)}
					{...extraButtonProps}
					className="react-user-tour-back-button">
						{this.props.backButtonText}
				</TourButton> : ""
		);

		const doneButton = (
			this.props.step === this.props.steps.length ?
				<TourButton
					onClick={this.props.onCancel}
					{...extraButtonProps}
					className="react-user-tour-done-button">
						{this.props.doneButtonText}
				</TourButton> : ""
		);

		const tourButtonContainer = (
			!this.props.hideButtons ?
				<TourButtonContainer style={this.props.buttonContainerStyle}>
					{nextButton}
					{doneButton}
					{backButton}
				</TourButtonContainer> : ""
		);

		const xStyle = {
			"float": "right",
			"cursor": "pointer",
			"paddingRight": 10,
			"paddingTop": 10
		};

		const closeButton = (
			!this.props.hideClose ?
				<span className="react-user-tour-close"
					style={xStyle}
					onClick={this.props.onCancel}>
						{this.props.closeButtonText}
				</span> : ""
		);

		const tourContainerStyle = {
			position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
			left: 0,
			zIndex: 100,
			...this.props.containerStyle
		}

    const tooltipStyle = {...this.props.style};

		const maskPosition = this.getMaskPositionAndDimensions({ selector: currentTourStep.selector })
		const maskStyle = maskPosition ? {
		    position: "absolute",
		    // left: maskPosition.left,
		    // top: maskPosition.top,
        transform: `translate3d(${maskPosition.left}px, ${maskPosition.top}px, 0)`,
		    width: maskPosition.width,
		    height: maskPosition.height,
		    boxShadow: "0px 0px 0px 2000px #222326",
		    opacity: 0.5,
		} : {};

		return (
			<div className="react-user-tour-container" style={tourContainerStyle}>
				<Motion style={{x: spring(stepPosition.left), y: spring(stepPosition.top)}}>
					{({x, y}) =>

						<div style={{...tooltipStyle, transform: `translate3d(${x}px, ${y}px, 0)`}}>
							{arrow}
							{closeButton}
							{currentTourStep.title}
							{currentTourStep.body}
							{tourButtonContainer}
						</div>
					}
				</Motion>
				{/* mask for content highlighting */}
				<div style={maskStyle} />
			</div>
		);
	}
}

ReactUserTour.defaultProps = {
	style: {
		height: 150,
		width: 350,
		position: "absolute",
		zIndex: 9999,
		backgroundColor: "#fff",
		color: "#494949",
		boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.24)"
	},
	containerStyle: {},
	onCancel: () => {},
	onNext: () => {},
	onBack: () => {},
	nextButtonText: "Next",
	backButtonText: "Back",
	doneButtonText: "Done",
	closeButtonText: "Close",
	buttonContainerStyle: {
		position: "absolute",
		bottom: 10,
		right: 0
	},
	hideButtons: false,
	hideClose: false,
	arrowColor: "#fff",
	arrowSize: 15
};
