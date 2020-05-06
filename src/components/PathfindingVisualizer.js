import React, {useState, useEffect} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';


const PathfindingVisualizer = (props) => {

    const [nodes, setNodes] = useState([])
    

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
            {/* PathfindingVisualizer */}
            {nodes.map((row, rowIndex)=>{
                return (
                <div key = {rowIndex} className="row">
                    {row.map((node, nodeIndex)=>{
                        return <Node key={nodeIndex} mouseDown={props.mouseDown} setMouseDown={props.setMouseDown} />
                    })}
                </div>
                )
            })}
            {/* <Node /> */}
        </div>
     );
}
 
export default PathfindingVisualizer;