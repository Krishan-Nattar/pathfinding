import React, { useState } from 'react';
import './App.css';
import Pathfinder from './components/Pathfinder';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from './components/Game';

function App() {
	const [mouseDown, setMouseDown] = useState(false);
	const handleMouseUp = (e) => {
		setMouseDown(false);
	};

	return (
		<Router>
			<div className="App" onMouseUp={handleMouseUp}>
				<nav>
					<ul>
						<li>
							<Link to="/">Algorithms</Link>
						</li>
						<li>
							<Link to="/game">Game</Link>
						</li>
					</ul>
				</nav>
				<Route path="/game">
					<Game  mouseDown={mouseDown} setMouseDown={setMouseDown} />
				</Route>
				<Route exact path="/">
					<Pathfinder mouseDown={mouseDown} setMouseDown={setMouseDown} />
				</Route>
			</div>
		</Router>
	);
}

export default App;
