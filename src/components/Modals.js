import React, { useState, useEffect } from 'react';

import { Button, Popup, Image, Modal, Header, Icon } from 'semantic-ui-react';

const Modals = () => {
	const [open, setOpen] = useState(true);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
	const [open4, setOpen4] = useState(false);

	const close = () => {
		setOpen(false);
		setOpen2(false);
		setOpen3(false);
		setOpen4(false);
	};

	const nextModal = () => {
		setOpen(false);
		setOpen2(true);
	};
	const nextModal2 = () => {
		// setOpen(false);
		setOpen2(false);
		setOpen3(true);
	};

	const nextModal3 = () => {
		// setOpen(false);
		setOpen3(false);
		setOpen4(true);
	};

	return (
		<>
			<Modal dimmer={true} open={open} onClose={close}>
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
							If you want to jump right in, just click skip, otherwise click
							next for a walkthrough of how this works!
						</p>
						{/* <p>Is it okay to use this photo?</p> */}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={close}>
						Skip
					</Button>
					<Button
						positive
						icon="angle right"
						labelPosition="right"
						content="Next"
						onClick={nextModal}
					/>
				</Modal.Actions>
			</Modal>

{/* second modal */}
			<Modal dimmer={true} open={open2} onClose={close}>
				<Modal.Header>What does this do?</Modal.Header>
				<Modal.Content image>
					<Image
              wrapped
              size='medium'
              src='/modal1.PNG'
            />
					<Modal.Description>
						{/* <Header>Here is an explanation</Header> */}
						<br />
						<div className="node-arrows">
							{/* <div> */}
							<Popup
								content="The search algorithm will start from this node."
								trigger={<div className="node legend-start"></div>}
							/>
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />

							<Popup
								content="This is the final destination the algorithm is looking for."
								trigger={<div className="node legend-end"></div>}
							/>
						</div>
						<br />
						<p>
							After you place a starting node and an ending node you get to
							see a visualization of how a search algorithm finds its way between them!
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={close}>
						Skip
					</Button>
					<Button
						positive
						icon="angle right"
						labelPosition="right"
						content="Next"
						onClick={nextModal2}
					/>
				</Modal.Actions>
			</Modal>
			{/* Third Modal */}
			<Modal dimmer={true} open={open3} onClose={close}>
				<Modal.Header>Placing Walls</Modal.Header>
				<Modal.Content image>
					<Image
              wrapped
              size='medium'
              src='/modal2.PNG'
            />
					<Modal.Description>
						{/* <Header>Here is an explanation</Header> */}
						<br />
						<div className="node-arrows">
							{/* <div> */}
							<Popup
								content="The search algorithm will start from this node."
								trigger={<div className="node legend-start"></div>}
							/>
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block row-one-block"></div>}
							/>
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block"></div>}
							/>
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block"></div>}
							/>
							<Icon className="arrow right row-one-arrows" color="purple" />
							{/* <Icon className="arrow right" color="purple" /> */}

							<Popup
								content="This is the final destination the algorithm is looking for."
								trigger={<div className="node legend-end"></div>}
							/>
						</div>
						<div className="node-arrows row-two" >
						
							<Icon className="arrow down" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
						
							<Icon className="arrow up" color="purple" />
						
						</div>
						<br />
						<p>
							Click/drag to add walls and watch how the algorithm navigates around them
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={close}>
						Skip
					</Button>
					<Button
						positive
						icon="angle right"
						labelPosition="right"
						content="Next"
						onClick={nextModal3}
					/>
				</Modal.Actions>
			</Modal>

			{/* Modal 4 */}
			<Modal dimmer={true} open={open4} onClose={close}>
				<Modal.Header>Choose an algorithm</Modal.Header>
				<Modal.Content image>
					{/* <Image
              wrapped
              size='medium'
              src='/modal2.PNG'
            /> */}
					<Modal.Description>
						{/* <Header>Here is an explanation</Header> */}
						{/* <br /> */}
						{/* <div className="node-arrows"> */}
							{/* <div> */}
							{/* <Popup
								content="The search algorithm will start from this node."
								trigger={<div className="node legend-start"></div>}
							/>
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block row-one-block"></div>}
							/>
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block"></div>}
							/>
							<Popup
								content="Click anywhere to place walls and see what happens!"
								trigger={<div className="node legend-block"></div>}
							/>
							<Icon className="arrow right row-one-arrows" color="purple" /> */}
							{/* <Icon className="arrow right" color="purple" /> */}

							{/* <Popup
								content="This is the final destination the algorithm is looking for."
								trigger={<div className="node legend-end"></div>}
							/>
						</div>
						<div className="node-arrows row-two" >
						
							<Icon className="arrow down" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
							<Icon className="arrow right" color="purple" />
						
							<Icon className="arrow up" color="purple" />
						
						</div> */}
						{/* <br /> */}
						<p>
							Click the dropdown menu and choose between Breadth First Search and Depth First Search. Click begin and watch what happens!
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" onClick={close}>
						Let's Go!
					</Button>
					{/* <Button
						positive
						icon="angle right"
						labelPosition="right"
						content="Next"
						onClick={nextModal4}
					/> */}
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default Modals;
