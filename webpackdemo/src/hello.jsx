class Hello extends Component {
    render() {
        return (
            <div>
                我是hello组件
            </div>
        );
    }
    componentWillUnmount() {
        console.log("即将被卸载");
    }
}

export default Hello;