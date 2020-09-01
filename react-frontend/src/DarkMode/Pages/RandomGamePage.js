import React from 'react';
import Game from '../containers/Game';

export default function RandomGamePage(props) {
    return (
        <Game
              handleLineDirections={props.handleLineDirections}
              LineDirections={props.LineDirections}
              randomGame={'Yes'}
              game={props.game}
              difficulty={props.difficulty}
         />
    )
}