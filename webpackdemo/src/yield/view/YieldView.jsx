import React, { Component } from 'react'
import store from '../store'
import { commenActions } from '../actions'
import { GET_LIST_ASYNC } from '../reducers/info'
export default class YieldView extends Component {
    render() {
        const state = store.getState()
        const { count, list } = state.get("count")
        return (
            <div>
                <h2>YieldView</h2>
                <h2>count={count}</h2>
                <button onClick={() => commenActions(GET_LIST_ASYNC)}>异步</button>
            </div>
        )
    }
}
