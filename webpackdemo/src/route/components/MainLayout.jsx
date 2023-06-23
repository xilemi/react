import { BrowserRouter as Router, HashRouter as Hash, Routes, Route, Outlet, NavLink, Navigate, useSearchParams, useParams, useRoutes } from 'react-router-dom';
import { Home, User, Reg, FindPass, Car, Mine, Login } from './page.jsx';

import React, { Component, Suspense, lazy } from 'react'
const List = lazy(() => import("../components/page.jsx"))

//相当于一个组件 
const GetRoute = () => {
    return useRoutes([
        { path: '/login', element: <Login /> },
        { path: '/reg', element: <Reg /> },
        { path: '/findpass', element: <FindPass /> },
        {
            path: '/user', element: <User />, children: [
                { path: "/user", element: <Navigate to="/user/home" /> },
                { path: "/user/home/:username?/:passwd?", element: <Home /> },
                { path: '/user/list', element: <List /> },
                { path: '/user/car', element: <Car /> },
                { path: '/user/mine', element: <Mine /> }
            ]
        },
    ])
}


const GetRoutes = (routes) => {
    return routes.map((item, index) => {
        if (item.children) {
            return <Route path={item.path} element={item.element} key={index} >
                {GetRoutes(item.children)}
            </Route>
        } else {
            return <Route path={item.path} element={item.element} key={index} />
        }
    })
}
// console.log(GetRoutes(routes));
const MainLayout = () => {
    // 主视图内写路由
    return (
        <div>
            <h3>主视图</h3>
            {/* 配置路由   使用routes标签包裹   路由写在  route 内  也可以进行嵌套  
                path  路径   element  视图  Navigate重定向 写在 element内  
                路由嵌套 在 route 再写 子路由 
            */}
            {/* 子路由   path 写全   重定向  必须写全 */}
            {/*动态路由  使用params  传参 :id 留坑位    使用 query  不需要留 直接传入即可 */}
            {/* <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/reg' element={<Reg />} />
                <Route path='/findpass' element={<FindPass />} />
                <Route path='/user' element={<User />} >
                    <Route path='/user' element={<Navigate to='/user/home' />} />
                    <Route path='/user/home/:username?/:passwd?' element={<Home />} />
                    <Route path='/user/list' element={<List />} />
                    <Route path='/user/car' element={<Car />} />
                    <Route path='/user/mine' element={<Mine />} />
                </Route>
            </Routes> */}
            {/* <GetRoute></GetRoute> */}
            <Routes>
                {GetRoutes(routes)}
            </Routes>
        </div>
    )
}

const routes = [
    { path: '/login', element: <Login /> },
    { path: '/reg', element: <Reg /> },
    { path: '/findpass', element: <FindPass /> },
    {
        path: '/user', element: <User />, children: [
            { path: "/user", element: <Navigate to="/user/home" /> },
            { path: "/user/home/:username?/:passwd?", element: <Home /> },
            { path: '/user/list', element: <List /> },
            { path: '/user/car', element: <Car /> },
            { path: '/user/mine', element: <Mine /> }
        ]
    },
]


export default MainLayout