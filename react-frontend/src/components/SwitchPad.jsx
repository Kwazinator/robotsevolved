import React from 'react';
import {SQUARE_OUTSIDE_COLOR,
        COLORED_SWITCHPAD_IMAGE,
        SQUARE_INNER_COLOR,
        SQUARE_CORE_COLOR,
        GOAL_IMAGE,
        ROBOT_GREEN,
        ROBOT_BLUE,
        ROBOT_RED,
        ROBOT_YELLOW,
        COLORED_GOAL_IMAGE,
        COLORED_SWITCH_BLUE,
        COLORED_SWITCH_PURPLE,
        COLORED_SWITCH_GREEN,
        COLORED_SWITCH_BROWN,
        COLORED_SWITCH_BROWN_ON,
        COLORED_SWITCH_BROWN_OFF,
        COLORED_SWITCH_PURPLE_ON,
        COLORED_SWITCH_PURPLE_OFF
} from '../constants/constants';
import Draggable from 'react-draggable';


const style = ({dimension,position,color}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        top: position.top * dimension + 'px',
        left: position.left * dimension + 'px',
        userSelect: 'none',
        backgroundColor: 'transparent',
    };
};

const styledragable = ({dimension,position,color}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        userSelect: 'none',
        backgroundColor: 'transparent'
    };
};



export default function Goal(props) {
    if (props.position == null) {
        return null
    }
    var image = COLORED_SWITCH_BLUE;
    if (props.position.colorSignifier === 'brown') {
        image = props.isOn ? COLORED_SWITCH_BROWN_ON : COLORED_SWITCH_BROWN_OFF
    } else if (props.position.colorSignifier === 'purple') {
        image = props.isOn ? COLORED_SWITCH_PURPLE_ON : COLORED_SWITCH_PURPLE_OFF
    } else if (props.position.colorSignifier === 'green') {
        image = COLORED_SWITCH_GREEN;
    } else if (props.position.colorSignifier === 'blue') {
        image = COLORED_SWITCH_BLUE;
    }
    return(<img src={image} style={style(props)}/>)
}


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>