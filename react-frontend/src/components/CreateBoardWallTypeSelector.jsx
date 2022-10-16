import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {InputLabel, MenuItem, Select} from "@material-ui/core";

export default function CreateBoardWallTypeSelector(props) {

    const handleWallChange = (value) => {
        props.handleWallChange(value);
    }

    return (
        <FormControl fullWidth variant={"outlined"}>
            <InputLabel>Wall Type</InputLabel>
            <Select
                variant={"outlined"}
                defaultValue={"normal"}
                label={"Wall Type"}
                onChange={(event) => handleWallChange(event.target.value)}
                disabled={!props.buildMode}
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }}
            >
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"brownPass"}>Brown</MenuItem>
                <MenuItem value={"purplePass"}>Purple</MenuItem>
                <MenuItem value={"greenPass"}>Green</MenuItem>
                <MenuItem value={"bluePass"}>Blue</MenuItem>
            </Select>
        </FormControl>
    )
}
