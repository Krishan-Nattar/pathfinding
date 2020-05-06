import React, {useState, useEffect} from 'react';
import Node from './Node/Node';


const PathfindingVisualizer = () => {

    const [nodes, setNodes] = useState([])

    useEffect(()=>{
        console.log('hi')
        const nodes = []
        for(let i = 0; i < 15; i++){
            const currentRow = [];
            for(let j = 0; j < 50; j++){
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
    },[]);

    return ( 
        <div>
            PathfindingVisualizer
            <Node />
        </div>
     );
}
 
export default PathfindingVisualizer;