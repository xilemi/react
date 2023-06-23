


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CHANGECOUNT, CHANGE_TEST_SYNC, COUNTADD, commonAction } from '../types';
import MyBtn from '../../MyBtn.jsx'


// class 组件写法 
@connect(
    state => {
        return {
            data: state.get('data'),
            num: state.getIn(['data', 'num']),
            test: state.getIn(['data', 'test']),
            list: state.getIn(['data', 'list'])
        }
    }
)
class MyCounter extends Component {
    render() {
        console.log(this.props)
        const {
            num,
            test,
            list,
            dispatch
        } = this.props;
        return (
            <div>
                <h2>Saga 练习</h2>
                <h2> num = {num} </h2>
                <h2>test = {test} </h2>
                {
                    list.map((item, index) => (
                        <h3 key={index}> {item.proname} - {index}  </h3>
                    ))
                }
                <hr />

                <MyBtn text='count+1' onClick={() => dispatch(commonAction(COUNTADD))} ></MyBtn>
                <MyBtn text="changeCount" onClick={() => dispatch(commonAction(CHANGECOUNT, 100))} />
                <div>
                    <MyBtn type="success" text='test同步改变' onClick={() => dispatch(commonAction(CHANGE_TEST_SYNC, 'Hello Sagas 。。。'))} ></MyBtn>
                    <MyBtn type="danger" text='异步修改test' onClick={() => dispatch(commonAction('CHANGE_TEST'))} ></MyBtn>
                    <MyBtn type="danger" text='获取list' onClick={() => dispatch(commonAction('CHANGE_LIST', { limitNum: 3 }))} ></MyBtn>
                </div>
            </div>
        );
    }
}

export default MyCounter;
