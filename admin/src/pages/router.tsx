import {  lazy } from "react"
import {  Navigate, useRoutes } from "react-router-dom"
const Login=lazy(()=>import("../pages/Login/Login"))
const Reg=lazy(()=>import("../pages/Reg/Reg"))
const FindPass=lazy(()=>import("../pages/Reg/FindPass"))
const Index=lazy(()=>import("../pages/Home/Index"))
const BadServer=lazy(()=>import("../pages/BadPage/BadServer"))
const NotFound=lazy(()=>import("../pages/BadPage/NotFound"))
const Main=lazy(()=>import("./Home/Main"))
const LayoutRouter = () => {
    return (
        useRoutes([
            {
                path: '/',
                element: <Navigate to='/index' />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/reg',
                element: <Reg />
            },
            {
                path: '/findpass',
                element: <FindPass />
            },
            {
                path:'/index',
                element:<Index/>,
                children:[
                    {
                        path:'/index/main',
                        element:<Main/>
                    },
                    {
                        path:"/index",
                        element:<Navigate to="/index/main"/>
                    }
                ]
            },
            {
                path:"/404",
                element:<NotFound/>
            },
            {
                path:"/503",
                element:<BadServer/>
            },
            {
                path:"*",
                element:<Navigate to="/404"/>
            }
        ])
    )
}
export default LayoutRouter