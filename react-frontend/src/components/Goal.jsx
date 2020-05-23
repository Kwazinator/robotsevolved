import React from 'react';
import {SQUARE_OUTSIDE_COLOR,SQUARE_INNER_COLOR,SQUARE_CORE_COLOR,GOAL_IMAGE} from '../constants/constants';


const style = ({dimension,position}) => {
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

export default (props) =>
    <img src={GOAL_IMAGE} style={style(props)}/>


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>