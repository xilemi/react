import Hello from "./hello.jsx";
class TickApp extends Component {
    constructor() {
        super();
        console.log("constructor", this);
        this.state = {
            message: 'xile',
            flag: true
        }
    }
    changeMsg() {
        this.setState({
            message: 'hhhh'
        })
    }
    changeFlag() {
        this.setState({
            flag: !this.state.flag
        })
    }
    render() {
        console.log("render", this);
        const { message, flag } = this.state
        return (
            <div>
                <p>生命周期</p>
                <button onClick={() => this.changeMsg()}>改变内容</button>
                <h2>{message}</h2>
                <button onClick={() => this.changeFlag()}>切换显示</button>
                {flag && <Hello></Hello>}
            </div>
        );
    }
    componentDidMount() {
        // 发送请求在这里
        console.log("被挂载");
    }
    componentDidUpdate() {
        console.log("页面更细了 会在执行一次render");
    }

}

// 生命周期   constructor render 阶段  
export default TickApp;