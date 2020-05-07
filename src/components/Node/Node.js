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
        // let copyNodes = [...props.nodes]
        let copyNodes = JSON.parse(JSON.stringify(props.nodes))
        let thisNode = copyNodes[row][column];

        if(props.selectStartNode && !thisNode.isEnd){
            for(const row of copyNodes){
                for(const col of row){
                    col.isStart = false;
                }
            }
            thisNode.isStart = true;
            props.setSelectStartNode(false);
            props.setNodes(copyNodes);
        } else if(props.selectEndNode && !thisNode.isStart){
            for(const row of copyNodes){
                for(const col of row){
                    col.isEnd = false;
                }
            }
            thisNode.isEnd = true;
            props.setSelectEndNode(false);
            props.setNodes(copyNodes);
        } else if (!props.selectStartNode && !props.selectEndNode) {
			let node = e.target;
			if (!node.classList.contains('start-node') && !node.classList.contains('end-node') && !node.classList.contains('blocked')) {
                // thisNode.isBlocked = true;
                document.getElementById(`${row}-${column}`).classList.add('blocked')
				props.setMouseDown(true);
			}
        }

        



	};

	const handleDrag = (e) => {
		if (props.mouseDown && !props.selectStartNode && !props.selectEndNode) {
            const {row, column} = props;
            let thisNode = props.nodes[row][column];
            
            if (!thisNode.isStart && !thisNode.isEnd && !thisNode.isBlocked) {
                let copyNodes = [...props.nodes]
                copyNodes[row][column].isBlocked = true
                props.setNodes(copyNodes);
                }

		}
	};
	return (
		<div
            className={`node ${dynamicClassName}`}
            id={`${props.row}-${props.column}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleDrag}
            ></div>
	);
};

export default Node;
