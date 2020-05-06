import React, { useState, useEffect } from 'react';
import './Node.css';

const Node = (props) => {

	const handleMouseDown = (e) => {
        const {row, column} = props;
        let copyNodes = [...props.nodes]
        let thisNode = copyNodes[row][column];

        if(props.selectStartNode && thisNode.isEnd === false){
            for(const row of copyNodes){
                for(const col of row){
                    col.isStart = false;
                }
            }
            thisNode.isStart = true;
            props.setNodes(copyNodes);
            props.setSelectStartNode(false);
        } else if(props.selectEndNode && thisNode.isStart === false){
            for(const row of copyNodes){
                for(const col of row){
                    col.isEnd = false;
                }
            }
            thisNode.isEnd = true;
            props.setNodes(copyNodes);
            props.setSelectEndNode(false);
        }
    

		// if (!props.selectStartNode && !props.selectEndNode) {
		// 	let node = e.target;
		// 	if (!node.classList.contains('start-node')) {
		// 		node.classList.toggle('toggler');
		// 		props.setMouseDown(true);
		// 	}
		// } else if (props.selectStartNode) {
		// 	let node = e.target;
		// 	if (node.classList.contains('end-node')) {
		// 		return;
		// 	}

		// 	const nodeList = document.querySelectorAll('.node');
		// 	for (const node of nodeList)
		// 		if (node.classList.contains('start-node')) {
		// 			node.classList.toggle('start-node');
		// 		}

		// 	node.classList.toggle('start-node');
		// 	props.setSelectStartNode(false);
		// } else if (props.selectEndNode) {
		// 	let node = e.target;
		// 	if (node.classList.contains('start-node')) {
		// 		return;
		// 	}

		// 	const nodeList = document.querySelectorAll('.node');
		// 	for (const node of nodeList)
		// 		if (node.classList.contains('end-node')) {
		// 			node.classList.toggle('end-node');
		// 		}

		// 	node.classList.toggle('end-node');
		// 	props.setSelectEndNode(false);
		// }
	};

	const handleDrag = (e) => {
		if (props.mouseDown === true) {
			// console.log('dragging')
			let node = e.target;
			if (
				!node.classList.contains('toggler') &&
				!node.classList.contains('start-node') &&
				!node.classList.contains('end-node')
			) {
				node.classList.toggle('toggler');
			}
		}
	};
	return (
		<div
			className={`node ${props.isStart ? 'start-node' : ""} ${props.isEnd ? `end-node` : ''}`}
			onMouseDown={handleMouseDown}
			// onMouseOver={handleDrag}
            ></div>
	);
};

export default Node;
