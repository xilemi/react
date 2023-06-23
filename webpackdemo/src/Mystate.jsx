import React, { Component } from 'react'

export default class Mystate extends Component {
    // state 写在cons内为什么

    constructor() {
        super()
        // 这里的state优先级更高
        // setState 异步 多个setState 合并 批量更新 
        this.state = {
            count: 10
        }
    }
    // 根源问题是 修改state 只能通过setState,才能触发页面更新,直接对state进行赋值 页面不能触发更新,多次重复操作,只是上一次直接对this.state.count赋值,被setState操作了,让页面可以视图更新了 区别直接赋值 和 使用setstate赋值
    addCount = () => {
        // // 如果多次这个操作呢  setState 是优先于微任务执行的    所以  log都是初始值  count +1
        // this.setState({
        //     count: this.state.count + 1
        // })
        // console.log(this.state.count);
        // this.setState({
        //     count: this.state.count + 1
        // })
        // console.log(this.state.count);
        // this.setState({
        //     count: this.state.count + 1
        // })
        // console.log(this.state.count);
        // count++ 的方式
        // 一次的时候  
        // count 修改只能通过setState修改   ++ 只是改变了值 但是没有赋值  所有每次的count 值都是 从初始值开始
        // 多次呢 
        this.setState({
            count: this.state.count++ //10 被赋值
        })
        console.log(this.state.count);//11
        this.setState({
            count: this.state.count++  //11 被setState   count被修改 
        })
        console.log(this.state.count);//12
        // ++count  赋值的时候 就已经是11了页面自然会更新
        // this.setState({
        //     count: ++this.state.count //11
        // })
        // console.log(this.state.count);//11
        // this.setState({
        //     count: ++this.state.count //12
        // })
        // console.log(this.state.count);//12


    }
    render() {
        const { count } = this.state
        return (
            <div>Mystate
                <h1>{count}</h1>
                <button onClick={this.addCount}>add</button>
            </div>
        )
    }
}
