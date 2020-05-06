import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import {Queue} from './Queue';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = (props) => {
	const [nodes, setNodes] = useState([]);
	const [selectStartNode, setSelectStartNode] = useState(false);
    const [selectEndNode, setSelectEndNode] = useState(false);
    const rowCount = 10;
    const columnCount = 20;

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

    const handleStartAlgorithm = () =>{

        let beginningNode;
        outerloop:
        for(const row of nodes){
            for(const node of row){
                if(node.isStart){
                    beginningNode = node;
                    break outerloop;

                }
            }
        }

        let q = new Queue();
        // let currentNode = {
        //     row: beginningNode.row,
        //     column: beginningNode.column
        // }

        q.enqueue([{
            row: beginningNode.row,
            column: beginningNode.column
        }])

        // console.log(q);
        let finished = false;
        // let found = false;
        let copyNodes = [...nodes]
        while(!q.isEmpty() && !finished){
            let currentPath = q.dequeue();
            let currentNode = currentPath[currentPath.length-1]
            let rowNumber = currentNode.row;
            let colNumber = currentNode.column;
            let checkNodes = []
            if(rowNumber > 0){
                checkNodes.push(copyNodes[rowNumber-1][colNumber])
            }
            if(colNumber > 0){
                checkNodes.push(copyNodes[rowNumber][colNumber-1])
            }

            if(rowNumber < rowCount-1){
                checkNodes.push(copyNodes[rowNumber+1][colNumber])
            }
            if(colNumber < columnCount-1){
                checkNodes.push(copyNodes[rowNumber][colNumber+1])
            }
            let finishedList = []

            for(const node of checkNodes){

                
                if(!node.wasVisited && !node.isEnd){
                    copyNodes[node.row][node.column].wasVisited = true;
                    // currentPath.push({row: node.row, column: node.column})
                    q.enqueue([...currentPath, {row: node.row, column: node.column}]);
                    continue;
                }
                if(node.isEnd){
                    // console.log('here');
                    // finishedList.push()
                    console.log(currentPath)
                    console.log(node);
                    finished = true;
                    break;
                }
            }
            setNodes(copyNodes);
        }


    }
    


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
