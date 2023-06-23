import { BrowserRouter as Router, HashRouter as Hash, Routes, Route, Outlet, NavLink, Navigate, useSearchParams, useParams } from 'react-router-dom';
import "../styles/style.scss"
// 正常加载
import Loading from './components/Loading.jsx';
import MyLayout from './components/MyLayout.jsx';
// 使用懒加载

import React, { Component, Suspense, lazy } from 'react'

export default class MyApp extends Component {
    // 根组件 
    render() {
        return (
            <div>
                <h1>根组件</h1>
                {/* 对根组件进行划分 分出一块作为动态展示的区域 */}
                {/*  */}
                <Hash>
                    <Suspense fallback={<Loading />}>
                        <MyLayout></MyLayout>
                    </Suspense>
                </Hash>
            </div>
        )
    }
}

//





// 有传参   ?   query useSearchParams : 对应  params   useParams