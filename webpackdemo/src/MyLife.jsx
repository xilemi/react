import React, { Component } from 'react'






export class MyLife extends Component {
    state = {
        count: 10
    }
    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props, state, "getdrivedstatefromprops");
        console.log(`##${++index}`);
        return {
            text: 'ooooo',
        }
    }
    render() {
        const { count } = this.state
        return (
            <div>MyLife
                <h1>count{count}</h1>
                <button onClick={this.addCount}>add</button>
                <Mychild count={count}></Mychild>
            </div>
        )
    }
    componentDidMount() {
        console.log("被挂载-----componentDidMount")
    }
    shouldComponentUpdate(props, state) {
        // 获取更新前的值
        console.log(state, "shouldComponentUpdate");
        console.log(this.state, "shouldComponentUpdate");
        return this.state.count == state.count ? false : true
        // 返回布尔值 是否更新
        return true
    }
    getSnapshotBeforeUpdate(prevprops, prevstate, c) {
        // 前面是 props  后面是state
        // 快照  保存更新前的值
        console.log(prevstate, "getSnapshotBeforeUpdate");
        return prevstate

    }
    componentDidUpdate(props, state, c) {
        console.log(props, state, "-------");
        console.log("触发更新二次渲染----componentDidUpdate")
    }
}





let index = 0
class Mychild extends Component {
    constructor() {
        super()
    }
    state = {
        num: 1000,
        msg: "hhhh"
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props, state, "getdrivedstatefromprops");
        console.log(`##${++index}`);
        return {
            text: 'hhhh',
            ...props
        }
    }
    render() {
        const { count } = this.props
        return (< div > 我是子组件
            <h1>{count}</h1>
        </div >)
    }
    getSnapshotBeforeUpdate(prevprops, prevstate) {
        console.log(prevprops, prevstate);
        return { ...prevprops, ...prevstate }
    }
    componentDidUpdate() {

    }
}

export default MyLife