import React from 'react';

const style = ({orientation,dimension,position}) => {
    const wallThickness = (dimension/4) + 'px';


    if (orientation=='horizontal') {
        var width = dimension + 'px';
        var height = wallThickness;
        var top = ((position.top * dimension) - 4) + 'px';
        var left = position.left * dimension + 'px';
    }
    else {
        var width = wallThickness;
        var height = dimension + 'px'
        var top = position.top * dimension + 'px';
        var left = ((position.left * dimension) - 4) + 'px';
    }
    return {
        width: width,
        height: height,
        backgroundColor: 'black',
        position: 'absolute',
        top: top,
        left: left,
        transition: 'all 0.1s ease',
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