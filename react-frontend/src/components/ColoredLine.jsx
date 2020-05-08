import React from 'react';
import {UP,DOWN,LEFT,RIGHT} from '../constants/constants';

const style = ({dir, position, endPosition, color}) => {
    var width = 0;
    var height = 0;
    var top = 0;
    var left = 0;
    if (position !== undefined && endPosition !== undefined) {
        if (dir === LEFT) {
            top = endPosition.top;
            left = endPosition.left;
            width = position.left - endPosition.left + 'px';
            height = '4px';
        } else if (dir === RIGHT) {
            top = position.top;
            left = position.left;
            width = endPosition.left - position.left + 'px';
            height = '4px';
        } else if (dir === UP) {
            top = endPosition.top;
            left = endPosition.left;
            width = '4px';
            height = position.top - endPosition.top + 'px';
        } else {
            top = position.top;
            left = position.left;
            width = '4px';
            height = endPosition.top - position.top + 'px'
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