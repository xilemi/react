import React, { Component } from 'react'
// 先引入创建的context 
import ThemContext from './utils/ThemContext'
import Http from './utils/Http'

export default class Mycontent1 extends Component {
    state = {
        count: 100,
        msg: 'xile'
    }
    async postAjax() {
        let res = await Http.post("http://localhost:3000/api/address/defaultAddress", {
            params: {
                userid: "user_deab53d1-3f03-4262-aabf-78350149cba6",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NzE0NjM1OCIsImlhdCI6MTY4NjI4MjA3NiwiZXhwIjoxNjg3NTc4MDc2fQ.EqaR42lQ-hiwAAqodLZTobJg4upGcWfAyEhx3fT0_Ms"
            }
        })
        console.log(res);
    }
    render() {
        return (
            <div>Mycontent1
                <ThemContext.Provider value={{ ...this.state }}>
                    <Mychild></Mychild>
                    <Mychild1></Mychild1>
                </ThemContext.Provider>

            </div>
        )
    }
    componentDidMount() {
        this.postAjax()
    }
}


class Mychild extends Component {
    static contextType = ThemContext
    render() {
        console.log(this.context);
        const { count, msg } = this.context
        return (
            <div>
                我是子组件
                <h2>
                    {count}
                </h2>
                <h2>{msg}</h2>
            </div>

        )
    }
}


// Consumer 用于函数组件   没有this 没有 实例 没有生命周期


function Mychild1() {
    return (

        <ThemContext.Consumer>
            {
                ({ count, msg }) => {
                    return (
                        <div>Mychild1
                            <h1>{count}</h1>
                            <h1>{msg}</h1>
                        </div>
                    )
                }
            }

        </ThemContext.Consumer>



    )
}