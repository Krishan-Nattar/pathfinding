import React, {useState, useEffect} from 'react';

import {
	Button,
	Popup,
	Image,
	Modal,
	Header,
	Icon,
} from 'semantic-ui-react';

const Modals = () => {
    const [open, setOpen] = useState(true);
	const [open2, setOpen2] = useState(false);

	const close = () => {
		setOpen(false);
		setOpen2(false);
	};

	const nextModal = () => {
		setOpen(false);
		setOpen2(true);
    };
    
    return ( 
        <>
    <Modal dimmer={false} open={open} onClose={close}>
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

			<Modal dimmer={false} open={open2} onClose={close}>
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
						<p>
							After you place a starting node and an ending node you get to
							visualize how a search algorithm finds its way between them!
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
						onClick={close}
					/>
				</Modal.Actions>
			</Modal>

        </>
     );
}
 
export default Modals;