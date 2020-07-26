import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const buttonpanel = () => {
    return {
        float: 'left',
    };
}

class ToggleSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = event => {
        this.props.onClick();
    };


    render() {
        console.log(this.props.showColoredLineDirections)
        return (
            <div style={buttonpanel()}>
                <FormControlLabel
                    value="end"
                    control={<Switch color="primary" onChange={this.handleClick}/>}
                    label="Path Indicators"
                    checked={this.props.showColoredLineDirections}
                />
            </div>
        )
    }
}

export default ToggleSettings;