import { BrowserRouter as Router, HashRouter as Hash, Routes, Route, Outlet, NavLink, Navigate, useSearchParams, useParams, useRoutes, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import React from 'react';
import UserInfo from './Home/Mine/UserInfo';
const Login = lazy(() => import("./Login/Login"))
const Reg = lazy(() => import("./Reg/Reg"))
const BadServer = lazy(() => import("./BadPages/BadServer"))
const NotFound = lazy(() => import("./BadPages/NotFound"))
const Index = lazy(() => import("./Home/Index"))
const Home = lazy(() => import("./Home/Home"))
const Find = lazy(() => import("./Home/Find/Find"))
const News = lazy(() => import("./Home/News/News"))
// const NewsDetail = lazy(() => import("./Home/News/NewsDetail"))
import NewsDetail from './Home/News/NewsDetail';
import findRoutes from './Home/Find/findRoutes';
const Mine = lazy(() => import("./Home/Mine/Mine"))
const FindPass = lazy(() => import("../pages/FindPass/FindPass"))
const Guide = lazy(() => import("../pages/Guide/Guide"))
const Search = lazy(() => import("../pages/Home/Search"))

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
                path: '/guide',
                element: <Guide />
            },
            {
                path: "/index",
                element: <Index />,
                children: [
                    {
                        path: '/index',
                        element: <Navigate to='/index/home' />
                    },
                    {
                        path: '/index/home',
                        element: <Home />
                    },
                    {
                        path: '/index/find',
                        element: <Find />,
                    },
                    {
                        path: '/index/news',
                        element: <News />
                    },
                    {
                        path: '/index/mine',
                        element: <Mine />
                    },
                    {
                        path: '/index/serach',
                        element: <Search />
                    },
                    {
                        path: '/index/userinfo',
                        element: <UserInfo />
                    },
                    {
                        path: '/index/newsdetail/:id',
                        element: <NewsDetail />
                    },
                    ...findRoutes,
                ]
            },
            {
                path: '/404',
                element: <NotFound />
            },
            {
                path: '/503',
                element: <BadServer />
            },
            {
                path: '*',
                element: <Navigate to="/404" />
            }
        ])
    )
}
const MainRouter = () => {
    return useRoutes([
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
            path: '/guide',
            element: <Guide />
        },
        {
            path: "/index",
            element: <Index />,
            children: [
                {
                    path: '/index',
                    element: <Navigate to='/index/home' />
                },
                {
                    path: '/index/home',
                    element: <Home />
                },
                {
                    path: '/index/list',
                    element: <List />
                },
                {
                    path: '/index/car',
                    element: <Car />
                },
                {
                    path: '/index/mine',
                    element: <Mine />
                },
                {
                    path: '/index/serach',
                    element: <Search />
                }
            ]
        },
        {
            path: '/404',
            element: <NotFound />
        },
        {
            path: '/503',
            element: <BadServer />
        },
        {
            path: '*',
            element: <Navigate to="/404" />
        }
    ])
}


export default LayoutRouter