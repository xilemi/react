import React, { Component } from 'react'
import { eventBus } from './utils/eventBus'
console.log(eventBus);
export default class MyEventBus extends Component {
    state = {
        MyEventBus: "我是MyEventBus"
    }
    changHandler = () => {
        eventBus.emit("handler", "1111")
    }
    render() {
        const { MyEventBus } = this.state
        return (
            <div>EventBus
                <h1>我和Myprops进行传递</h1>
                <h2>{MyEventBus}</h2>
                <button onClick={this.changHandler}>传递</button>
            </div>
        )
    }
}

//兄弟组件的通信  和Myprops1 进行传递



