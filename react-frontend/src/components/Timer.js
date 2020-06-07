import React, { Component } from 'react'

export default class Timer extends Component {

    state = {
            minutes: 1,
            seconds: 0,
        }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.props.puzzleRushTimeUp();
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    timer = () => {
        if (this.state.minutes === 0 && this.state.seconds === 0) {
            return (<h2>Time is up!</h2>)
        }
        else {
            return(
                <h2>Time Remaining: {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>)
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            this.timer()
        )
    }
}