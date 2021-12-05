import React from 'react';
import {DIRECTION_MAP_IMAGES} from '../constants/constants';
import Typography from "@material-ui/core/Typography";

const style = () => {
    return {
            width: '15%',
            float: 'left',
            display: 'contents'
        };
    };


class MovesView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style()}><Typography variant={"h6"}>Moves: {this.props.moveHistory.length}</Typography>
                {
                    this.props.moveHistory.map(move =>
                        <img src={DIRECTION_MAP_IMAGES[this.props.playerState[move.robot].colorSignifier][move.dir]}/>
                    )
                }
            </div>
        )
    }
}

export default MovesView;
