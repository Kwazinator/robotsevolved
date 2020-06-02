import React from 'react';

const style = ({orientation,dimension,position,opacity,onClick}) => {
    const wallThickness = (dimension/4) + 'px';
    const wallOffset = (dimension/4)/2
    if (orientation=='horizontal') {
        var width = dimension + 'px';
        var height = wallThickness;
        var top = ((position.top * dimension) - wallOffset) + 'px';
        var left = position.left * dimension + 'px';
    }
    else {
        var width = wallThickness;
        var height = dimension + 'px'
        var top = position.top * dimension + 'px';
        var left = ((position.left * dimension) - wallOffset) + 'px';
    }
    return {
        width: width,
        height: height,
        backgroundColor: 'black',
        position: 'absolute',
        top: top,
        left: left,
        opacity: opacity,
    };
};

class Wall extends React.Component {
    constructor(props) {
        super(props);
    }


    handleClick = () => {
        if (this.props.opacity == 1) {
            this.props.onClick(0,this.props.orientation,this.props.position.top,this.props.position.left);
        }
        else {
            this.props.onClick(1,this.props.orientation,this.props.position.top,this.props.position.left);
        }
    }
    render () {
        return (
            <div style={style(this.props)} onClick={this.handleClick}/>
        )
    }
}

export default Wall;


//<div style="background-Color: black;width: 40px;height: 40px; position: absolute;">
//  <div style="background-Color: white; width: 36px; height: 36px; top: 2px; left: 2px;position: absolute;">
//      <div style="background-Color: grey; width: 18px; height: 18px; top: 9px; left: 9px;position: absolute;">
//      </div>
//  </div>
//</div>