import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Queue, Stack } from './DataStructures';
import Modals from './Modals';
import Legend from './Legend';
import Controls from './Controls';

import './PathfindingVisualizer.css';

const PathfindingVisualizer = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
	const [selectEndNode, setSelectEndNode] = useState(false);
	const [visitedNodes, setVisitedNodes] = useState();
	const [finished, setFinished] = useState(false);
	const [queue, setQueue] = useState();
	const [stack, setStack] = useState();
	const [finalPath, setFinalPath] = useState();
	const [selected, setSelected] = useState('Breadth First Search');

	// The grid's row and column count
	const rowCount = 20;
	const columnCount = 25;

	// Prevent mouse clicks while visualizations are occuring
	const stopClicking = () =>{
		document.querySelector('.App').classList.toggle('no-clicks');

	}
	useEffect(() => {
		if (visitedNodes) {
			let ms = 16;
			let timing = visitedNodes.length * ms + 100;
			let nodeCopy = [...visitedNodes];

			let animation = setInterval(() => {
				if (nodeCopy.length === 0) {
					clearInterval(animation);
					setFinished(true);
					return;
				}
				let nextNode = nodeCopy.shift();
				let row = nextNode.row;
				let column = nextNode.column;

				const currentNode = document.getElementById(`${row}-${column}`);
				currentNode.classList.toggle('visited');
			}, ms);
			if(!finished){setTimeout(stopClicking, timing);}
		}

	}, [visitedNodes]);

	// Creates an array of nodes located around the current node.
	const checkNearbyNodes = (rowNumber, colNumber, copyNodes) => {
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
		return checkNodes;
	};

	// Runs a depth first search for end node
	const handleDFS = () => {
		let q = new Stack(stack.nodes);

		let copyNodes = JSON.parse(JSON.stringify(nodes));

		let visitedArray = [];
		while (!q.isEmpty()) {
			let currentPath = q.pop();

			let currentNode = currentPath[currentPath.length - 1];

			let checkNodes = checkNearbyNodes(
				currentNode.row,
				currentNode.column,
				copyNodes,
			);

			for (const node of checkNodes) {
				let thisNode = document.getElementById(`${node.row}-${node.column}`);
				if (
					!node.wasVisited &&
					!thisNode.classList.contains('end-node') &&
					!thisNode.classList.contains('blocked') &&
					!thisNode.classList.contains('start-node')
				) {
					visitedArray.push({ row: node.row, column: node.column });
					copyNodes[node.row][node.column].wasVisited = true;
					q.push([...currentPath, { row: node.row, column: node.column }]);
					continue;
				}
				if (thisNode.classList.contains('end-node')) {
					setFinalPath(currentPath);
					setVisitedNodes(visitedArray);

					return;
				}
			}
		}
		setVisitedNodes(visitedArray);
	};

	// Runs a breadth first search for end node
	const handleBFS = () => {
		let q = new Queue(queue.nodes);

		let copyNodes = JSON.parse(JSON.stringify(nodes));

		let visitedArray = [];
		while (!q.isEmpty()) {
			let currentPath = q.dequeue();
			let currentNode = currentPath[currentPath.length - 1];
			let checkNodes = checkNearbyNodes(
				currentNode.row,
				currentNode.column,
				copyNodes,
			);

			for (const node of checkNodes) {
				let thisNode = document.getElementById(`${node.row}-${node.column}`);

				if (
					!node.wasVisited &&
					!thisNode.classList.contains('end-node') &&
					!thisNode.classList.contains('blocked') &&
					!thisNode.classList.contains('start-node')
				) {
					visitedArray.push({ row: node.row, column: node.column });
					copyNodes[node.row][node.column].wasVisited = true;
					q.enqueue([...currentPath, { row: node.row, column: node.column }]);
					continue;
				}
				if (thisNode.classList.contains('end-node')) {
					setFinalPath(currentPath);
					setVisitedNodes(visitedArray);

					return;
				}
			}
		}
		setVisitedNodes(visitedArray);
	};

	useEffect(() => {
		if (queue) {
			setFinalPath();
			handleBFS();
		}
	}, [queue]);

	useEffect(() => {
		if (stack) {
			setFinalPath();
			handleDFS();
		}
	}, [stack]);

	useEffect(() => {
		if (finalPath && finished) {
			stopClicking()
			let ms = 100;
			let timing = ms * finalPath.length
			let nodeCopy = [...finalPath];
			nodeCopy.shift();

			let animation = setInterval(() => {
				if (nodeCopy.length === 0) {
					clearInterval(animation);
					setFinished(false);
					return;
				}
				let nextNode = nodeCopy.shift();
				let row = nextNode.row;
				let column = nextNode.column;

				const currentNode = document.getElementById(`${row}-${column}`);
				currentNode.classList.toggle('visiting');
				currentNode.classList.toggle('visited');
			}, ms);
			setTimeout(stopClicking, timing);
		}
	}, [finalPath, finished]);

	// Used to remove starting/ending nodes when placing a new one somewhere on the grid
	const removeNode = (title) => {
		for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
				let thisNode = document.getElementById(`${row}-${column}`);

				if (thisNode.classList.contains(`${title}-node`)) {
					thisNode.classList.toggle(`${title}-node`);
				}
			}
		}
	};

	// Clears the board of all nodes and resets back to original state
	const handleClearSelected = () => {
		setSelectEndNode(false);
		setSelectStartNode(false);
		setFinished(false);
		initializeNodes();
		for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
				document.getElementById(`${row}-${column}`).className = 'node';
			}
		}
	};

	// Handles clicking the "Place Starting Node" button
	const handleSelectStartingNode = (e) => {
		setSelectStartNode(true);
		setSelectEndNode(false);
	};

	// Handles clicking the "Place Ending Node" button
	const handleSelectEndingNode = (e) => {
		setSelectStartNode(false);
		setSelectEndNode(true);
	};

	// Handles choosing an option in the dropdown menu
	const handleSelectChange = (e) => {
		setSelected(e.target.textContent);
	};

	const stopClicks = e =>{
		e.stopPropagation();
		e.preventDefault();
		console.log("STOPCLICKS")
	}

	// Handles click the "Begin" button
	const handleStartAlgorithm = () => {
		
		setSelectStartNode(false);
		setSelectEndNode(false);
		let visitedNodes = document.querySelectorAll('.visited');
		let pathNodes = document.querySelectorAll('.visiting');

		for (const node of visitedNodes) {
			node.classList.toggle('visited');
		}
		for (const node of pathNodes) {
			node.classList.toggle('visiting');
		}
		let beginningNode;

		thisloop: for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
				if (
					document
						.getElementById(`${row}-${column}`)
						.classList.contains('start-node')
				) {
					beginningNode = nodes[row][column];
					break thisloop;
				}
			}
		}
		if (!beginningNode) {
			return;
		}
		stopClicking()
		if (selected === 'Breadth First Search') {
			let q = new Queue();
			q.enqueue([
				{
					row: beginningNode.row,
					column: beginningNode.column,
				},
			]);

			setQueue(q);
		} else {
			let s = new Stack();
			s.push([
				{
					row: beginningNode.row,
					column: beginningNode.column,
				},
			]);

			setStack(s);
		}
	};

	// Resets all nodes in state to original state.
	const initializeNodes = (e) => {
		const nodes = [];
		for (let row = 0; row < rowCount; row++) {
			const currentRow = [];
			for (let column = 0; column < columnCount; column++) {
				currentRow.push({
					row,
					column,
					visiting: false,
					wasVisited: false,
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
		<>
			<Modals />
			<Legend />
			<Controls
				handleClearSelected={handleClearSelected}
				handleSelectStartingNode={handleSelectStartingNode}
				selectStartNode={selectStartNode}
				selectEndNode={selectEndNode}
				handleSelectChange={handleSelectChange}
				handleStartAlgorithm={handleStartAlgorithm}
				handleSelectEndingNode={handleSelectEndingNode}
			/>

			<div
				className={`grid ${
					selectStartNode || selectEndNode ? 'selecting-node' : ' '
				}`}>
				{nodes.map((row, rowIndex) => {
					return (
						<div key={rowIndex} className="row">
							{row.map((node, nodeIndex) => {
								return (
									<Node
										removeNode={removeNode}
										key={nodeIndex}
										mouseDown={props.mouseDown}
										setMouseDown={props.setMouseDown}
										selectStartNode={selectStartNode}
										setSelectStartNode={setSelectStartNode}
										setSelectEndNode={setSelectEndNode}
										selectEndNode={selectEndNode}
										row={node.row}
										column={node.column}
										nodes={nodes}
										setNodes={setNodes}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default PathfindingVisualizer;
