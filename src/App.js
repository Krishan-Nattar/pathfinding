import React, {useState} from 'react';
import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer';

function App() {

  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseUp = e =>{
    setMouseDown(false);
  }

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <PathfindingVisualizer mouseDown={mouseDown} setMouseDown={setMouseDown}/>
    </div>
  );
}

export default App;
