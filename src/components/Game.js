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
	const [visitedNodes, setVisitedNodes] = useState();
	const [head, setHead] = useState();
	const [direction, setDirection] = useState('e');
	const [path, setPath] = useState([]);

	// This will eventually connect to a range slider for a user to set their own animation speed
	let [speed, setSpeed] = useState(16);

	// The grid's row and column count
	const rowCount = 20;
	const columnCount = 25;

	// Prevent mouse clicks while visualizations are occuring
	const stopClicking = () => {
		document.querySelector('.App').classList.toggle('no-clicks');
    };
    
    useEffect(()=>{
        document.addEventListener('keypress', handleKeyPress);

        return () => document.removeEventListener('keypress', handleKeyPress);
    },[])

    const handleKeyPress = (e) =>{
        if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'){
            handleDirection(e.key)
        }
    }

	const handleDirection = (dir) => {
		if (dir === 'w') {
			if (path.length === 0 || direction !== 's') {
				setDirection('n');
			}
		} else if (dir ==='d') {
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

	const animatePath = (shouldShift = true) => {
		let currentPath = [...path];
		if (currentPath.length > 0) {

            let thisNode = document.getElementById(`${currentPath[0][0]}-${currentPath[0][1]}`);
				


			if (shouldShift) {
                currentPath.shift();
                if (thisNode.classList.contains('visiting')) {
					thisNode.classList.toggle(`visiting`);
				}
			}
			currentPath.push(head);

            let headNode = document.getElementById(`${head[0]}-${head[1]}`);
            if (!headNode.classList.contains('visiting')) {
                headNode.classList.toggle(`visiting`);
            }
		}
		return currentPath;
    };
    
    
    // return () => 
    
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
	}, 100);

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
        setPath([])
        setHead()
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
			<GameControls
				handleClearSelected={handleClearSelected}
				handleSelectStartingNode={handleSelectStartingNode}
				selectStartNode={selectStartNode}
				// selectEndNode={selectEndNode}
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
