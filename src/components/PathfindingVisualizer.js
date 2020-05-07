import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Queue } from './Queue';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
    const [selectEndNode, setSelectEndNode] = useState(false);
    const [visitedNodes, setVisitedNodes] = useState();
    const [finished, setFinished] = useState(false);
	const rowCount = 20;
	const columnCount = 25;

	const [queue, setQueue] = useState();
    const [finalPath, setFinalPath] = useState();
    let path = "";

    useEffect(()=>{
        if(visitedNodes){

            let nodeCopy = [...visitedNodes];

            let animation = setInterval(()=>{
                if(nodeCopy.length === 0){
                    clearInterval(animation);
                    setFinished(true);
                    return;
                }
                let nextNode = nodeCopy.shift();
                let row = nextNode.row;
                let column = nextNode.column;

                const currentNode = document.getElementById(`${row}-${column}`);
                currentNode.classList.toggle('visited');

            }, 10)

        }
    }, [visitedNodes])

	const handleBFS = () => {
		let q = new Queue(queue.nodes);

        let copyNodes = JSON.parse(JSON.stringify(nodes))

        let finished = false;
        let visitedArray = []
		while (!q.isEmpty() && !finished) {
            let currentPath = q.dequeue();
            console.log(q);
            console.log(currentPath)
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
                let isBlocked = document.getElementById(`${node.row}-${node.column}`).classList.contains('blocked');
				if (!node.wasVisited && !node.isEnd && !isBlocked && !node.isStart) {
                    visitedArray.push({ row: node.row, column: node.column })
					copyNodes[node.row][node.column].wasVisited = true;
					q.enqueue([...currentPath, { row: node.row, column: node.column }]);
					continue;
				}
				if (node.isEnd) {
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
			handleBFS();
		}
	}, [queue]);

	useEffect(() => {
		if (finalPath && finished) {

            let nodeCopy = [...finalPath];
            nodeCopy.shift()

            let animation = setInterval(()=>{
                if(nodeCopy.length === 0){
                    clearInterval(animation);
                    setFinished(true);
                    return;
                }
                let nextNode = nodeCopy.shift();
                let row = nextNode.row;
                let column = nextNode.column;

                const currentNode = document.getElementById(`${row}-${column}`);
                currentNode.classList.toggle('visiting');
                currentNode.classList.toggle('visited');


            }, 100)

		}
	}, [finalPath, finished]);

	const handleClearSelected = () => {
        setFinished(false);
        initializeNodes();
        for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
                document.getElementById(`${row}-${column}`).className = "node";
            }
        }
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
				selectStartNode || selectEndNode ? 'selecting-node' : " "
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
