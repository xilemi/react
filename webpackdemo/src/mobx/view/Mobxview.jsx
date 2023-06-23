import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// console.log(MydData);
@inject("MyData")
@observer
export class Mobxview extends Component {
    render() {
        console.log(this.props);
        const { count, user, changeName, total, changeTotal, addCount, descCount, getList } = this.props.MyData
        console.log(user);
        return (
            <div>Mobxview
                <h2>count={count}</h2>
                <h2>total={total}</h2>
                <h2>name={user.get("name")}</h2>
                <h2>age={user.get("age")}</h2>
                {
                    // item 没有fromjs吗
                    user.get("list").map((item, index) => {
                        // return <h2 key={item.proid}>{item.proname}-{index}</h2>
                        return <h2 key={item.get("proid")}>{item.get("proname")}-{index}</h2>
                    })
                }
                <button onClick={addCount}>addCount</button>
                <button onClick={descCount}>decsCount</button>
                <button onClick={() => changeName("hhhh")}>changename</button>
                <button onClick={() => changeTotal(100)}>changetotal</button>
                <button onClick={() => getList({ count: 1, limitNum: 10 })}>getList</button>
            </div>
        )
    }
}

export default Mobxview