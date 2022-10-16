import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function CreateBoardWallTypeSelector(props) {

    const handleWallChange = (value) => {
        props.handleWallChange(value);
    }

    return (
        <Paper>
            <FormControl style={{backgroundColor: 'white', textAlign: 'center'}} component="fieldset">
                <FormLabel component="legend">Wall Type</FormLabel>
                <RadioGroup
                    defaultValue="normal"
                    onChange={(event, value) => handleWallChange(value)}
                    row
                >
                    <FormControlLabel
                        value="normal"
                        control={<Radio color="primary" />}
                        label="normal"
                        labelPlacement="top"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="brownPass"
                        control={<Radio color="primary" />}
                        label="brown"
                        labelPlacement="top"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="purplePass"
                        control={<Radio color="primary" />}
                        label="purple"
                        labelPlacement="top"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="greenPass"
                        control={<Radio color="primary" />}
                        label="green"
                        labelPlacement="top"
                        disabled={!props.buildMode}
                    />
                    <FormControlLabel
                        value="bluePass"
                        control={<Radio color="primary" />}
                        label="blue"
                        labelPlacement="top"
                        disabled={!props.buildMode}
                    />
                </RadioGroup>
            </FormControl>
        </Paper>
    );
}
