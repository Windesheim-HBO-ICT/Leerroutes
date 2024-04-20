import React from 'react';
import Draggable from 'react-draggable';

const LeerrouteItem = ({ id, title }) => {
    return (
        <Draggable>
            <div style={itemStyles}>
                <h3>{title}</h3>
            </div>
        </Draggable>
    );
};

export default LeerrouteItem;

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
    justifyContent: 'center'
};
