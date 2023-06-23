import React, { Component, createRef } from 'react'
//  ref  获取组件或者元素 使用createRef




export default class Myrefs1 extends Component {
    child = createRef()
    render() {
        return (
            <div>Myrefs1
                <Mychild ref={this.child}></Mychild>
                <Mychild1 ref={el => this.child1 = el}></Mychild1>
            </div>
        )
    }
    componentDidMount() {
        // 获取到组件 
        console.log(this.child.current);
        console.log(this.child1);
    }
}


class Mychild extends Component {
    state = {
        count: 100
    }
    // 方法
    say() {
        console.log('我是子组件');
    }
    render() {
        return (
            <div>
                子组件
            </div>
        )
    }
}




class Mychild1 extends Component {
    state = {
        inpVal: ''
    }
    inpChange = () => {

        this.setState({
            inpVal: this.inp.current.value
        })
        console.log(this.state.inpVal);
    }
    inp = createRef()
    render() {
        // 受控组件 需要绑定 onchange 事件
        const { inpVal } = this.state
        return (
            <div>Mychild1
                <input type="text" ref={this.inp} value={inpVal} onChange={this.inpChange} />
            </div>
        )
    }
}


// 受控组件 
