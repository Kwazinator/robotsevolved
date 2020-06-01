import React from 'react';
import {UP,DOWN,LEFT,RIGHT} from '../constants/constants';

const style = ({dimension, dir, position, endPosition, color}) => {
    var width = 0;
    var height = 0;
    var top = 0;
    var left = 0;
    if (position !== undefined && endPosition !== undefined) {
        if (dir === LEFT) {
            top = endPosition.top*dimension;
            left = endPosition.left*dimension;
            width = (position.left*dimension) - (endPosition.left*dimension) + 'px';
            height = '4px';
        } else if (dir === RIGHT) {
            top = position.top*dimension;
            left = position.left*dimension;
            width = (endPosition.left*dimension) - (position.left*dimension) + 'px';
            height = '4px';
        } else if (dir === UP) {
            top = endPosition.top*dimension;
            left = endPosition.left*dimension;
            width = '4px';
            height = (position.top*dimension) - (endPosition.top*dimension) + 'px';
        } else {
            top = position.top*dimension;
            left = position.left*dimension;
            width = '4px';
            height = (endPosition.top*dimension) - (position.top*dimension) + 'px'
        }
    }
    top+=18;
    left+=18;

    return {
        width: width,
        height: height,
        backgroundColor: color,
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        transition: 'all 0.1s ease',
    };
};

export default (props) => (
    <div style={style(props)}/>
);