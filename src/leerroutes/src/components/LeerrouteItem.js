import React from 'react';
import Draggable from 'react-draggable';

//x,y is 0,0 based on where it is placed and not on parent component.
//We should be able to fix with <DraggableCore>
const LeerrouteItem = ({ id, title, onDrag, index }) => {
    const handleDrag = (e, ui) => {
        onDrag({ id, x: ui.x, y: ui.y+(index * 150) }); 
    };

    return (
        <Draggable onDrag={handleDrag}>
            <div style={itemStyles}>
                <h3>{title}</h3>
            </div>
        </Draggable>
    );
};

const itemStyles = {
    width: '100px',
    height: '100px',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    border: '1px solid #ccc',
    borderRadius: '50%',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default LeerrouteItem;
