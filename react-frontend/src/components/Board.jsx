import React from 'react';

const style = (width,height) => {
    const widthset = width + 'px';
    const heightset = height + 'px';
    return {
        width: widthset,
        height: heightset,
        border: '1px solid black',
        position: 'relative',
        margin: '25px auto',
        overflow: 'hidden',
        float: 'left',
        marginRight: '30px',
    };


};

export default ({ width,height, children }) => (
    <div style={style(width,height)}>
        {children}
    </div>
)