import Robot from './Robot';
import React from 'react';

class RobotLogic extends Component {

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
    render() {
        const {size,position: {top,left}} = this.props;

        return (
            <div>
                <Robot


        )




    }




}