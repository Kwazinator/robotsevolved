import React from 'react';
import {SQUARE_OUTSIDE_COLOR,SQUARE_INNER_COLOR,SQUARE_CORE_COLOR} from '../constants/constants';


const styleoutside = ({dimension,position}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: SQUARE_OUTSIDE_COLOR,
        position: 'absolute',
        top: position.top * dimension + 'px',
        left: position.left * dimension + 'px',
    };
};

const styleinside = ({dimension,position}) => {
    const dim = (dimension - 4) + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: SQUARE_INNER_COLOR,
        position: 'absolute',
        top: 2 + 'px',
        left: 2 + 'px',
    };
};

const styleinside2 = ({dimension,position}) => {
    const dim = (dimension-4)/2 + 'px';
    return {
        width: dim,
        height: dim,
        backgroundColor: SQUARE_CORE_COLOR,
        position: 'absolute',
        top: (dimension-4)/4 + 'px',
        left: (dimension-4)/4 + 'px',
    };
};

class Square extends React.Component {

    handleClick = () => {
        this.props.handlePlayerMovementFromMouse(this.props.position);
    };

    render() {
        return (
            <div onClick={this.handleClick} style={styleoutside(this.props)}>
                <div style={styleinside(this.props)}>
                    <div style={styleinside2(this.props)}/>
                </div>
            </div>
        )
    }
}
export default Square;


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>