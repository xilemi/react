import PropTypes from 'prop-types'
class Child extends Component {
    constructor(props) {
        // 子组件 通过props 接收父组件传递过来的值
        super(props);
        console.log(props)
        this.state = {
            msg: "hhhh"
        }
    }
    handlerClick() {
        // 通过一个自定义事件方法把数据携带过去 在父组件的位置 使用自定义事件调用函数接收值
        this.props.handler(this.state.msg)
    }
    render() {
        return (
            <div>我是子组件
                <button onClick={e => this.handlerClick()}>我要传值</button>
            </div>

        );
    }
}

export default Child;
