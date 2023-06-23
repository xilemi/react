import { BrowserRouter as Router, HashRouter as Hash, Routes, Route, Outlet, NavLink, Navigate, useSearchParams, useParams } from 'react-router-dom';
export const Login = () => {
    return (
        <div>
            <h2>Login-Login</h2>
        </div>
    )
}
export const Reg = () => {
    return (
        <div>
            <h2>Reg-Reg</h2>
        </div>
    )
}
export const FindPass = () => {
    return (
        <div>
            <h2>FindPass-FindPass</h2>
        </div>
    )
}
export const User = () => {
    return (
        <div>
            <h2>User-User</h2>
            {/* 二级 路由  */}
            <div className='navlink'>
                {/*可穿可不穿 */}
                <NavLink to="/user/home/xile/123123">首页</NavLink>
                <NavLink to="/user/list?proid=123123">列表</NavLink>
                <NavLink to="/user/car">购物车</NavLink>
                <NavLink to="/user/mine">我的</NavLink>
            </div>
            <hr />
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export const Home = () => {
    const params = useParams()
    console.log(params);
    return (
        <div>
            <h4>Home-Home</h4>
            <h2>{params.username}</h2>
            <h2>{params.passwd}</h2>
        </div>
    )
}
export const Car = () => {
    return (
        <div>
            <h4>Car-Car</h4>
        </div>
    )
}
export const Mine = () => {
    return (
        <div>
            <h4>Mine-Mine</h4>
        </div>
    )
}
const List = () => {
    // 使用query 传参  先用  [query] 接受  为什么 ?
    // 使用的get(key)  方法 获取传递的参数   
    const [query] = useSearchParams()
    console.log();
    return (
        <div>
            <h4>List-List</h4>
            <h2>{query.get("proid")}</h2>
            {
                [1, 2, 4, 5, 6, 1, 7, 8, 9, 9, 9, 0, 0, 9, 56, 745, 1, 3, 3, 1, 56, 6, 7563, 3, 2, 2, 2, 2, 2, 3245, 5, 4, 455, 64, 66345345, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 111111111, 1, 1, 1, 1, 1, 1, , 1, 1, 1, , 1, 1, 1, , 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, , 1, 1, 1, 1,].map((item, index) => {
                    return <h3 key={index}>{item}</h3>
                })
            }
        </div>
    )
}
export default List