import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px'
    };
};

const labelStyle = () => {
    return {
        display: 'inline-block',
        textAlign: 'right',
        width: '140px',
        paddingRight: '20px'
    };
};


class BoardResetModal extends React.Component {

    constructor(props) {
        super(props);
    }

    createBoardHandler = event => {
        event.preventDefault();
        var width = parseInt(document.getElementById("boardWidthInput").value);
        var height = parseInt(document.getElementById("boardHeightInput").value);
        var percent = parseInt(document.getElementById("boardRandomPercent").value);

        if (width.toString() === "NaN") {
            width = 16;
        } else if (width > 36) {
            width = 36;
        } else if (width < 4) {
            width = 4;
        }

        if (height.toString() === "NaN") {
            height = 16;
        } else if (height.toString() === "NaN" || height > 36) {
            height = 36;
        } else if (height < 4) {
            height = 4;
        }

        if (percent.toString() === "NaN") {
            percent = 20;
        } else if (percent < 0) {
            percent = 0;
        } else if (percent > 100) {
            percent = 100;
        }


        this.props.createBoard(
            width,
            height,
            (100 - percent)/100);
    };

    handleClose = () => {
        this.props.show = false;
    };

    render () {
        return (
            <Dialog onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.props.show}
                    maxWidth={"xs"}
                    fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>Create Board Settings</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <label style={labelStyle()} >{'Board Width:\t\t'}</label>
                        <Input id={"boardWidthInput"} inputProps={{max: "36", min: "4", title:"default is 16"}} type={"number"} placeholder={"4-36"}/>
                    </div>
                    <div>
                        <label style={labelStyle()}>{'Board Height:\t\t'}</label>
                        <Input id={"boardHeightInput"} inputProps={{max: "36", min: "4", title:"default is 16"}} type={"number"} placeholder={"4-36"}/>
                    </div>
                    <div>
                        <label style={labelStyle()}>{'Wall Spawn Rate:\t'}</label>
                        <Input id={"boardRandomPercent"} inputProps={{max: "100", min: "0", title:"default is 20%"}} type={"number"} placeholder={"0-100%"}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={this.createBoardHandler}>Create New Board</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </DialogActions>
            </Dialog>
        )

    };


}

export default BoardResetModal;

