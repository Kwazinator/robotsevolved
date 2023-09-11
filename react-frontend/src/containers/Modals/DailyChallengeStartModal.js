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
import { GOLD_MEDAL, SILVER_MEDAL, BRONZE_MEDAL} from "../../constants/constants";


const stylecol = () => {
    return({
            float: 'left',
            width: '50%',
            margin: 'auto',
            padding: '0 50px',
            marginTop: '6px',
    });
}
const imgstyle = () => {
    return({
        maxWidth: "100%",
    });
}


const stylecolumn2 = () => {
    return({
        float: "left",
        width: "33.33%",
        padding: "10px",
    });
}

const stylerow = () => {
    return ({
        content: "",
        display: "table",
        clear: "both",
    });
}

const headerstyle = () => {
    return ({
        textAlign: "center",
    });
}

const spacing = () => {
    return({
            marginBottom: '10px',
    });
}

export default class DailyChallengeStartModal extends React.Component {

    constructor(props) {
        super(props);
    }

    startDailyChallenge = () => {
        this.props.startDaily();
    }

    render () {
        return (
        <Dialog onClose={this.props.closeModal}
                aria-labelledby="customized-dialog-title"
                open={this.props.show}
                maxWidth={"xs"}
        >
            <DialogTitle id="customized-dialog-title" onClose={this.props.closeLoginModal}>New Daily Challenge Format</DialogTitle>
            <DialogContent dividers>
                    <Typography style={spacing()} variant="body2" display="inline">
                       • Daily Challenge timer STARTS when you click the start button
                    </Typography>
                    <br/>
                    <Typography style={spacing()} variant="body2" display="inline">
                        • Puzzles reset at 3pm EST but you no longer have to get on at that time in order to get a highscore
                    </Typography>
                    <br/>
                    <Typography style={spacing()} variant="body2" display="inline">
                        • Please respect the rules of the game and no incognito windows.
                    </Typography>
                    <br/>
                <div style={stylerow()}>
                    <div style={stylecolumn2()}> <h2 style={headerstyle()}> 8:10 </h2> <img src={GOLD_MEDAL} style={imgstyle()}/> </div>
                    <div style={stylecolumn2()}> <h2 style={headerstyle()}> 12:09 </h2> <img src={SILVER_MEDAL} style={imgstyle()}/>  </div>
                    <div style={stylecolumn2()}> <h2 style={headerstyle()}> 23:01 </h2> <img src={BRONZE_MEDAL} style={imgstyle()}/> </div>
                </div>
                <div class="col">
                    <a onClick={this.startDailyChallenge} href="#" id={"buttongoogle"}><i class="fa fa-google fa-fw">
                      </i> START
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
