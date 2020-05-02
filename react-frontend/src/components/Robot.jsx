import React from 'react';
import {UP,DOWN,LEFT,RIGHT,SQUARE_OUTSIDE_COLOR,SQUARE_INNER_COLOR,SQUARE_CORE_COLOR} from '../constants/constants';

const styleoutside = ({dimension,position,color}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: SQUARE_OUTSIDE_COLOR,
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
        transition: 'all 0.1s ease'
    };
};

const styleinside = ({dimension,position,color}) => {
    const dim = (dimension - 4) + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: SQUARE_INNER_COLOR,
        position: 'absolute',
        top: 2 + 'px',
        left: 2 + 'px',
        transition: 'all 0.1s ease'
    };
};

const styleinside2 = ({dimension,position,color}) => {
    const dim = (dimension-4)-8 + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: color,
        position: 'absolute',
        borderRadius: '50%',
        top: 4 + 'px',
        left: 4 + 'px',
        transition: 'all 0.1s ease'
    };
};


class Robot extends React.Component {

    handleKeyDown = (e) => {
        let newDirection;

        switch(e.keyCode) {
            case 37:
                newDirection = { top: 0, left: -40, dir: LEFT};
                break;
            case 38:
                newDirection = { top: -40, left: 0, dir: UP};
                break;
            case 39:
                newDirection = { top: 0, left: 40, dir: RIGHT};
                break;
            case 40:
                newDirection = { top: 40, left: 0, dir: DOWN};
                break;
            default:
                return;


        }
        this.props.handlePlayerMovement(newDirection);
    }

    handleClick = () => {
        this.props.onClick(this.props.index);
    }

    render () {
        return (
            <div onClick={this.handleClick} style={styleoutside(this.props)}>
                <div style={styleinside(this.props)}>
                    <div style={styleinside2(this.props)}/>
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }
}

export default Robot;


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: grey; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: blue; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute; border-radius: 50%">
//      </div>
//  </div>
//</div>