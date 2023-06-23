import Contents from "./Components/contents";
import Footer from "./Components/footer";
import Header from "./Components/header";
import { Component } from "react";
// 根组件 
class App extends Component {
  state = {}
  // 必须实现
  render() {
    return (
      <div>
        <Header></Header>
        <Contents>

        </Contents>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;

