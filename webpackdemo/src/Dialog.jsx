import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import { createPortal } from "react-dom"
// 弄一个弹框 实现点击弹框外的弹框关闭
// 利用父子组件  createPortal (为什么要把内容放在外面)
// 因为使用position 层级的问题 ,点击目标不能到下面层级的元素
// 使用createProtrol 把组件放到body外面

export default class Dialog extends Component {
    // 直接控制是否渲染
    state = {
        flag: false
    }
    openDialog = () => {
        this.setState({
            flag: !this.state.flag
        })
    }
    handler = (flag) => {
        this.setState({
            flag: flag
        })
    }

    render() {
        const { flag } = this.state
        return (
            <div style={{ height: "800px" }}>

                {flag && <Mychild openDialog={this.openDialog} handler={this.handler} ></Mychild>}

                <button onClick={this.openDialog}>打开弹窗
                </button>
            </div>
        )
    }
}

class Mychild extends Component {
    handler = () => {
        this.props.openDialog()
    }

    sapceClick = (e) => {
        console.log(11);
        this.props.handler(e.target == this.childRef.current ? true : false)
    }
    childRef = createRef()
    render() {
        return createPortal(
            <div style={{ style: "1000px", height: "800px", position: "fixed", top: "50%", left: "50%" }} onClick={e => this.sapceClick(e)}>
                <div ref={this.childRef} style={{ width: 200, height: 200, background: "pink" }}>
                    <button onClick={this.handler} >关闭</button>
                </div>
            </div>, document.querySelector("body")
        )
    }
}

// createPortal 是在react-dom 内的
// 第一个参数是要控制的元素  第二个参数要放入参数的位置