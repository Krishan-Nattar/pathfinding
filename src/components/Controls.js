import React from 'react';
import { Button, Select } from 'semantic-ui-react';

// const myFunction = (param1, param2) =>{
// 	this.something();
// 	console.log(param1)
// }

// let myObj = {
// 	something: function(){
// 		console.log('hi')
// 	}
// }

// myFunction.bind(myObj, "hello")


// myFunction('param2')
const Controls = (props) => {
	// Search options for dropdown menu
	const options = [
		{ key: 'bfs', text: 'Breadth First Search', value: 'Breadth First Search' },
		{ key: 'dfs', text: 'Depth First Search', value: 'Depth First Search' },
	];

	return (
		<div className="container">
			<Button color="red" onClick={props.handleClearSelected}>
				Clear Grid
			</Button>
			<Button
				color="orange"
				onClick={props.handleSelectStartingNode}
				className={`${props.selectStartNode ? 'disabled' : ''}`}>
				Place Starting Node
			</Button>
			<Button
				color="violet"
				onClick={props.handleSelectEndingNode}
				className={`${props.selectEndNode ? 'disabled' : ''}`}>
				Place Ending Node
			</Button>
			<Button color="blue" onClick={props.handleStartAlgorithm}>
				Begin
			</Button>
			<Select
				compact
				options={options}
				defaultValue="Breadth First Search"
				onChange={props.handleSelectChange}
			/>
		</div>
	);
};

export default Controls;
