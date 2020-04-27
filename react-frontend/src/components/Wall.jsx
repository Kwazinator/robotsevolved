import React from 'react';

const style = ({orientation,dimension,position}) => {
    if (orientation=='horizontal') {
        var width = dimension + 'px';
        var height = '8px';
    }
    else {
        var width = '8px';
        var height = dimension + 'px'
    }
    return {
        width: width,
        height: height,
        backgroundColor: 'black',
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
        transition: 'all 0.1s ease'
    };
};

export default (props) =>
    <div style={style(props)}/>


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>