import React from 'react';
import './App.css';
import {LineChart, Line, XAxis, YAxis,Tooltip,Legend,CartesianGrid} from 'recharts'

class GraphDetails extends React.Component {

    render () {
        var items = [];
        this.props.dataaxises.map((dataaxis, i) => {
            items.push(
                <Line type="monotone" dataKey={dataaxis['name']} />
            );
        });

        return (
        <LineChart
        width={this.props.width}
        height={this.props.height}
        data={this.props.dataarray}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        onClick={this.props.onClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {items}
        </LineChart>
        );
    }
}


class Graph extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: 1,
            dataarray: this.props.data,
            dataaxises: this.props.dataaxises,
            namearray: Array(9).fill('name2'),
        };

    }

    render () {
        return (
            <div className="graph-x">
                <div className="graph-graphDetails">
                    <GraphDetails dataarray={this.state.dataarray} dataaxises={this.state.dataaxises} name={this.state.namearray[0]} onClick={() => this.handleClick(0)} height={this.props.height} width={this.props.width}/>
                </div>
            </div>
        );

    }

}

export default Graph;
