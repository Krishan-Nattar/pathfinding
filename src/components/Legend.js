import React from 'react';
import { Segment, Popup } from 'semantic-ui-react';

const Legend = () => {
	return (
		<Segment className="legend">
			<div>
				<Popup
					content="The search algorithm will start from this node."
					trigger={<div className="node legend-start"></div>}
				/>

				<p>Starting Node</p>
			</div>
			<div>
				<Popup
					content="This is the final destination the algorithm is looking for."
					trigger={<div className="node legend-end"></div>}
				/>

				<p>Ending Node</p>
			</div>
			<div>
				<Popup
					content="Click anywhere to place walls and see what happens!"
					trigger={<div className="node legend-block"></div>}
				/>

				<p>Walls</p>
			</div>
			<div>
				<Popup
					content="This is the final path discovered by the algorithm you chose."
					trigger={<div className="node legend-path"></div>}
				/>

				<p>Final Path</p>
			</div>
		</Segment>
	);
};

export default Legend;
