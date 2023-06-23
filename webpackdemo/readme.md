
# 记录项目的开发笔记 

# 封装一个 基于 Webpack 半自动脚手架 

# npm start

# npm run build 

# React 开发笔记
react  FACEBOOK   框架

虚拟DOM  组件化开发  原生JS的框架   (ES6+原生javascript)

优点
1.  极速的渲染能力  虚拟DOM virtual DOM
2.  高度组件化  组件之间高度复用
3.  经历大量的测试  有一定的稳定性


# 虚拟DOM virtual DOM 
虚拟DOM 就是在 真实DOM的基础上建立的一个抽象层  (把存储在javascripts 内存中描述DOM节点的数据 叫做 虚拟DOM ) 
我们对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到真实DOM中    

# diff 算法 (性能优化)
React会在内存中维护一个虚拟DOM树，当我们对这个树进行读或写的时候，实际上是对虚拟DOM进行的。当数据变化时，然后React会自动更新虚拟DOM，然后拿新的虚拟DOM和旧的虚拟DOM进行对比，找到有变更的部分，得出一个Patch，然后将这个Patch放到一个队列里，最终批量更新这些Patch到DOM中。

# fiber 机制   (diff算法 )
# https://www.jianshu.com/p/4eb9acfd47f5
# https://blog.csdn.net/echolunzi/article/details/125586636 
# react fiber是16版本之后的一种更新机制，使用链表取代了树，是一种fiber数据结构 

react 遵循 MIT 协议   开源框架    


react 和  vue  对比 
相同
a. react 和 vue  都有组件化思想  都有虚拟DOM  DIff 算法 
b. react 和 vue  都提供了组件化视图 (compoisible)  响应式数据概念 setState 
c. react 和 vue 都有核心渲染组件的API (Vue.component/React.Component)  都有  路由的概念  相同的路由机制   完整对应的组件生命周期   组件通信交互   各自成熟的生态圈     




不同    
a.  react 通过 javascript xml 来编写组件  vue 通过 template 模板来嵌套组件
b.  vue 比 react 有更快的渲染速度  react比较vue相对复杂的框架 react 适用用业务逻辑超级变态的项目     
c.  数据传递方式不一样  生命周期不一样 渲染模板不一样  数据解析  {react}  {{vue}}  
d.  vue 有指令  react 没有 指令  react 不能自定义指令  不能自定义过滤器    



# React 特点
1.虚拟dom (开发时候不需要在页面中写任何dom元素) victure dom

2.jsx语法(写页面时候使用javascript xml格式的语法)

3.组件化开发(react最核心的思想是将页面中任何一个区域或者元素都
看成是一个组件 Component)

4.单向数据流(组件和后端之间的数据是单向的，从后端流动到react组件中)

5.组件生命周期(任何一个组件在dom中都具有一个完整的生命周期，组件初始化的时候开始，组件被移除的时候消失，从而保证性能的优越) 





# 1
// JSX 语法代码
// 1. 遇到 < 符号 (html) 就以HTML规则解析标签元素
// 2. 遇到 {} 代码块 (变量 执行语句) 就以 JavaScript 规则解析 

# 2 
// 1. 
//    react   16/18  
//    react-dom/client     18    createRoot 
//    javascript/XML  babel-preset-react 处理jsx 
// 2.  
// react.js   react 核心文件  包含了react diff 算法 虚拟DOM 模型 react事件机制  fiber 机制(16)
// 提供创建组件的API  createClass Component  React.Component 

// react-dom.js         封装了操作react 组件API  负责把虚拟DOM 渲染 render 成真实DOM
// ReactDOM.render()=17    createRoot.render=18 

// 3.  babel-preset-react 负责解析 jsx 代码 ,  js内的html代码解析出来返回给浏览器

// 4. 
//  ReactDOM.render(虚拟DOM,真实DOM)
//  ReactDOM.render(<Component/>,app);  16版本 
//  React.createElement()   创建虚拟DOM 
//  createRoot().render()    18版本 


// 5. data-reactroot 表面当前元素是 该组件的顶层标签 
// 任何组件都只能有一个顶层标签  组件首字母必须大写

// 6. jsx 语法规则 
// 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；
// 遇到代码块（以 { 开头），就用 JavaScript 规则解析

// 7. 注释   组件内部注释  
//  { /* <h1>{txt}</h1>  */ }




// 创建组件  component 

// 组件即将一段或几段完成各自功能的代码段封装为一个或几个独立的部分

// 每个组件 能完成独立的功能的，都是独立的部分
// a. React.createClass   老版本   ES5  废弃  react@15  
// b. React.Component   新版本   ES6   class 类  extends 继承  React.Component 父类 
// c. 无状态组件    stateLess component   函数式组件   Hooks 

// 组件名首字母必须大写    任何组件都只有一个顶层标签  

// render 组件生命周期钩子函数   把虚拟DOM 读取出JS内存   然后等待渲染成真实DOM 

// 生命周期阶段  mount(载入)  update(更新) unmount(销毁)

// 自定义函数  handleClick  onClick={this.handleClick}

// 数据传递载体  组件通信  props(属性)   state(状态)=data

// 内联CSS 

# 3
// react 书写 样式 

// 1. 基于class  但是 react 必须 className 代替 class
// 2. 基于内联样式 style  style = {obj}   遵循 驼峰命名 
// style = {backgroundColor:"red",fontSize:20}
// lineHeight:'20px'    必须带单位 
// 3. 全局变量  外部样式  

// classNames 的使用 (动态类名切换)
// 1.引入classnames: import classnames from classnames。


// 2.classnames是一个函数，使用的形式较多，记住常用的使用方法即可：

// （1）传入一个对象：classnames({class1:true,class2:false}) ，true表示相应的class生效，反之false表示不生效。

// （2）接受多个类名：classnames(class1,class2,{ class3:false })

# 4 
// React 事件绑定 
// React 绑定事件  

// 基于原生Js 编写事件    DOM0级事件和DOM2级事件的区别  
// addEventListener("click",fn,true/false);  false/true 冒泡/捕获   默认false 冒泡   DOM2 
// onclick  onchange  onfocus  DOM0
// <p onclick="get()" onclick="login()"></p>

// jquery 
// $("div").on("click")    $("div").off("click")
// $('div').bind('click')  绑定   $('div').unbind('click')

// 事件委托  把事件绑定到父元素上   子元素触发事件   通过事件冒泡  让父元素代替子元素执行冒泡的事件    addEventListener
// $("div").on("click",childnode,fn);
// $("div").delegate(childnode,'click',fn)


// vue
// v-on:click = "get()"      
// @input = "input($event)"  $event 事件对象 


// react 绑定事件  驼峰命名
// onClick
// onChange
// onInput
// onMouseMove
// onMouseDown
// onMouseUp
// onTouchStart
// onTouchMove
// onTouchEnd
// onKeyPress
// onKeyDown
// onKeyUp

// 绑定事件 
// 1. 全局变量 / 外部函数
// 2. 组件内部自定义函数  this 


# 5
// Props 属性  
// State 数据状态 
/*
1. react 数据传递载体  props 属性  state 状态  组件之间数据交互  

2. props
a.  props 默认从组件外部（父组件）传入,props 也能在组件内部初始化定义 
b.  组件内部 通过生命周期钩子函数    App.defaultProps = {} 内部定义props 
c.  props 一般不允许被修改   props 只用来传递数据  read-only 
d.  props 接收  对象 常量 函数  数组  
e.  props 在组件内部 通过 this.props 来获取  key-value   纯函数组件 对象解构获取props 
*/ 

// PropTypes  校验Props 
// optionalArray: PropTypes.array,
// optionalBool: PropTypes.bool,
// optionalFunc: PropTypes.func,
// optionalNumber: PropTypes.number,
// optionalObject: PropTypes.object,
// optionalString: PropTypes.string,
// optionalSymbol: PropTypes.symbol,

// 校验 props 接收正确的格式类型的数据 

# 6 

// state = data 

/*
  state 状态 react 组件数据交互的载体  状态用来修改的  实现数据响应式开发的 
  1. state 不能在组件外部定义  不能在组件外部 修改  只能在组件内部定义声明 只能在内部修改 
  2. state 用来被修改的  this.state 获取 state,     this.setState() 来修改 state 
  3. state 在组件内部的 getInitialState (15 已被废弃)  来初始化定义 state ,必须返回一个对象 
  4. state 修改 setState 这个方法会修改 state 会重新执行 组件内部的 render方法 , 会触发页面的
  二次渲染  虚拟DOM 会根据react 的 diff  算法  得到新的虚拟DOM 最后的批量的更新    

  setState 是同步还是异步  ????    => 异步  面试
  
*/ 

# 7 

/*
 组件之间的通信 
 
 1. 父子 组件 
 <A>
    <B></B>
 </A>
 2. 兄弟组件 
 <A></A><B></B>

 props 传递数据
 state 修改数据 

 父组件如何修改子组件  (Props+Refs)

 父组件把组件的state 当着子组件的props 传递给子组件
 父组件修改 state 会二次render 子组件接收到变化的 props  从而实现子组件修改  

 ref   this.refs  对象获取 
 1. ref 作用于DOM 元素  指向这个真实的DOM元素
 2. ref 作用于组件  指向这个组件对象   


受控组件 Input 绑定了value ==> 必须使用onChange 

3. context

4. EventBus

5. 架构 (Mobx Redux)

*/

# 8 
/*
    组件之间的通信 
    
    1. 父子 组件 
    <A>
        <B></B>
    </A>
    2. 兄弟组件 
    <A></A>
    <B></B>

    props 传递数据
    state 修改数据 


    子组件如何修改父组件
    1. 反向 props  父组件把修改自身变量state的方法 通过 props 传递给子组件 子组件触发 

    
    兄弟组件通信
    1. 中间人模式 (父组件)  子组件A 去修改父组件  父组件再去修改 组件B 
    a. 子改父   反向props(子改父)  + props (父改子)
    b. 子改父   反向props(子改父)  + ref(父改子)


    2. 事件机制  bus 事件总线  event (emit on once)   EventBus EventEmitter  
    emit 发送事件
    on 监听事件
    once 监听一次
    remove 移除事件

    ref   this.refs  对象获取
    1. ref 作用于DOM 元素  指向这个真实的DOM元素    ref="text"  this.refs.text
    2. ref 作用于组件  指向这个组件对象             ref={e=>this.text=e }  this.text   ref={ele=>this.oh=ele}
    
    ref="text"      // this.ref.text 
    ref={ele=>this.oh=ele}   // this.oh 
    text=createRef()    //  
    this.myRef = React.createRef();     // this.myRef.current 

    ref={this.text}

    架构
    flux  redux mobx  event 

    
    受控的Input 组件
    受控的组件    input 绑定动态的 value  value 受state 状态控制的  只有state改变 input才能改变  setState 
    非受控的组件  value 没有绑定状态 
*/ 


# 9 
// React 组件生命周期 
// react 组件生命周期
// 组件的生命周期  (https://segmentfault.com/a/1190000016617400?utm_source=tag-newest)
/*
 react 组件的生命周期
 含义   组件从初始化渲染到被移除或者销毁的过程  成为组件的生命周期

 1. 每个组件都有生命周期
 2. react 通过组件的生命周期钩子函数来管理 组件
 3. 系统 某些状态和参数发生改变的时候，系统立马去通知 对应处理的函数叫做钩子函数
 hooks 钩子函数  允许在特定的时期添加用户自己的代码  不同的阶段添加自己的逻辑代码  (作用)


 react 组件的生命周期 分为三个阶段 
 1.mount  组件的初始化  从虚拟DOM 渲染成为真实DOM 的过程    1  
 2.update   组件的数据变化 setState  组件的state 更新 导致二次渲染的过程     n  
 3.unmount  组件销毁   组件因为路由切换而销毁 (浏览器的垃圾回收机制 )     1  




 mounted 组件载入阶段  (钩子函数  15 16 17 18) 
 0.constructor   class 构造器函数  纯函数组件没有  不是生命周期钩子函数 
 1.getDefaultProps   设置组件默认的props   废弃 16已经被废弃   App.defaultPorps    15 
 2.getInitialState   设置组件默认的state   废弃 16已经被废弃   this.state state = {}  15 
 3.componentWillMount  在jsx被渲染到页面之前被调用  废弃 16尚存  17警告  18废弃 
 3.1  getDerivedStateFromProps ( 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；;每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state)   17新增的 
 4.render   渲染函数是react中默认的函数  虚拟DOM 正在渲染成真实DOM  (虚拟DOM 渲染成 真实DOM 的函数 )
 5.componentDidMount   jsx被渲染到页面后被调用   1    已经全部都是真是DOM  实例化    99.999999  (虚拟DOM 已经渲染成为真实DOM )
 
*/ 
/*
update 组件数据更新阶段  setState  组件修改 state  组件接收的props发送改变  都会进入 update 阶段 
1. componentWillReceiveProps(nextProps)  接收变化的props   废弃 16尚存  17警告   18废弃
2.1 getDerivedStateFromProps  获取最新的state 从 props 
2. shouldComponentUpdate  询问是否更新  true 更新 false 不更新   性能优化  SCU机制
3. componentWillUpdate ==>     组件即将更新之前    废弃 16尚存  17警告 18废弃   
4. render   组件开始二次渲染  update  
4.1 getSnapshotBeforeUpdate  组件更新之前触发 得到旧的props和state    17新增 
5. componentDidUpdate   组件更新渲染数据完毕 

*/ 
// unMount 组件销毁移除 路由切换 
// componentDidCatch     捕获异常 
// componentWillUnmount  这个函数几乎不会使用到，因为浏览器本身具有垃圾回收机制  清除计时器 

# 10 
// context 隔空传递  传送门 
// Context 
// 隔空传递 
// context 隔空传递数据
// 数据嵌套太深  props   
// props 一级一级往里面传递数据    比较麻烦  
// context 隔空传递   this.context 

// redux    
// mobx        运用 context API  
// https://segmentfault.com/a/1190000004636213  

// context 在父组件声明
// 子组件获取 context 

// redux mobx  

// createContext  高级用法 






# React 练功大法
# 1. React API 
# 2. React 架构 (redux )
# 3. React 架构 (react-redux  @react/tookkit + immutable )
# 4. React 架构 (mobx )
# 5. Hooks  (自定义封装)
# 6. 组件库 (antd - antd-mobile antd-pro)
# 7. 脚手架 (umi dva vite create-react-app)
# 8. 项目大融合
# 9. 升天 


# 安装react 脚手架
cnpm i typescript -g

安装脚手架
# create-react-app  
# https://create-react-app.bootcss.com/
cnpm i create-react-app -g     
create-react-app --version    
create-react-app react-app 安装项目   
npx create-react-app@4.0.3 react-app

cd react-app     
npm start    
启动项目 http://localhost:3000/

npx create-react-app my-app --template typescript
npx create-react-app react-app 
create-react-app react-app --template typescript
npx create-react-app react-app --template typescript

# dva (https://dvajs.com/guide/getting-started.html)
cnpm install dva-cli -g 
dva -v 
dva new dva-app 
cd dva-app 
npm start
http://localhost:8000/



# umi (https://umijs.org/zh-CN/docs/getting-started)
mkdir umiapp 
cd umiapp 
npx @umijs/create-umi-app
yarn create @umijs/umi-app (失败)

cnpm i   反向安装 
npm start


# vite - react  (https://vitejs.cn)
yarn create @vitejs/app
yarn create vite myvite --template react
yarn create vite viteapp --template react-ts
cd myapp
cnpm i
npm start 

react的本质工作就是:把数据装换成UI


函数式组件和类组件的区别？
1.函数组件没有状态 性能更好 
2.类组件有生命周期,有this

# redux 总结  
## redux 使用  
1.组件通过store.getState() 进行访问数据
2.组件需要通过store.subscribe()订阅组件render的过程,才能监听到数据更新
3.在视图页面dispatch到action,action分发到reducer执行对应的操作,视图更新
4.使用常量,后续只需要在action重新声明常量,在reducer写方法即可
## react-redux
1.需要组件通过Provider store={store}进行提供数据,组件才能访问
2.使用connect高阶函数打通state到props,
3.使用mapStateToProps进行分发state,后续在组件的props接受即可
4.使用mapDispatchToProps进行分发操作数据的方法,在组件的props接受即可使用
5.视图页面使用dispatch,action分发到reducer执行对应的操作,视图更新
6,使用常量,后续在action继续声明常量,在reducer写方法即可
## mobx
1.直接定义数据,使用@observable定义数据,@action定义修改数据的方法,@computed定义计算属性,
直接打通数据到视图,省去中间的分发环节,导出时  new Data() 
2.视图页面直接结构Data,拿到对应的数据和方法,添加@observer 让视图能响应数据变化

## redux toolkeit 
1.创建store 使用configerStore,同样也是将reducer与store进行关联,写在reducer内,在组件上通过Provider store={store}分发
2.reducer,使用createSlice创建切片, 包含命名空间name,initialState初始化值,reducers同步方法action,异步方法extraReducers
3.默认导出count.reducer到store中,导出action,使用结构和actions
4.异步方法使用createAsyncThunk,命名空间方法名(不涉及方法名的引用),异步函数 async ()=>{},在extraReducers:(builder)=> builder 中 添加addCase(方法名.状态)来监听
5.在视图中使用hooks进行引入, useSelector获取state进行解构获取,useDispatch得到dispatch,进行调用方法


## 总结
从redux,使用subscribe订阅数据变化,getState()获取数据,dispatch操控数据,
到react-redux简化这一流程,只需要通过provider进行提供,mapStateToProps,mapDispatchToProps进行分发,
在props内获取.
到mobx,直接打通数据到视图,简化中间的流程,使用@obserable定义数据,@action定义方法,@observer监听数据变化
rtk,同样也是将action到reducer的中间环节进行缩减.
逐渐将流程简化

