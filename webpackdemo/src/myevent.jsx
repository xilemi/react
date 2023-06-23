class Myevent extends Component {
    constructor() {
        super()
        console.log(this);
    }
    handlerChange(e) {
        console.log(e);
    }
    handlerInput(e) {
        console.log(e);
    }
    handlerChange1(e, a, b, c) {
        console.log(e);
        console.log(a, b, c);
    }
    handlerChange2(val) {
        console.log(val);
    }
    handlerClick() {
        console.log(this);
    }
    render() {
        return (
            <div>
                {/* input事件和change 事件相同的  而且优先使用 change 事件 */}
                <input type="text" placeholder="change" onChange={this.handlerChange} />
                <input type="text" placeholder="input" onInput={this.handlerInput} />
                {/* 事件绑定和传参 使用箭头函数添加event实参  */}
                <input type="text" onChange={() => this.handlerChange1(event, 1, 2, 3)} />
                {/* 事件绑定和传参 使用箭头函数 */}
                <input type="text" onChange={() => this.handlerChange2(event.target.value)} />
                {/* this 指向的问题  直接调用函数this 会是undefined*/}
                <button onClick={this.handlerClick}>this指向会是undefined</button>
                <button onClick={() => console.log(this)}>使用箭头函数改变this指向</button>
                <button onClick={this.handlerClick.bind(this)}>使用bind改变函数this指向,得到新的函数</button>
            </div >
        );
    }
}
// input 和change 事件相同    优先使用change
export default Myevent;