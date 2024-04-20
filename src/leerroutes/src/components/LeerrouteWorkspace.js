import React, { useState } from 'react';
import LeerrouteItem from './LeerrouteItem';

const LeerrouteWorkspace = ({ items }) => {
    const [itemPositions, setItemPositions] = useState({});

    const handleDrag = (id, position) => {
        const updatedItemPositions = { ...itemPositions, [id]: position };
        setItemPositions(updatedItemPositions);
    };

    return (
        <div style={workspaceStyles}>
            {/* Render items */}
            <div style={{ position: 'absolute', zIndex: 1, height: '100%', width: '100%' }}>
                {items.map((item, index) => (
                    <LeerrouteItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        onDrag={(position) => handleDrag(item.id, position)}
                        index={index}
                    />
                ))}
            </div>

            {/* Draw lines using SVG (background layer) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {items.map((item, index) => (
                    item.relatedItemIds.map((relatedId) => (
                        <line
                            key={`${item.id}-${relatedId}`}
                            x1={itemPositions[item.id]?.x+50 || 0}
                            y1={itemPositions[item.id]?.y+50 || 0}
                            x2={itemPositions[relatedId]?.x+50 || 0}
                            y2={itemPositions[relatedId]?.y+50 || 0}
                            style={{ stroke: '#ff0000', strokeWidth: 2 }}
                        />
                    ))
                ))}
            </svg>
        </div>
    );
};

const workspaceStyles = {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%'
};

export default LeerrouteWorkspace;
