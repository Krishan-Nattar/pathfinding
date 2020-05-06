import React, {useState, useEffect} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';


const PathfindingVisualizer = (props) => {

    const [nodes, setNodes] = useState([])

    const handleClearSelected = () =>{
        const nodeList = document.querySelectorAll('.node');
        for(const node of nodeList)
        if (node.classList.contains('toggler')){
            node.classList.toggle('toggler')
        }
    }

    const handleSelectStartingNode = e =>{
        console.log('hi')
    }
    

    useEffect(()=>{
        console.log('hi')
        const nodes = []
        for(let i = 0; i < 10; i++){
            const currentRow = [];
            for(let j = 0; j < 20; j++){
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        setNodes(nodes);
    },[]);

    return ( 

        <div className="grid">
            {nodes.map((row, rowIndex)=>{
                return (
                <div key = {rowIndex} className="row">
                    {row.map((node, nodeIndex)=>{
                        return <Node key={nodeIndex} mouseDown={props.mouseDown} setMouseDown={props.setMouseDown} />
                    })}
                </div>
                )
            })}
            <button onClick={handleClearSelected}>Clear Selected</button>
            <button onClick={handleSelectStartingNode}>Select Starting Node</button>
        </div>
     );
}
 
export default PathfindingVisualizer;