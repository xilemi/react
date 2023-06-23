

import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import MyBtn from '../../MyBtn.jsx'
import { CHANGECOUNT, commonAction } from '../types'

// 纯函数组件写法 
const MyChild = (props) => {
    console.log(props)
    const dispatch = useDispatch()
    const num = useSelector(state => state.getIn(['data', 'num']))
    const test = useSelector(state => state.getIn(['data', 'test']))

    const gotowhere = () => {
        const num = useSelector(state => state.getIn(['data', 'num']))
    }

    return (
        <div>
            <h2>MyChild - MyChild - 1 </h2>
            <h2> num = {num} = {props.num} </h2>
            <h2 onClick={gotowhere}>  test = {test}  </h2>
            <MyBtn text="change" onClick={() => dispatch(commonAction(CHANGECOUNT, 333))}></MyBtn>
        </div>
    )
}
export default MyChild

// export default connect(
//     state=>{
//         return {
//             num:state.getIn(['data','num'])
//         }
//     }
// )(MyChild)