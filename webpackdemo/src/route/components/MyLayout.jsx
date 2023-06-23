import { Outlet } from "react-router-dom"
import MainLayout from "./MainLayout.jsx"
export default class MyLayout extends Component {
    render() {
        return (
            <div>
                <h2>
                    布局
                </h2>
                <hr />
                {/* 对划出的区域进行选择路由模式  hash 或者 history */}
                {/* <Hash>
                </Hash> */}
                <MainLayout></MainLayout>
            </div>
        )
    }
}
