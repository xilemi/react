import React, { Component } from 'react'

export default class Myprops2 extends Component {
    state = {
        num: 100
    }
    handler = () => {
        this.props.handlerNum(this.state.num + 1)
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        const { num } = this.state
        return (
            <div>Myprops2
                <h1>子组件传递到父组件,子组件修改值,父组件也会同时更改</h1>
                <h2>num:{num}</h2>
                <button onClick={() => this.handler()}>传递</button>

            </div>
        )
    }
}
