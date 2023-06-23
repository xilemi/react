


import React, { Component } from 'react';
import MyCounter from './views/MyCounter';
import MyChild from './views/MyChild';

class SagasIndex extends Component {
    render() {
        return (
            <div>
                <h2>redux-saga 实现异步改造 </h2>
                <hr/>
                <MyCounter/>
                <hr/>
                <MyChild/>
            </div>
        );
    }
}

export default SagasIndex;
