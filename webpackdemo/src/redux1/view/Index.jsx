import PropTypes from 'prop-types'
import React, { Component } from 'react'
import store from '../store'
import { changeMsg } from '../action'
export class Index extends Component {
    render() {
        const { count, msg } = store.getState()
        return (
            <div>
                <h2>Index</h2>
                <hr />
                <h2>count:{count}</h2>
                <h2>msg:{msg}</h2>
                <button onClick={() => store.dispatch(changeMsg("shabi"))}>changeMsg</button>
            </div>
        )
    }
}

export default Index