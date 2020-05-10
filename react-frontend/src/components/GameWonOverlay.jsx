import React from "react";

const mainStyle = (width,height,visible) => {
    var display = 'block';
    if (visible === false) {
        display = 'none';
    }
    const widthset = width + 'px';
    const heightset = height + 'px';
    return {
        display: display,
        width: widthset,
        height: heightset,
        position: 'relative',
        overflow: 'hidden',
        float: 'left',
        marginRight: '30px',
        margin: 'auto',
    };
};

const normalStyle = (width,height) => {
    const widthset = width + 'px';
    const heightset = height + 'px';
    return {
        display: 'flex',
        width: widthset,
        height: heightset,
        position: 'absolute',
        overflow: 'hidden',
        float: 'center',
        marginRight: '30px',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    };
};

const opacityStyle = (width,height) => {
    const widthset = width + 'px';
    const heightset = height + 'px';
    return {
        backgroundColor: 'black',
        opacity: 0.5,
        width: widthset,
        height: heightset,
        position: 'absolute',
        overflow: 'hidden',
        float: 'left',
        marginRight: '30px',
        margin: 'auto',
    };
};

export default ({ width,height,visible,children }) => (
    <div style={mainStyle(width, height,visible)}>
        <div style={opacityStyle(width,height)}></div>
        <div style={normalStyle(width, height)}>
            {children}
        </div>
    </div>
)