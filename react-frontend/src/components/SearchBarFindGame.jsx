import React from 'react';

const buttonpanel = () => {
    return {
        marginRight: '5px',
        marginTop: '15px',
        marginBottom: '15px',
        float: 'left',
    };
}
class SearchBarFindGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.submitSearch} style={buttonpanel()}>
                    <button type="submit">Search</button>
                </form>
                <input style={buttonpanel()} id={"searchBarFindGame"} type={"text"} placeholder={"Search"}>
                </input>
            </div>
        )
    }
}

export default SearchBarFindGame;
