
import React from 'react';
import Square from '../components/Square';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Wall from '../components/Wall';
import {LEFT,RIGHT,UP,DOWN,MAX_WIDTH,MAX_HEIGHT} from '../constants/constants';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


class Game extends React.Component {

    constructor(props) {
        super(props);
        const {boardSize, playerSize } = props;
        var boardState = [];
        const width = MAX_WIDTH;
        const height = MAX_HEIGHT;
        var wallVerticle = [];
        var wallHorizontal = [];
        var playerState = [];
        playerState.push({top: 0, left: 0, color: 'blue'})

        for (var i=0;i<width;i+=40) {
            for (var j=0;j<height;j+=40) {
                boardState.push({top: j,left: i});
            }
        }

        for (var i=0;i<width;i+=40) {
            for (var j=0;j<height;j+=40) {
                if (Math.random() > .90) {
                    wallVerticle.push({top: j,left: i-4});
                }
            }
        }

        for (var i=0;i<width;i+=40) {
            for (var j=0;j<height;j+=40) {
                if (Math.random() > .90) {
                    wallHorizontal.push({top: j-4,left: i});
                }
            }
        }





        this.state = {
            playerState: playerState,
            boardSize: boardSize,
            playerSize: playerSize,
            boardState: boardState,
            wallHorizontal: wallHorizontal,
            wallVerticle: wallVerticle,
        };
    }

    handleCollision = (dirObj) => {
        var newPosition;
        switch(dirObj.dir) {
            case UP:
                var robotX = this.state.playerState[0].left;
                var robotY = this.state.playerState[0].top;
                var minimumWall = 0;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left == robotX && wall.top < robotY && wall.top > minimumWall) {
                        minimumWall = wall.top + 4;
                    }
                });
                newPosition = {top: minimumWall, left: robotX, color: 'blue'};
                break;
            case RIGHT:
                var robotX = this.state.playerState[0].left;
                var robotY = this.state.playerState[0].top;
                var minimumWall = MAX_WIDTH - 40;
                this.state.wallVerticle.map(wall => {
                    if (wall.top == robotY && wall.left > robotX && wall.left < minimumWall) {
                        minimumWall = wall.left - 36;

                    }


                });
                newPosition = {top: robotY, left:minimumWall, color: 'blue'};
                break;
            case LEFT:
                var robotX = this.state.playerState[0].left;
                var robotY = this.state.playerState[0].top;
                var minimumWall = 0;
                this.state.wallVerticle.map(wall => {
                    if (wall.top == robotY && wall.left < robotX && wall.left > minimumWall) {
                        minimumWall = wall.left + 4;

                    }


                });
                newPosition = {top: robotY, left:minimumWall, color: 'blue'};
                break;
            case DOWN:
                var robotX = this.state.playerState[0].left;
                var robotY = this.state.playerState[0].top;
                var minimumWall = MAX_HEIGHT - 40;
                this.state.wallHorizontal.map(wall =>
                {
                    if (wall.left == robotX && wall.top > robotY && wall.top < minimumWall)
                        minimumWall = wall.top - 36;

                });
                newPosition = {top: minimumWall, left: robotX, color: 'blue'};
                break;
            default:
                return;
        }
        return newPosition;


    }



    handlePlayerMovement = (dirObj) => {
        var newPosition = this.handleCollision(dirObj);
        var playerState = this.state.playerState;
        playerState[0] = newPosition;
        this.setState({
            playerState: playerState,
        });
    }


    render() {
        return (
        <Board width={MAX_WIDTH} height={MAX_HEIGHT}>
            {
                this.state.boardState.map(square =>
                    <Square dimension={40} position={{top:square.top,left: square.left}}/>
                )
            }
            {
                this.state.playerState.map(player =>
                    <Robot dimension={40} position={{top:player.top,left:player.left}} color={player.color} handlePlayerMovement={this.handlePlayerMovement}/>
                )


            }
            {
                this.state.wallHorizontal.map(wallH =>
                    <Wall orientation={'horizontal'} dimension={40} position={{top:wallH.top,left:wallH.left}}/>
                )
            }
            {
                this.state.wallVerticle.map(wallV =>
                    <Wall orientation={'verticle'} dimension={40} position={{top:wallV.top,left:wallV.left}}/>
                )

            }
        </Board>
        );
    }
}

export default Game;