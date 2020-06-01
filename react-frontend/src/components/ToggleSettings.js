import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
    };


    render() {
        return (
            <div style={buttonpanel()}>
                <FormControlLabel
                    value="end"
                    control={<Switch color="primary" onChange={this.handleClick}/>}
                    label="Toggle Line Indicators"
                    labelPlacement="end"
                />
            </div>
        )
    }
}

export default ToggleSettings;