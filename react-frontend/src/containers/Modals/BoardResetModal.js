import React from 'react';

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

    render () {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                <h2>Create Board Settings</h2>
                <div className="content" style={buttonpanel()}>
                    <div>
                        <label style={labelStyle()} >{'Board Width:\t\t'}</label>
                        <input title="default is 16" id={"boardWidthInput"} type={"number"} min={"4"} max={"36"} placeholder={"4-36"}/>
                    </div>
                    <div>
                        <label style={labelStyle()}>{'Board Height:\t\t'}</label>
                        <input title="default is 16" id={"boardHeightInput"} type={"number"} min={"4"} max={"36"} placeholder={"4-36"}/>
                    </div>
                    <div>
                        <label style={labelStyle()}>{'Wall Spawn Rate:\t'}</label>
                        <input title="default is 20%" id={"boardRandomPercent"} type={"number"} min={"0"} max={"100"} placeholder={"0-100%"}/>
                    </div>
                </div>
                <div className="actions">
                    <button type="submit" onClick={this.createBoardHandler}>Create New Board</button>
                    <button style={{float: "right"}} className="toggle-button" onClick={this.props.closeModal}>Close</button>
                </div>
            </div>
        )

    };


}

export default BoardResetModal;

