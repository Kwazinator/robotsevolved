import React from 'react';
import Game from '../containers/Game';

export default function RandomGamePage(props) {
    return (
        <Game randomGame={'Yes'}
              game={props.game}
              difficulty={props.difficulty}
         />
    )
}