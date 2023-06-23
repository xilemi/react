// const arr = [1, , 2, 4]
// const obj = {
//     name: "xile"
// }
import { Demo, Demo1 } from "./demo.jsx"
import Myevent from "./myevent.jsx"
import TickApp from "./tickApp.jsx"
import Child from "./child.jsx"
import Mystate from "./Mystate.jsx"
import Myprops from "./Myprops.jsx"
import Slot from "./slot.jsx"
import Myprops1 from "./Myprops1.jsx"
import Myprops2 from "./Myprops2.jsx"
import MyEventBus from "./MyEventBus.jsx"
import Myrefs from "./Myrefs.jsx"
import MyLife from "./MyLife.jsx"
import Mycontext from "./Mycontext.jsx"
import Mycontent1 from "./Mycontent1.jsx"
import Myrefs1 from "./Myrefs1.jsx"
import MyBanner from "./MyBanner.jsx"
import Dialog from "./Dialog.jsx"
import "animate.css"
import Mycomment from "./Mycomment.jsx"
import ProCom from "./ProCom.jsx"
import MyApp from "./route/MyApp.jsx"
import { Provider } from "react-redux"
import store from "../src/ReactRedux/store.js"
import Mycount from "./ReactRedux/Mycount.jsx"
import Mobxview from "./mobx/view/Mobxview.jsx"
import RtkView from "./rtk/view/RtkView.jsx"
import YieldView from "./yield/view/YieldView.jsx"
import HooksView from "./hooks/HooksView.jsx"
import Mycomment1 from "./Mycomment1.jsx"
class App extends Component {
    constructor() {
        super()
        // super() 当函数 指向父类的构造器
        // super 当对象  指向父类的原型属性
        this.state = {
            a: '',
            msg: '我是父组件爱你',
            count: 10,
            num: ''
        }

    }
    accapt(e) {
        this.setState({
            a: e
        })
    }
    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    addNum = (e) => {
        this.setState({
            num: e
        })
    }
    render() {
        const { count, msg, num } = this.state
        return (<div>
            {/* <h1>react 根组件 </h1> */}
            {/* <h1>count:{count}</h1>
            <h1>num:{num}</h1> */}
            {/* <Demo></Demo>
            // <Demo1></Demo1>
            // <Myevent></Myevent>
            <TickApp></TickApp> */}
            {/* <Child name="xile" handler={e => this.accapt(e)}></Child> */}
            {/* <p>{this.state.a}</p> */}
            {/* <Mystate></Mystate> */}
            {/* <Myprops title="hhhh" msg={msg} count={count} handler1={e => this.accapt(e)} ></Myprops> */}
            {/* 具名插槽  和父传子一样的使用  当做属性使用 */}
            {/* <Slot leftSlot={"我是h1"} centerSlot={"我是h2"} rightSlot={"我是h3"}></Slot> */}
            {/* 默认插槽 */}
            {/* <Slot>
                <h2>我是匿名插槽真好玩啊</h2>
            </Slot> */}
            {/* <Myprops1 count={count}></Myprops1>
            <button onClick={this.addCount}>addCount1</button> */}
            {/* <Myprops2 handlerNum={this.addNum}></Myprops2>
            <MyEventBus></MyEventBus> */}
            {/*  <Myrefs></Myrefs>
            <MyLife></MyLife>
            <Mycontext></Mycontext>
            <Myrefs1></Myrefs1> */}
            {/* <Mycontent1></Mycontent1> */}
            {/* <Mycomment></Mycomment> */}
            {/* <MyBanner></MyBanner> */}
            {/* <Mycomment1></Mycomment1> */}
            {/* <Dialog></Dialog> */}
            {/* <ProCom></ProCom> */}
            {/* <MyApp></MyApp> */}
            {/* <Mycount></Mycount> */}
            {/* <Mobxview></Mobxview> */}
            {/* <RtkView></RtkView> */}
            {/* <YieldView></YieldView> */}
            <HooksView></HooksView>
        </div >)
    }
}

// v-if v-for 实现 object.assign 后面的合并到第一个


export default App