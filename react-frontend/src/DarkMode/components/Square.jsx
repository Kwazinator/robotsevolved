import React from 'react';
import {SQUARE_OUTSIDE_COLOR,SQUARE_INNER_COLOR,SQUARE_CORE_COLOR} from '../constants/constants';


const styleoutside = ({dimension,position}) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        backgroundImage: '/static/images/background-space.jpg',
        boxShadow: '0 0 0 0.5pt ' + SQUARE_OUTSIDE_COLOR,
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
        backgroundImage: '/static/images/background-space.jpg',
        position: 'absolute',
        top: 2 + 'px',
        left: 2 + 'px',
    };
};

class Square extends React.Component {

    render() {
        return (
            <div style={styleoutside(this.props)}>
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