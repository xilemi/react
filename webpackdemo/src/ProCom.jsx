import React, { Component, PureComponent, memo } from 'react'
// 使用component 和 PureComponent  memo 和普通函数组件的对比
/* 
结论 当是使用的component 和普通函数组件  当 不管组件是否有改变  只要 所在的父组件内更新就会被重新渲染
使用  PureComponent 和  memo 包裹组件没有这个问题
浅层比较  那么 只修改对象内的一部分数据呢    引用没有改变  所以 必须进行一个浅层拷贝?
*/
export default class ProCom extends Component {
    state = {
        count: 10,
        msg: 'xile'
    }
    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    changeMsg = () => {
        this.setState({
            msg: "hhhhh"
        })
    }
    render() {
        const { count, msg } = this.state
        return (
            <div>
                <h1>使用component 和 purecomonent  memo 和普通函数组件的对比</h1>
                <Cchild count={count} msg={msg}></Cchild>
                <hr />
                <Pcchild count={count}></Pcchild>
                <hr />
                <Fn msg={msg}></Fn>
                <hr />
                <Memofn count={count}></Memofn>
                <button onClick={this.addCount}>count++</button>
                <button onClick={this.changeMsg}>msgchange</button>
            </div>
        )
    }
}

class Cchild extends Component {
    render() {
        console.log("-----", "Cchild");
        const { count, msg } = this.props
        return (
            <div>
                Component实现
                <h1>Cchild count:{count}</h1>
            </div>
        )
    }
}

class Pcchild extends PureComponent {
    render() {
        const { count } = this.props
        console.log("-----", "Pcchild");
        return (
            <div>
                PureComponent实现
                <h1>Pcchild count{count}</h1>
            </div>
        )
    }
}

function Fn(props) {
    console.log("-----", "Fn");
    const { msg } = props
    return (
        <div>普通函数组件
            Fn msg{msg}
        </div>
    )
}

const Memofn = memo(function (props) {
    console.log("-----", "Memofn");
    const { count } = props
    return (<div>
        memo 组件
        <h1>Memofn count{count}</h1>
    </div>)
})