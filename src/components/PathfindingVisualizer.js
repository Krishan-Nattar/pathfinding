import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Queue, Stack } from './DataStructures';
import { Button, Select, Segment, Popup, Image, Modal, Header, Icon } from 'semantic-ui-react';

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
	
	const rowCount = 20;
	const columnCount = 25;

	useEffect(() => {
		if (visitedNodes) {
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
			}, 3);
		}
	}, [visitedNodes]);

	const handleDFS = () => {
		let q = new Stack(stack.nodes);

		let copyNodes = JSON.parse(JSON.stringify(nodes));

		let finished = false;
		let visitedArray = [];
		while (!q.isEmpty() && !finished) {
			let currentPath = q.pop();

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
				let thisNode = document.getElementById(`${node.row}-${node.column}`);
				if (!node.wasVisited && !thisNode.classList.contains('end-node') && !thisNode.classList.contains('blocked') && !thisNode.classList.contains('start-node')) {
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

	const handleBFS = () => {
		let q = new Queue(queue.nodes);

		let copyNodes = JSON.parse(JSON.stringify(nodes));

		let finished = false;
		let visitedArray = [];
		while (!q.isEmpty() && !finished) {
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
				let thisNode = document.getElementById(`${node.row}-${node.column}`);
					
				if (!node.wasVisited && !thisNode.classList.contains('end-node') && !thisNode.classList.contains('blocked') && !thisNode.classList.contains('start-node')) {
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
			handleBFS();
		}
	}, [queue]);

	useEffect(() => {
		if (stack) {
			handleDFS();
		}
	}, [stack]);

	useEffect(() => {
		if (finalPath && finished) {
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
			}, 100);
		}
	}, [finalPath, finished]);

	const removeNode = (title) =>{
		
		for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {

				let thisNode = document.getElementById(`${row}-${column}`);

				if(thisNode.classList.contains(`${title}-node`)){
					thisNode.classList.toggle(`${title}-node`)
				}
				
			}
		}
	}
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

	const handleSelectStartingNode = (e) => {
		setSelectStartNode(true);
		setSelectEndNode(false);
	};

	const handleSelectEndingNode = (e) => {
		setSelectStartNode(false);
		setSelectEndNode(true);
	};

	const handleSelectChange = (e) => {
		setSelected(e.target.textContent);
	};

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

		thisloop:
		for (let row = 0; row < rowCount; row++) {
			for (let column = 0; column < columnCount; column++) {
				if(document.getElementById(`${row}-${column}`).classList.contains('start-node')){
					beginningNode = nodes[row][column]
					break thisloop;
				}
			}
		}
		if (!beginningNode) {
			return;
		}

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

	const options = [
		{ key: 'bfs', text: 'Breadth First Search', value: 'Breadth First Search' },
		{ key: 'dfs', text: 'Depth First Search', value: 'Depth First Search' },
	];

	const [open, setOpen] = useState(true);
	const [open2, setOpen2] = useState(false);
	const [dimmer, setDimmer] = useState(false)


	const close = () =>{
		setOpen(false);
		setOpen2(false);
	}


	const nextModal = () =>	{
		setOpen(false);
		setOpen2(true);

	}
	return (
		<>
		
		<Modal dimmer={dimmer} open={open} onClose={close}>
          <Modal.Header>Welcome!</Modal.Header>
          <Modal.Content image>
            {/* <Image
              wrapped
              size='medium'
              src='/images/avatar/large/rachel.png'
            /> */}
            <Modal.Description>
              <Header>Welcome to my path visualization app!</Header>
              <p>
                If you want to jump right in, just click skip, otherwise click next for a walkthrough of how this works!
              </p>
              {/* <p>Is it okay to use this photo?</p> */}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={close}>
              Skip
            </Button>
            <Button
              positive
              icon='angle right'
              labelPosition='right'
              content="Next"
              onClick={nextModal}
            />
          </Modal.Actions>
        </Modal>

		<Modal dimmer={dimmer} open={open2} onClose={close}>
          <Modal.Header>What does this do?</Modal.Header>
          <Modal.Content image>
            {/* <Image
              wrapped
              size='medium'
              src='/images/avatar/large/rachel.png'
            /> */}
            <Modal.Description>
              <Header>Here is an explanation</Header>
			  <div className="node-arrows">
			  {/* <div> */}
				<Popup content='The search algorithm will start from this node.' trigger={<div className="node legend-start"></div>} />
				<Icon className="arrow right" color="purple" />
				<Icon className="arrow right"  color="purple" />
				<Icon className="arrow right"  color="purple" />
				<Icon className="arrow right" color="purple" />
				<Icon className="arrow right"  color="purple" />
				<Icon className="arrow right"  color="purple" />
				<Icon className="arrow right" color="purple" />
				<Icon className="arrow right"  color="purple" />
				<Icon className="arrow right"  color="purple" />

				<Popup content='This is the final destination the algorithm is looking for.' trigger={<div className="node legend-end"></div>} />


			  </div>
              <p>
                After you place a starting node and an ending node you get to visualize how a search algorithm finds its way between them!
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={close}>
              Skip
            </Button>
            <Button
              positive
              icon='angle right'
              labelPosition='right'
              content="Next"
              onClick={close}
            />
          </Modal.Actions>
        </Modal>
		<Segment className="legend">
				<div>
				<Popup content='The search algorithm will start from this node.' trigger={<div className="node legend-start"></div>} />
					
					<p>Starting Node</p>
				</div>
				<div>
				<Popup content='This is the final destination the algorithm is looking for.' trigger={<div className="node legend-end"></div>} />
					
					<p>Ending Node</p>
				</div>
				<div>
				<Popup content='Click anywhere to place walls and see what happens!' trigger={<div className="node legend-block"></div>} />
					
					<p>Walls</p>
				</div>
				<div>
				<Popup content='This is the final path discovered by the algorithm you chose.' trigger={<div className="node legend-path"></div>} />
					
					<p>Final Path</p>
				</div>
			</Segment>
		<div className="container">
			
			<Button color="red" onClick={handleClearSelected}>
				Clear Grid
			</Button>
			<Button
				color="orange"
				onClick={handleSelectStartingNode}
				className={`${selectStartNode ? 'disabled' : ''}`}>
				Place Starting Node
			</Button>
			<Button
				color="violet"
				onClick={handleSelectEndingNode}
				className={`${selectEndNode ? 'disabled' : ''}`}>
				Place Ending Node
			</Button>
			<Button color="green" onClick={handleStartAlgorithm}>
				Begin
			</Button>
			<Select
				compact
				options={options}
				defaultValue="Breadth First Search"
				onChange={handleSelectChange}
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
		</div>
		</>
	);
};

export default PathfindingVisualizer;
