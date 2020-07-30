import React from 'react';
import {UP,DOWN,LEFT,RIGHT} from '../constants/constants';

const style = ({buildMode,show,dimension, dir, position, endPosition, color}) => {
    var width = 0;
    var height = 0;
    var top = 0;
    var left = 0;
    if (position !== undefined && endPosition !== undefined) {
        if (dir === LEFT) {
            top = endPosition.top*dimension;
            left = endPosition.left*dimension;
            width = (position.left*dimension) - (endPosition.left*dimension) + 'px';
            height = dimension + 'px';
        } else if (dir === RIGHT) {
            top = position.top*dimension;
            left = position.left*dimension + dimension;
            width = (endPosition.left*dimension) - (position.left*dimension) + 'px';
            height = dimension + 'px';
        } else if (dir === UP) {
            top = endPosition.top*dimension;
            left = endPosition.left*dimension;
            width = dimension + 'px';
            height = (position.top*dimension) - (endPosition.top*dimension) + 'px';
        } else {
            top = position.top*dimension + dimension;
            left = position.left*dimension;
            width = dimension + 'px';
            height = (endPosition.top*dimension) - (position.top*dimension) + 'px'
        }
    }
    return {
        width: width,
        height: height,
        backgroundColor: color,
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        opacity: show ? '0.5' : '0.0',
        transition: 'all 0.1s ease',
    };
};



export default (props) => {
    const handleClick = () => {
        props.handleClick(props.dir)
    }
    if (props.buildMode === 'undefined' || !props.buildMode)
    {
        return (
            <div onClick={handleClick} style={style(props)}/>
        );
    }
    else {
        return null
    }
}