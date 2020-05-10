import React, {useState} from 'react';
import './App.css';
import Pathfinder from './components/Pathfinder';

function App() {

  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseUp = e =>{
    setMouseDown(false);
  }

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <Pathfinder mouseDown={mouseDown} setMouseDown={setMouseDown}/>
    </div>
  );
}

export default App;
