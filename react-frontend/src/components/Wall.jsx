import React from 'react';

const style = ({orientation,dimension,position,opacity, onClick, wallType,coloredSwitches}) => {
    const wallThickness = (dimension/4) + 'px';
    const wallOffset = (dimension/4)/2
    let backgroundColor = 'black';
    const width = orientation==='horizontal' ? dimension + 'px' : wallThickness;
    const height = orientation==='horizontal' ? wallThickness : dimension + 'px';
    const top = orientation==='horizontal' ? ((position.top * dimension) - wallOffset) + 'px' : position.top * dimension + 'px';
    const left = orientation==='horizontal' ? position.left * dimension + 'px' : ((position.left * dimension) - wallOffset) + 'px';
    if (wallType !== undefined) {
        let redOpac = 1;
        let blueOpac = 1;
        let greenOpac = 1;
        let yellowOpac = 1;
        coloredSwitches.map(switches => {
            if (switches.colorSignifier === 'brown') {
                redOpac = switches.isOn ? 1 : .2;
            }
            if (switches.colorSignifier === 'blue') {
                blueOpac = switches.isOn ? 1 : .2;
            }
            if (switches.colorSignifier === 'green') {
                greenOpac = switches.isOn ? 1 : .2;
            }
            if (switches.colorSignifier === 'purple') {
                yellowOpac = switches.isOn ? 1 : .2;
            }
        });
        if (wallType === 'brownPass') {
            opacity = redOpac;
            backgroundColor = '#465362';
        } else if (wallType === 'bluePass') {
            opacity = blueOpac;
            backgroundColor = '#003366';
        } else if (wallType === 'greenPass') {
            opacity = greenOpac;
            backgroundColor = '#003300';
        } else if (wallType === 'purplePass') {
            opacity = yellowOpac
            backgroundColor = '#660066'
        }
    }
    return {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: top,
        left: left,
        opacity: opacity,
        // borderRadius: "3px"
    };
};

class Wall extends React.Component {
    constructor(props) {
        super(props);
    }


    handleClick = () => {
        if (this.props.opacity === 1) {
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
