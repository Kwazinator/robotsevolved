import React from 'react';

const style = (width,height) => {
    const widthset = width + 'px';
    const heightset = height + 'px';
    return {
        width: widthset,
        height: heightset,
        border: '1px solid black',
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden'
    };
};

export default ({ width,height, children }) => (
    <div style={style(width,height)}>
        {children}
    </div>
)