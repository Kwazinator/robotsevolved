import React from 'react';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}


class BoardResetPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    createBoardHandler = event => {
        event.preventDefault();
        var width = parseInt(document.getElementById("boardWidthInput").value)
        var height = parseInt(document.getElementById("boardHeightInput").value)
        var percent = parseInt(document.getElementById("boardRandomPercent").value)
        if (width > 36) {
            width = 36;
        }
        else if (width < 4) {
            width = 4;
        }
        if (height > 36) {
            height = 36;
        }
        else if (height < 4) {
            height = 4;
        }
        if (percent < 0) {
            percent = 0;
        }
        else if (percent > 100) {
            percent = 100;
        }


        this.props.createBoard(
            width,
            height,
            (100 - percent)/100);
}

    render () {
        return (
            <div style={buttonpanel()}>
                <label for={"boardWidthInput"}>{'Board Width 4-36'}
                    <input id={"boardWidthInput"} type={"number"} min={"4"} max={"36"}></input>
                </label>
                <br></br>
                <label for={"boardHeightInput"}>{'Board Height 4-36'}
                    <input id={"boardHeightInput"} type={"number"} min={"4"} max={"36"}></input>
                </label>
                <br></br>
                <label for={"boardRandomPercent"}>{'% chance a Wall Spawns'}
                    <input id={"boardRandomPercent"} type={"number"} min={"0"} max={"100"}></input>
                </label>
                <br></br>
                <div>
                    <form onClick={this.createBoardHandler} style={buttonpanel()}>
                        <button type="submit">Create New Board</button>
                    </form>
                </div>
            </div>


        )

    }


}

export default BoardResetPanel;

