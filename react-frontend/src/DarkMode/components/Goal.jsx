import React from 'react';
import {SQUARE_OUTSIDE_COLOR,SQUARE_INNER_COLOR,SQUARE_CORE_COLOR,GOAL_IMAGE,ROBOT_GREEN,ROBOT_BLUE,ROBOT_RED,ROBOT_YELLOW,COLORED_GOAL_IMAGE} from '../constants/constants';
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
        backgroundColor: color,
    };
};

const styledragable = ({dimension,position,color}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        userSelect: 'none',
        backgroundColor: color
    };
};



export default function Goal(props) {
    if (props.position == null) {
        return null
    }
    if (props.isCreateMode === 'Yes'  && props.buildMode) {
        const onStopDragHandler = (e, position) => {
            props.onStopDragHandler(position,props.color);
        }
        if (props.color == undefined) {
            return(
            <Draggable position={{x:props.position.left * props.dimension,y: props.position.top * props.dimension}} bounds="parent" grid={props.draggableGrid} onStop={onStopDragHandler}>
                <img src={GOAL_IMAGE} style={styledragable(props)}/>
            </Draggable>
            )
        }
        else {
            return(
            <Draggable position={{x:props.position.left * props.dimension,y: props.position.top * props.dimension}} bounds="parent" grid={props.draggableGrid} onStop={onStopDragHandler}>
                <img src={COLORED_GOAL_IMAGE} style={styledragable(props)}/>
            </Draggable>
            )
        }
    }
    else {
        if (props.color == undefined) {
            return(<img src={GOAL_IMAGE} style={style(props)}/>)
        }
        else {
            return(<img src={COLORED_GOAL_IMAGE} style={style(props)}/>)
        }
    }
}


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>