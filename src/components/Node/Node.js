import React, { useState, useEffect } from 'react';
import './Node.css';

const Node = (props) => {

    const [dynamicClassName, setDynamicClassName] = useState("");
    const {isStart, isEnd, visiting, wasVisited, isBlocked} = props;

    useEffect(()=>{

        if(isStart){
            setDynamicClassName('start-node')
        } else if(isEnd){
            setDynamicClassName('end-node')
        } else if(visiting){
            setDynamicClassName('visiting')
        } else if(wasVisited){
            setDynamicClassName('visited')
        } else if(isBlocked){
            setDynamicClassName("blocked")
        } else {
            setDynamicClassName("")
        } 

    },[isStart, isEnd, visiting, wasVisited, isBlocked])

	const handleMouseDown = (e) => {
        const {row, column} = props;
        let copyNodes = [...props.nodes]
        let thisNode = copyNodes[row][column];

        if(props.selectStartNode && !thisNode.isEnd){
            for(const row of copyNodes){
                for(const col of row){
                    col.isStart = false;
                }
            }
            thisNode.isStart = true;
            props.setSelectStartNode(false);
        } else if(props.selectEndNode && !thisNode.isStart){
            for(const row of copyNodes){
                for(const col of row){
                    col.isEnd = false;
                }
            }
            thisNode.isEnd = true;
            props.setSelectEndNode(false);
        } else if (!props.selectStartNode && !props.selectEndNode) {
			let node = e.target;
			if (!node.classList.contains('start-node') && !node.classList.contains('end-node')) {
                thisNode.isBlocked = true;
				// props.setMouseDown(true);
			}
        }

        props.setNodes(copyNodes);


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
			className={`node ${dynamicClassName}`}
			onMouseDown={handleMouseDown}
			// onMouseOver={handleDrag}
            ></div>
	);
};

export default Node;
