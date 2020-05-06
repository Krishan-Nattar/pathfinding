import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Queue } from './Queue';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
	const [selectEndNode, setSelectEndNode] = useState(false);
	const rowCount = 20;
	const columnCount = 25;

	const [queue, setQueue] = useState();
	const [finalPath, setFinalPath] = useState();

	const handleBFS = () => {
		let q = new Queue(queue.nodes);
		let copyNodes = [...nodes];
		if (!q.isEmpty()) {
			let currentPath = q.dequeue();
			let currentNode = currentPath[currentPath.length - 1];
			let rowNumber = currentNode.row;
			let colNumber = currentNode.column;
			let checkNodes = [];
			if (rowNumber > 0) {
				checkNodes.push(copyNodes[rowNumber - 1][colNumber]);
			}
			if (colNumber > 0) {
				checkNodes.push(copyNodes[rowNumber][colNumber - 1]);
			}

			if (rowNumber < rowCount - 1) {
				checkNodes.push(copyNodes[rowNumber + 1][colNumber]);
			}
			if (colNumber < columnCount - 1) {
				checkNodes.push(copyNodes[rowNumber][colNumber + 1]);
			}

			for (const node of checkNodes) {
				if (!node.wasVisited && !node.isEnd && !node.isBlocked) {
					copyNodes[node.row][node.column].wasVisited = true;
					q.enqueue([...currentPath, { row: node.row, column: node.column }]);
					continue;
				}
				if (node.isEnd) {
					setFinalPath(currentPath);
					return;
				}
			}
			setNodes(copyNodes);
			setTimeout(setQueue.bind(this, q), 5);
		} else {
			alert('Unable to find path');
		}
	};

	// Handle BFS
	useEffect(() => {
		if (queue) {
			handleBFS();
		}
	}, [queue]);

	useEffect(() => {
		if (finalPath) {
			let copyNodes = [...nodes];
			if (finalPath.length > 0) {
				let row = finalPath[0].row;
				let column = finalPath[0].column;
				copyNodes[row][column].visiting = true;
			}
			setNodes(copyNodes);
			let newPath = [...finalPath];
			newPath.shift();
			if (newPath.length > 0) {
				setTimeout(setFinalPath.bind(this, newPath), 0);
			}
		}
	}, [finalPath]);

	const handleClearSelected = () => {
		initializeNodes();
	};

	const handleSelectStartingNode = (e) => {
		setSelectStartNode(true);
		setSelectEndNode(false);
	};

	const handleSelectEndingNode = (e) => {
		setSelectStartNode(false);
		setSelectEndNode(true);
	};

	const handleStartAlgorithm = () => {
		let beginningNode;
		outerloop: for (const row of nodes) {
			for (const node of row) {
				if (node.isStart) {
					beginningNode = node;
					break outerloop;
				}
			}
		}

		let q = new Queue();
		q.enqueue([
			{
				row: beginningNode.row,
				column: beginningNode.column,
			},
		]);

		setQueue(q);
	};

	const initializeNodes = (e) => {
		const nodes = [];
		for (let row = 0; row < rowCount; row++) {
			const currentRow = [];
			for (let column = 0; column < columnCount; column++) {
				currentRow.push({
					row,
					column,
					isStart: false,
					isEnd: false,
					visiting: false,
					wasVisited: false,
					isBlocked: false,
				});
			}
			nodes.push(currentRow);
		}
		setNodes(nodes);
	};

	useEffect(() => {
		initializeNodes();
	}, []);

	return (
		<div
			className={`grid ${
				selectStartNode || selectEndNode ? 'selecting-node' : null
			}`}>
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
									row={node.row}
									column={node.column}
									isStart={node.isStart}
									isEnd={node.isEnd}
									nodes={nodes}
									setNodes={setNodes}
									visiting={node.visiting}
									wasVisited={node.wasVisited}
									isBlocked={node.isBlocked}
								/>
							);
						})}
					</div>
				);
			})}
			<button onClick={handleClearSelected}>Clear Selected</button>
			<button onClick={handleSelectStartingNode}>Select Starting Node</button>
			<button onClick={handleSelectEndingNode}>Select Ending Node</button>
			<button onClick={handleStartAlgorithm}>Begin</button>
		</div>
	);
};

export default PathfindingVisualizer;
