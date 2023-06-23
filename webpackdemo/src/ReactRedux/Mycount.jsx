import React, { Component } from 'react'
import { connect } from "react-redux"
import { ADD_COUNT, CHANGE_COUNT, DESC_COUNT, commenAction, asyncAction, GET_LIST_ASYNC, CHANGE_DATA_FLAG } from './actions'
import data from './reducers/data'
import { toJS } from "immutable"
//  装饰器   只能用于  class类 组件
// @connect(
//     state => {
//         return {
//             count: state.count,
//             data: state.data
//         }
//     },
//     dispatch => {
//         return {
//             addCount: () => dispatch(commenAction(ADD_COUNT)),
//             descCount: () => dispatch(commenAction(DESC_COUNT)),
//             changeCount: (payload) => dispatch(commenAction(CHANGE_COUNT, payload)),
//             // 可以定义公共的方法 传递  type和  payload 即可
//             commen: (type, payload) => dispatch(commenAction(type, payload)),
//             getList: (type, payload) => dispatch(asyncAction(type, payload))
//         }
//     }
// )
// 使用 immutable 管理数据
// 在reducers 中的index 内对所有的数据都使用了immutable 管理,因此都需要使用  对应的api 处理 
@connect(
    state => {
        console.log(state);
        return {
            count: state.get('count'),
            list: state.getIn(["data", "list"]),
            flag: state.getIn(["data", "flag"])
        }
    },
    dispatch => {
        return {
            addCount: () => dispatch(commenAction(ADD_COUNT)),
            descCount: () => dispatch(commenAction(DESC_COUNT)),
            changeCount: (payload) => dispatch(commenAction(CHANGE_COUNT, payload)),
            // 可以定义公共的方法 传递  type和  payload 即可
            commen: (type, payload) => dispatch(commenAction(type, payload)),
            getList: (type, payload) => dispatch(asyncAction(type, payload))
        }
    }
)
class Mycount extends Component {
    render() {
        const { count, addCount, descCount, changeCount, commen, getList, list, flag
        } = this.props
        console.log(list, count, flag);
        return (
            <div>
                {/* UI组件   没有业务逻辑  没有状态  不使用  redux api */}
                <h1>Mycount</h1>
                {flag && <h2>count={count}</h2>}
                <button onClick={addCount}>addCount</button>
                <button onClick={descCount}>descCount</button>
                <button onClick={() => changeCount(200)}>changeCount</button>
                <button onClick={() => commen(CHANGE_COUNT, -200)}>change</button>
                <button onClick={() => getList(GET_LIST_ASYNC)}>getList</button>
                <button onClick={() => commen(CHANGE_DATA_FLAG)}> changflag</button>
                {
                    list.map(item => {
                        return <p key={item.proid}>{item.proname}</p>
                    })
                }
            </div >
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         count: state.count,
//         data: state.data
//     }
// }


// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCount: () => dispatch(commenAction(ADD_COUNT)),
//         descCount: () => dispatch(commenAction(DESC_COUNT)),
//         changeCount: (payload) => dispatch(commenAction(CHANGE_COUNT, payload)),
//         // 可以定义公共的方法 传递  type和  payload 即可
//         commen: (type, payload) => dispatch(commenAction(type, payload)),
//         getList: (type, payload) => dispatch(asyncAction(type, payload))
//     }
// }
/* 
使用connect 将容器组件和UI组件连接 
父组件 被<Provider store={store}></Provider> 包裹  其子组件都能使用store的内容  
UI组件拿到 需要的数据和方法 
mapStateToProps  将state 转换为props提供
mapDispatchToProps 将方法 转化为props 提供
添加了新的数据和方法一定在这两个位置完成映射


*/
// export default connect(mapStateToProps, mapDispatchToProps)(Mycount)
export default Mycount