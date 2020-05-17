import React, { useState, useEffect, useRef } from 'react';
import Node from './Node/Node';
import GameControls from './GameControls';

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
	const [head, setHead] = useState();
	const [direction, setDirection] = useState('e');
	const [path, setPath] = useState([]);
	const [whiteSpace, setWhiteSpace] = useState(false);

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
		document.addEventListener('keypress', handleKeyPress);

		return () => document.removeEventListener('keypress', handleKeyPress);
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
			handleDirection(e.key);
		}
	};

	const handleDirection = (dir) => {
		if (dir === 'w') {
			if (path.length === 0 || direction !== 's') {
				setDirection('n');
			}
		} else if (dir === 'd') {
			if (path.length === 0 || direction !== 'w') {
				setDirection('e');
			}
		} else if (dir === 's') {
			if (path.length === 0 || direction !== 'n') {
				setDirection('s');
			}
		} else if (dir === 'a') {
			if (path.length === 0 || direction !== 'e') {
				setDirection('w');
			}
		}
	};


	const animatePath = (dynamicClass, shouldShift = true) => {
		let currentPath = JSON.parse(JSON.stringify(path));
		console.log(currentPath)
		if (currentPath.length > 0) {
			let thisNode = document.getElementById(
				`${currentPath[0][0]}-${currentPath[0][1]}`,
			);

			if (shouldShift) {
				currentPath.shift();
				if (thisNode.classList.contains('visiting-node')) {
					thisNode.className = 'node'
				}
			}
			currentPath.push(head);
			for(const node of currentPath){

				let thisNode = document.getElementById(`${node[0]}-${node[1]}`);
				thisNode.className = `node`
			}

			for(const node of currentPath){

				let thisNode = document.getElementById(`${node[0]}-${node[1]}`);
				thisNode.className = `node visiting-node ${node[2]}`
			}
		}
		return currentPath;
	};

	const moveHead = () => {
		let row = head[0];
		let column = head[1];
		let currentNode = document.getElementById(`${row}-${column}`);
		currentNode.className ="node";
		let dynamicClass;
		if (direction === 'n') {
			dynamicClass = "up1"
			if (row > 0) {
				row -= 1;
			} else {
				row = rowCount - 1;
			}
		} else if (direction === 'e') {
			dynamicClass = "right1"
			if (column < columnCount - 1) {
				column += 1;
			} else {
				column = 0;
			}
		} else if (direction === 's') {
			dynamicClass = "down1"
			if (row < rowCount - 1) {
				row += 1;
			} else {
				row = 0;
			}
		} else if (direction === 'w') {
			dynamicClass = "left1"
			if (column > 0) {
				column -= 1;
			} else {
				column = columnCount - 1;
			}
		}

		setHead([row, column, dynamicClass]);
		currentNode = document.getElementById(`${row}-${column}`);
		let newPath;
		if (currentNode.classList.contains('blocked')) {
			newPath = animatePath(dynamicClass, false);

			if (newPath.length < 1) {
				newPath.push([row, column, dynamicClass]);
			}

			currentNode.classList.toggle('blocked');
		} else if (currentNode.classList.contains('visiting-node')) {
			alert('LOSE');
			setHead();
			return;
		} else {
			newPath = animatePath(dynamicClass);
		}
		setPath(newPath);
		currentNode.className = `node game-start-node ${dynamicClass}`
	};

	useInterval(() => {
		if (head && direction) {
			moveHead();
		}
	}, 300);

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
		setPath([]);
		setHead();
		setSelectStartNode(false);
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
	};

	// Handles click the "Begin" button
	const handleStartAlgorithm = () => {
		setSelectStartNode(false);

		// Removing css styling from previous animation
		let visitedNodes = document.querySelectorAll('.visited');
		let pathNodes = document.querySelectorAll('.visiting-node');
		for (const node of visitedNodes) {
			node.classList.toggle('visited');
		}
		for (const node of pathNodes) {
			node.classList.toggle('visiting-node');
		}

		let beginningNode;

		thisloop: for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
				if (
					document
						.getElementById(`${row}-${column}`)
						.classList.contains('game-start-node')
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
			<GameControls
				handleClearSelected={handleClearSelected}
				handleSelectStartingNode={handleSelectStartingNode}
				selectStartNode={selectStartNode}
				handleDirection={handleDirection}
				handleStartAlgorithm={handleStartAlgorithm}
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
										game={true}
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
