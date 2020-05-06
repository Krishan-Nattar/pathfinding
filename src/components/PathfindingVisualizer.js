import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
	const [selectEndNode, setSelectEndNode] = useState(false);

	const handleClearSelected = () => {
		const nodeList = document.querySelectorAll('.node');
		for (const node of nodeList) node.className = 'node';
		// if (node.classList.contains('toggler')){
		//     node.classList.toggle('toggler')
		// }
	};

	const handleSelectStartingNode = (e) => {
        setSelectStartNode(true);
        setSelectEndNode(false);
		// console.log('hi')
	};

	const handleSelectEndingNode = (e) => {
		// console.log('hi')
		setSelectStartNode(false);
		setSelectEndNode(true);
	};

	useEffect(() => {
		// console.log('hi')
		const nodes = [];
		for (let i = 0; i < 10; i++) {
			const currentRow = [];
			for (let j = 0; j < 20; j++) {
				currentRow.push([]);
			}
			nodes.push(currentRow);
		}
		setNodes(nodes);
	}, []);

	return (
		<div className={`grid ${selectStartNode || selectEndNode ? 'selecting-node' : null}`}>
			{nodes.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className="row">
						{row.map((node, nodeIndex) => {
							return (
								<Node
									key={nodeIndex}
									mouseDown={props.mouseDown}
									setMouseDown={props.setMouseDown}
									selectStartNode={selectStartNode}
                                    setSelectStartNode={setSelectStartNode}
                                    setSelectEndNode={setSelectEndNode}
                                    selectEndNode={selectEndNode}

								/>
							);
						})}
					</div>
				);
			})}
			<button onClick={handleClearSelected}>Clear Selected</button>
			<button onClick={handleSelectStartingNode}>Select Starting Node</button>
			<button onClick={handleSelectEndingNode}>Select Ending Node</button>
		</div>
	);
};

export default PathfindingVisualizer;
