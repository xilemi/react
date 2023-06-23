import React, { Component, createRef } from 'react'

// 通过 refs 获取元素或者组件 

export default class Myrefs extends Component {
    // 通过ref 直接拿到组件或者元素
    Myref = createRef()
    handler = () => {
        // 存在current 内  
        const { state, handler1 } = this.Myref.current
        console.log(state);
        handler1()
        console.log(this.demo2);
        console.log(this.h2);
    }
    render() {
        // 会直接添加一个Myref 
        console.log(this);
        return (
            <div>Myrefs
                <h1>我是refs</h1>
                <RefsDemo ref={this.Myref}></RefsDemo>
                <button onClick={this.handler}>丹迪</button>
                <RefDome2 ref={el => this.demo2 = el}></RefDome2>
                <h2 ref={el => this.h2 = el}></h2>
            </div>
        )
    }
}
class RefsDemo extends Component {
    state = {
        name: 'xile'

    }
    handler1 = () => {
        console.log(this);
    }
    render() {
        return (

            <div>
                我是被创建的refs,被获取
            </div>
        )
    }
}
class RefDome2 extends Component {
    state = {
        msg: "demo2"
    }
    render() {
        return (
            <div>
                <p>通过this.demo2=el绑定</p>
            </div>
        )
    }
}