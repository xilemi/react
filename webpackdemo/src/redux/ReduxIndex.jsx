import React, { Component } from 'react'
import store from './store'
import Index from './view/Index.jsx'
import { dispatchType, dispatchType1 } from './actions/index.js'
export default class ReduxIndex extends Component {
    render() {
        const { count, msg, data: { flag } } = store.getState()
        return (
            <div>
                <h1>ReduxIndex</h1>
                <h2>count{count}</h2>
                <h2>msg{msg}</h2>
                <button onClick={() => store.dispatch(dispatchType("ADD_COUNT"))}>addCount</button>
                <button onClick={() => store.dispatch(dispatchType("DESC_COUNT"))}>descCount</button>
                <button onClick={() => store.dispatch(dispatchType("CHANGE_COUNT", 200))}>changeCount</button>
                <button onClick={() => store.dispatch(dispatchType("CHANGE_MSG", "HHHHHH"))}>changeMsg</button>
                {flag && <Index></Index>}
                <button onClick={() => store.dispatch(dispatchType("CHANGE_DATA_FLAG"))}>changeDataFlag</button>
                <button onClick={() => store.dispatch(dispatchType1("CHANGE_DATA_FLAG"))}>changeDataFlag</button>
            </div>
        )
    }
}
