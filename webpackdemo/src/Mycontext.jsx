import ThemContext from "./utils/ThemContext";
import React, { Component } from 'react'

export default class Mycontext extends Component {
    render() {
        return (
            <div>
                <ThemContext.Provider value={{ color: 'red', name: 'xile' }
                }>

                    <Mychild></Mychild>
                    <Mychild1></Mychild1>

                </ThemContext.Provider >
            </div >


        )
    }
}


class Mychild extends Component {
    render() {
        const { color, name } = this.context
        return (
            <div>我是子组件

                <h2>color{color}</h2>
                <h2>name{name}</h2>
            </div>


        )
    }
}
Mychild.contextType = ThemContext

// 如果是函数式组件 那么将不能使用 this.context 使用
function Mychild1() {
    return (

        <div>
            我是子组件1 消费者模式
            <ThemContext.Consumer>

                {
                    value => <div>
                        <h2>{value.name}</h2>
                        <h2>{value.color}</h2>
                    </div>

                }
            </ThemContext.Consumer>
        </div>


    )
}