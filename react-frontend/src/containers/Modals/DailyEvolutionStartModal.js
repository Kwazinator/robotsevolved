import React from "react";
import "./modal.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { FaCrown } from 'react-icons/fa';
import Button from "@material-ui/core/Button";

const stylecol = () => {
    return({
            float: 'left',
            width: '50%',
            margin: 'auto',
            padding: '0 50px',
            marginTop: '6px',
    });
}

const spacing = () => {
    return({
            marginBottom: '10px',
    });
}

export default class DailyEvolutionStartModal extends React.Component {

    constructor(props) {
        super(props);
    }

    startDailyEvolution = () => {
        this.props.startEvolution();
    }

    render () {
        return (
        <Dialog onClose={this.props.closeModal}
                aria-labelledby="customized-dialog-title"
                open={this.props.show}
                maxWidth={"xs"}
        >
            <DialogTitle id="customized-dialog-title" onClose={this.props.closeLoginModal}>New Daily Evolution</DialogTitle>
            <DialogContent dividers>
                    <Typography style={spacing()} variant="body2" display="inline">
                       • Plays the same as Daily Challenge with timers and reset times.
                    </Typography>
                    <br/>
                    <Typography style={spacing()} variant="body2" display="inline">
                        • The On switches toggle whether the wall is passable or not.
                    </Typography>
                    <br/>
                    <Typography style={spacing()} variant="body2" display="inline">
                        • please let me know if there are any bugs, or possible improvements to the format. it currently is possible to have a map generated that is IMPOSSIBLE but im hoping that doesnt happen until i find a fix
                    </Typography>
                    <br/>
                    <Typography style={spacing()} variant="body2" display="inline">
                        • I am currently unable to create a solver for this format as I am getting memory errors trying to brute force a solution
                    </Typography>
                    <br/>
                <div class="col">
                    <a onClick={this.startDailyEvolution} href="#" id={"buttongoogle"}><i class="fa fa-google fa-fw">
                      </i> START EVOLUTION
                    </a>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.closeModal}>Close</Button>
            </DialogActions>
        </Dialog>
        )
    }
}
