import React from 'react';
import LeerrouteItem from './LeerrouteItem';

const LeerrouteWorkspace = ({ items }) => {
    return (
        <div style={workspaceStyles}>
            {items.map((item) => (
                <LeerrouteItem key={item.id} id={item.id} title={item.title} />
            ))}
        </div>
    );
};

export default LeerrouteWorkspace;

const workspaceStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};