import React from 'react';
import { Button, Select } from 'semantic-ui-react';

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
				style={{backgroundColor:'lightsalmon', color:'white'}}
				onClick={props.handleSelectStartingNode}
				className={`${props.selectStartNode ? 'disabled' : ''}`}>
				Place Starting Node
			</Button>

			<Button color="blue" onClick={props.handleStartAlgorithm}>
				Begin
			</Button>

            <br />
            <Button color="green" onClick={props.handleDirection.bind(null,'w')}>
				Up ("w")
			</Button>
            <Button color="green" onClick={props.handleDirection.bind(null,'s')}>
				Down ("s")
			</Button>
            <Button color="green" onClick={props.handleDirection.bind(null,'a')}>
				Left ("a")
			</Button>
            <Button color="green" onClick={props.handleDirection.bind(null,'d')}>
				Right ("d")
			</Button>

		</div>
	);
};

export default Controls;
