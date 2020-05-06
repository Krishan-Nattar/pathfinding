import React, {useState, useEffect} from 'react';
import './Node.css'


const Node = () => {
    const handleNodeClick = (e) =>{
        console.log(e.target);
        let node = e.target;
        node.classList.toggle('toggler')
    }
    const handleDrag = e =>{
        console.log('dragging')
    }
    return ( 
        <div className="node" onClick={handleNodeClick} >
            {/* Node */}
        </div>
     );
}
 
export default Node;