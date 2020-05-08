import React from 'react';
import './Node.css';

const Node = (props) => {

	const handleMouseDown = (e) => {
		const { row, column } = props;
		let thisNode = document.getElementById(`${row}-${column}`);

		if (props.selectStartNode && !thisNode.classList.contains('end-node')) {
			props.setSelectStartNode(false);
			thisNode.classList.toggle('start-node');
		} else if (
			props.selectEndNode &&
			!thisNode.classList.contains('start-node')
		) {
			props.setSelectEndNode(false);
			thisNode.classList.toggle('end-node');
		} else if (!props.selectStartNode && !props.selectEndNode) {
			if (
				!thisNode.classList.contains('start-node') &&
				!thisNode.classList.contains('end-node') &&
				!thisNode.classList.contains('blocked')
			) {
				props.setMouseDown(true);
				thisNode.classList.toggle('blocked');
			} else if (thisNode.classList.contains('blocked')) {
				thisNode.classList.toggle('blocked');
			}
		}
	};

	const handleDrag = () => {
		console.log('here');
		if (props.mouseDown && !props.selectStartNode && !props.selectEndNode) {
			const { row, column } = props;
			let thisNode = document.getElementById(`${row}-${column}`);

			if (
				!thisNode.classList.contains('start-node') &&
				!thisNode.classList.contains('end-node') &&
				!thisNode.classList.contains('blocked')
			) {
				thisNode.classList.toggle('blocked');
			}
		}
	};

	const handleClick = () => {};
	return (
		<div
			className={`node`}
			id={`${props.row}-${props.column}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleDrag}
			onClick={handleClick}
            ></div>
	);
};

export default Node;
