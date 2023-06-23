import React, { Component } from 'react'
// 子传父
export default class Myprops1 extends Component {
    state = {
        count: 10
    }
    changeCount = (count) => {
        this.setState({
            count: this.state.count + count
        })
    }
    render() {
        const { count } = this.state
        return (
            <div>Myprops1
                <h2>{count}</h2>
                {/* 通过函数接收带回的值 并使用 */}
                <Mychild addCount={(count) => this.changeCount(count)}></Mychild>
            </div>

        )
    }
}



class Mychild extends Component {


    addCount = (count) => {
        // 父元素提供的函数把 值携带回去 
        this.props.addCount(count)
    }
    render() {
        return (
            // 点击把 加的值传递给父元素
            <div>
                <button onClick={() => this.addCount(1)}>+1</button>
                <button onClick={() => this.addCount(5)}>+5</button>
                <button onClick={() => this.addCount(8)}>+8</button>
            </div>

        )
    }

}

// 子传父  可以理解为 子元素通过函数把 需要的内容携带过去 这个函数由与父元素提供 