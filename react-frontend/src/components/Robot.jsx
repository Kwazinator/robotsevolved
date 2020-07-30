import React from 'react';
import {UP,DOWN,LEFT,RIGHT,SELECTED_ROBOT} from '../constants/constants';

import Draggable from 'react-draggable';

const styleoutside = ({dimension,position}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        top: position.top * dimension + 'px',
        left: position.left * dimension + 'px',
        transition: 'all 0.1s ease'
    };
};

const styleoutsidedraggable = ({dimension,position}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        transition: 'all 0.1s ease'
    };
};


const styleinside = ({dimension}) => {
    const dim = (dimension - 4) + 'px';
    return {
        width: dim,
        height: dim,
        position: 'absolute',
        top: 2 + 'px',
        left: 2 + 'px',
        transition: 'all 0.1s ease'
    };
};

const styleinside2 = ({dimension,color,index,selected}) => {
    const dim = ((dimension-4)*3)/4 + 'px';
    var selectedColor = undefined;
    var borderStyle = "none";
    if (index === selected) {
        selectedColor = SELECTED_ROBOT;
        borderStyle = "solid";
    }
    return {
        width: dim,
        height: dim,
        backgroundColor: color,
        borderStyle: borderStyle,
        borderColor: selectedColor,
        position: 'absolute',
        borderRadius: '50%',
        top: (dimension-4)/8 + 'px',
        left: (dimension-4)/8 + 'px',
        transition: 'all 0.1s ease'
    };
};


class Robot extends React.Component {

    handleClick = () => {
        this.props.onClick(this.props.index);
    };

    onStopDragHandler = (e, position) => {
        this.props.onStopDragHandler(position,this.props.index);
    }


    handleCreateMode = () => {
        if (this.props.isCreateMode === 'Yes' && this.props.buildMode) {
            return (
            <Draggable position={{x: this.props.position.left * this.props.dimension, y:this.props.position.top*this.props.dimension}} grid={this.props.draggableGrid} onStop={this.onStopDragHandler} bounds="parent">
                <div onTouchStart={this.handleClick} onMouseDown={this.handleClick} style={styleoutsidedraggable(this.props)}>
                    <div style={styleinside(this.props)}>
                        <div style={styleinside2(this.props)}/>
                    </div>
                </div>
            </Draggable>
            )
        }
        else {
            return(
            <div onTouchStart={this.handleClick} onMouseDown={this.handleClick} style={styleoutside(this.props)}>
                <div style={styleinside(this.props)}>
                    <div style={styleinside2(this.props)}/>
                </div>
            </div>
            )
        }


    }


    render () {
        return (
            this.handleCreateMode()
        );
    }
}

export default Robot;


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: grey; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: blue; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute; border-radius: 50%">
//      </div>
//  </div>
//</div>