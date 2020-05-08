import React from 'react';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}

class ToggleSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = event => {
        this.props.onClick();
    }


    render() {
        return (
            <div style={buttonpanel()}>Toggle Line Indicators:
                <label class="switch">
                    <input id={"toggleLineIndicators"} onClick={this.handleClick} type="checkbox" class="real-checkbox"></input>
                    <span class="slider round"></span>
                </label>
            </div>
        )
    }
}

export default ToggleSettings;