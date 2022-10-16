import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

export default function CreateBoardSwitchSelector(props) {

    const handleBlueClick = () => {
        props.handleColoredClick('blue');
    }
    const handlePurpleClick = () => {
        props.handleColoredClick('purple');
    }
    const handleGreenClick = () => {
        props.handleColoredClick('green');
    }
    const handleBrownClick = () => {
        props.handleColoredClick('brown');
    }
    return (
        <Paper style={{padding: 4}}>
            <FormControl style={{backgroundColor: 'white', textAlign: 'center'}} component="fieldset" variant={"standard"}>
                <FormLabel component="legend">Switch Selector</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="brown"
                        control={<Checkbox onClick={handleBrownClick} color="primary" />}
                        label="brown"
                        labelPlacement="end"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="purple"
                        control={<Checkbox onClick={handlePurpleClick} color="primary" />}
                        label="purple"
                        labelPlacement="end"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="green"
                        control={<Checkbox onClick={handleGreenClick} color="primary" />}
                        label="green"
                        labelPlacement="end"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="blue"
                        control={<Checkbox onClick={handleBlueClick} color="primary" />}
                        label="blue"
                        labelPlacement="end"
                        disabled={!props.buildMode}
                    />
                </FormGroup>
            </FormControl>
        </Paper>
    );
}
