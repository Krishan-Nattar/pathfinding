import React, { useState, useEffect, useRef } from 'react';
import Node from './Node/Node';
import { Queue, Stack } from './DataStructures';
import Modals from './Modals';
import Legend from './Legend';
import GameControls from './GameControls';

// import './Pathfinder.css';

function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

const Game = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
	const [selectEndNode, setSelectEndNode] = useState(false);
	const [selected, setSelected] = useState('Breadth First Search');
	const [visitedNodes, setVisitedNodes] = useState();
	const [queue, setQueue] = useState();
	const [stack, setStack] = useState();
	const [finished, setFinished] = useState(false);
	const [finalPath, setFinalPath] = useState();
	const [head, setHead] = useState();
	const [direction, setDirection] = useState('e');
	const [count, setCount] = useState(0);
	const [path, setPath] = useState([]);

	// useEffect(()=>{
	//     console.log(count)
	// },[count]);

	// This will eventually connect to a range slider for a user to set their own animation speed
	let [speed, setSpeed] = useState(16);

	// The grid's row and column count
	const rowCount = 20;
	const columnCount = 25;

	// Prevent mouse clicks while visualizations are occuring
	const stopClicking = () => {
		document.querySelector('.App').classList.toggle('no-clicks');
	};
	useEffect(() => {
		if (visitedNodes) {
			let ms = speed;
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
			// if(!finished){setTimeout(stopClicking, timing);}
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

	const handleDirection = (dir) => {
		if (dir === 'n') {
			if (path.length === 0 || direction !== 's') {
				setDirection('n');
			}
		} else if (dir === 'e') {
			if (path.length === 0 || direction !== 'w') {
				setDirection('e');
			}
		} else if (dir === 's') {
			if (path.length === 0 || direction !== 'n') {
				setDirection('s');
			}
		} else if (dir === 'w') {
			if (path.length === 0 || direction !== 'e') {
				setDirection('w');
			}
		}
	};

	useEffect(() => {
		if (path.length > 0) {
			// console.log(path);
		}
	}, [path]);

	const animatePath = (shouldShift = true) => {
		let currentPath = [...path];
		if (currentPath.length > 0) {
			console.log(currentPath);
			for (const node of currentPath) {
				let thisNode = document.getElementById(`${node[0]}-${node[1]}`);
				if (thisNode.classList.contains('visiting')) {
					thisNode.classList.toggle(`visiting`);
					console.log(`Removed visiting from ${node}`);
				}
			}

			if (shouldShift) {
				currentPath.shift();
			}
			// else{
			currentPath.push(head);
			// }
			for (const node of currentPath) {
				let thisNode = document.getElementById(`${node[0]}-${node[1]}`);
				if (!thisNode.classList.contains('visiting')) {
					thisNode.classList.toggle(`visiting`);
					console.log(`Added visiting to  ${node}`);
				}
				// thisNode.classList.toggle(`visiting`);
			}
		}
		return currentPath;
	};

	const moveHead = (dir) => {
		let row = head[0];
		let column = head[1];
		let currentHead = [...head];
		let currentNode = document.getElementById(`${row}-${column}`);
		currentNode.classList.toggle('start-node');

		if (dir === 'n') {
			if (row > 0) {
				row -= 1;
			} else {
				row = rowCount - 1;
			}
		} else if (dir === 'e') {
			if (column < columnCount - 1) {
				column += 1;
			} else {
				column = 0;
			}
		} else if (dir === 's') {
			if (row < rowCount - 1) {
				row += 1;
			} else {
				row = 0;
			}
		} else if (dir === 'w') {
			if (column > 0) {
				column -= 1;
			} else {
				column = columnCount - 1;
			}
		}

		setHead([row, column]);
		currentNode = document.getElementById(`${row}-${column}`);
		if (!currentNode) {
			setHead();
			return;
		}
		let newPath;
		if (currentNode.classList.contains('blocked')) {
			newPath = animatePath(false);
			if (newPath.length < 1) {
				newPath.push(currentHead);
			}

			currentNode.classList.toggle('blocked');
		} else if (currentNode.classList.contains('visiting')) {
			alert('LOSE');
			setHead();
			return;
		} else {
			newPath = animatePath();
		}
		setPath(newPath);
		currentNode.classList.toggle('start-node');
	};

	useInterval(() => {
		if (head && direction) {
			moveHead(direction);
		}
	}, 500);

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
	// const handleSelectChange = (e) => {
	// 	setSelected(e.target.textContent);
	// };

	// Handles click the "Begin" button
	const handleStartAlgorithm = () => {
		setSelectStartNode(false);
		setSelectEndNode(false);

		// Removing css styling from previous animation
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
					setHead([row, column]);
					break thisloop;
				}
			}
		}
		if (!beginningNode) {
			return;
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
			{/* <Modals /> */}
			{/* <Legend /> */}
			<GameControls
				handleClearSelected={handleClearSelected}
				handleSelectStartingNode={handleSelectStartingNode}
				selectStartNode={selectStartNode}
				selectEndNode={selectEndNode}
				// handleSelectChange={handleSelectChange}
				handleDirection={handleDirection}
				handleStartAlgorithm={handleStartAlgorithm}
				handleSelectEndingNode={handleSelectEndingNode}
				// path={path}
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

export default Game;
