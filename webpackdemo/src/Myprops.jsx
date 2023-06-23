import React, { Component } from 'react'

export default class Myprops extends Component {
    constructor(props) {
        super()
        console.log(props, "constructor");
        this.state = {
            data: 'jjjjsdkjf'
        }
    }
    handler1() {
        this.props.handler1(this.state.data)
    }
    render() {
        console.log(this);
        console.log(this.props, "render");
        return (
            <div>Myprops
                <button onClick={e => this.handler1()}>触发</button>
            </div>
        )
    }
}

// createRef 创建一个ref 对象