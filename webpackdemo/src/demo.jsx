import classNames from "classnames"
import { Component } from "react"
import "../src/styles/index.css"
const styles = {
    sz: {
        fontSize: 50,
        height: 80,
        width: "100%",

    },
    bd: {
        backgroundColor: "red",
        borderRadius: 15,
        border: '10px solid #ddd',
    }
}


export class Demo extends Component {
    render() {
        return (

            <div style={{ color: "red" }}>
                style 以对象的方式,驼峰命名,数字可以不带单位
            </div>
        )
    }
}
export class Demo1 extends Component {
    constructor() {
        super()
        this.state = {
            flag: false
        }
    }
    changeClass() {
        this.setState({
            flag: !this.state.flag
        })
    }
    render() {
        const { flag } = this.state
        return (
            <div>
                <h2 className="title">react 使用className 替换class 写静态的 </h2>
                <h2 style={styles.sz}>
                    style 内的样式 在外部以对象的形式写好
                </h2>
                <h2 style={Object.assign({}, styles.sz, styles.bd)}>
                    多个对象合并
                </h2>
                <h2 style={{ ...styles.sz, ...styles.bd }}>
                    使用三点运算,新插件都已经支持
                </h2>
                <h2 className={classNames({ title: !flag, header: flag })}>
                    className结合classNames实现动态绑定
                    <button onClick={() => this.changeClass()}>切换样式</button>
                </h2>
                {/* <h2 style={classNames("title", { header: false })}>
                    style 和classnames报错
                </h2> */}
                <h2 className={classNames("styles.bd")}>
                    测试classnames 引用对象内的不生效
                </h2>
                <h2>
                    总结:
                    1.使用className 实现class的效果
                    2.style={ } 内部写对象  驼峰命名 数字不写单位 可以在外部定义样式对象 直接在style 内部展开,新版已经支持
                    3.classnames 配合className 实现动态切换样式  不能和style 使用
                </h2>
            </div>
        )
    }
}