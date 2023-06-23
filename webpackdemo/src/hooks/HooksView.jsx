import React, { createRef, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import reducer, { ADD_COUNT, commenAction, defaultState } from './reducer.ts'
import { Provider } from 'react-redux'

import testContext from './store'

// 纯函数组件,Hooks 使用

// useState  定义响应式变量 [变量名,方法]=useState(值)  也可以是函数  函数的返回值作为初始值
/* useEffect 监听数据变化  
第二参数 不写  任何变化都会被响应 
        空[]   任何变化都不响应
        有值   对应的值改变才响应
*/
function HooksView() {
    const [count, setCount] = useState(1000)
    const [flag, setFlag] = useState(() => {
        // 初始值为false
        return count > 1000
    })
    let [timer] = useState(null)
    useEffect(() => {
        timer = setInterval(() => {
            // console.log("66666");
        }, 1000)
        console.log(itemRef);
        console.log("只触发一次,可以当做挂载的生命周期使用,发送请求等");
    }, [])

    //当count 变化 才能触发
    useEffect(() => {
        console.log(count, "当做updata生命周期使用")
        setFlag(count > 1000)
    }, [count]);
    // 返回一个函数 在函数内部执行 willUnmount的生命周期,清除定时器等操作都可以
    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [count])
    // useRef  获取组件或者元素 
    const inp = useRef()
    const [inpval, setInpVal] = useState("jjjjjj")
    useCallback(() => {

    }, [])
    const [list] = useState([1, 2, 3, 5])
    const itemRef = useRef([])
    //  父组件定义函数 
    const test = () => {
        console.log("test-----------------------");
        return count > 1000
    }
    // 只有在 count 改变时 才能触发 返回的是个函数  进行调用
    const callBackTest = useCallback(() => {
        console.log("callBackTest-----------------------");
        return count > 1000
    }, [count])

    // 返回的是个值  直接使用即可
    const MemoTest = useMemo(() => {
        console.log("memo------------------");
        return count > 1000
    }, [count])
    return (
        <div>
            <h1>HooksView</h1>
            <button onClick={() => setCount(count + 1)}>count++</button>
            <button onClick={() => setCount(count - 1)}>count--</button>
            <input type="text" value={inpval} ref={inp} onChange={() => setInpVal(inp.current.value)} />
            <h2> count={count}</h2>
            <h2>inpval={inpval}</h2>
            {flag && <h2>10000</h2>}
            {list.map((item, index) => {
                return <h2 key={item} ref={el => itemRef.current[index] = el}>{item}</h2>
            })}
            <Child MemoTest={MemoTest}></Child>
            <Child1></Child1>

        </div>
    )
}

// useCallback  useMemo 两者的区别在于返回值不同 一个是函数  一个值 需要配合purecomponent
// 或者  memo 使用   
const Child = memo((props) => {
    // 父组件传递过来的函数,没有任何改变也会更新
    // const { callBackTest } = props
    const { MemoTest } = props
    console.log("子组件------------");
    return (
        <div>
            {MemoTest && <h2>我是子组件</h2>}
        </div>
    )
})



// useReducer 对于复杂的数据 推荐 使用  将 所有的state 都集合在一起


const Child1 = memo((props) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    console.log(state);
    return (
        <div>
            <testContext.Provider value={{ state, dispatch }}>
                <h2>子组件2</h2>
                <h2>count={state.get("count")}</h2>
                <button onClick={() => dispatch(commenAction(ADD_COUNT))}>addCount</button>
                <Child2></Child2>
            </testContext.Provider>
        </div>
    )
})


// useContext     简化之前  通过  Consumer 或者  this.context 取值的方式 

const Child2 = () => {
    const { state, dispatch } = useContext(testContext)
    return (
        <div>
            <h2>子组件3</h2>
            <h2>count={state.get("count")}</h2>
        </div>
    )
}












export default HooksView