import React, {useState, useEffect} from 'react';
import './Node.css'


const Node = (props) => {
    const handleMouseDown = (e) =>{
        console.log(e.target);
        let node = e.target;
        node.classList.toggle('toggler')
        props.setMouseDown(true);
    }


    const handleDrag = e =>{
        if(props.mouseDown === true){
            console.log('dragging')
            let node = e.target;
            node.classList.toggle('toggler');
        }
    }
    return ( 
        <div className="node" onMouseDown={handleMouseDown} onMouseOver={handleDrag}>
            {/* Node */}
        </div>
     );
}
 
export default Node;