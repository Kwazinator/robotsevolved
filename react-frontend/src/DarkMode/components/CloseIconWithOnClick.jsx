import React from 'react';
import CloseIcon from '@material-ui/icons/Close'

export default function CloseIconWithOnClick(props) {
    const handleClose = () => {
        props.handleClose(props.index);
    }
    return (<CloseIcon onMouseDown={handleClose}/>
    )
}