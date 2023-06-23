import React, { Component } from 'react'
import store from '../store'

export default class Index extends Component {
    render() {
        const { count, msg } = store.getState()
        return (
            <div>
                <h2>Index</h2>
                <h2>count{count}</h2>
                <h2>msg{msg}</h2>
            </div>
        )
    }
}
