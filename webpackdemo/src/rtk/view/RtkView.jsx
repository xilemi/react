import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNum, changeNum, descNum, changeMsg, getListAsync, getMsgAsync } from '../reducers/count';

const RtkView = () => {
    const { num, age, name, msg, list } = useSelector(state => state.count)
    const dispatch = useDispatch()
    const inp = useRef()
    return (
        <div>
            <h1>rtk使用</h1>
            <h2>num={num}</h2>
            <h2>name={name}</h2>
            <h2>age={age}</h2>
            <h2>msg={msg}</h2>
            {list.map(item => {
                return <p key={item.proid}>{item.proname}</p>
            })}
            <input type="text" ref={inp} value={msg} onChange={() => dispatch(changeMsg(inp.current.value))} />
            <button onClick={() => dispatch(addNum())}>addNum</button>
            <button onClick={() => dispatch(descNum())}>descNum</button>
            <button onClick={() => dispatch(changeNum(200))}>changeNum</button>
            <button onClick={() => dispatch(changeNum(200))}>changeNum</button>
            <button onClick={() => dispatch(getListAsync({ count: 1, limitNum: 10 }))}>getList</button>
            <button onClick={() => dispatch(getMsgAsync({ count: 2, limitNum: 20 }))}>getMsg</button>
        </div>
    );
}

export default RtkView;
