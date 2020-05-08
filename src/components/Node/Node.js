import React from 'react';
import './Node.css';

const Node = (props) => {
	// WHen mouse is clicked, we check we nodes currently exist on that spot and put relevant new node there if applicable.
	const handleMouseDown = (e) => {
		const { row, column } = props;
		let thisNode = document.getElementById(`${row}-${column}`);

		if (props.selectStartNode && !thisNode.classList.contains('end-node')) {
			props.setSelectStartNode(false);
			props.removeNode('start');
			thisNode.classList.toggle('start-node');
		} else if (
			props.selectEndNode &&
			!thisNode.classList.contains('start-node')
		) {
			props.setSelectEndNode(false);
			props.removeNode('end');
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

	// If a user had clicked on a blank node and dragged the mouse across other blank nodes, this will create "blocked" nodes on the grid
	const handleDrag = () => {
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

	return (
		<div
			className={`node`}
			id={`${props.row}-${props.column}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleDrag}></div>
	);
};

export default Node;
