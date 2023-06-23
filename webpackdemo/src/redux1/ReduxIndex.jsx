import store from "./store"
import { addCount, descCount } from "./action/index.js"
import Index from "./view/Index.jsx"
const ReduxIndex = () => {
    const { count, msg } = store.getState()
    return (
        <div>
            <h1>ReduxIndex</h1>
            <h2>count{count}</h2>
            <h2>msg{msg}</h2>
            <button onClick={() => store.dispatch(addCount)}>addCount</button>
            <button onClick={() => store.dispatch(descCount(20))}>descCount</button>
            <Index></Index>
        </div>
    )
}

export default ReduxIndex