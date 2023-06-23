import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import "../style/index.scss"
import { NavBar, Space, Toast, Popover } from 'antd-mobile'
import { useCommonFunc, useLocalData } from '../hooks'
import { useLoaderData, useLocation } from 'react-router-dom'
import {
    SearchOutline, MoreOutline, AntOutline,
    HandPayCircleOutline,
    ScanningOutline,
    TransportQRcodeOutline,
} from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/popover'
const MyHeader: FC<{ backArrow?: any, title: string, back?: string, onback?: any }> = ({ back, backArrow, title, onback }) => {
    const { pathname } = useLocation()
    const actions: Action[] = [
        { key: '/index/home', icon: <ScanningOutline />, text: '首页', disabled: pathname == "/index/home" },
        { key: '/login', icon: <TransportQRcodeOutline />, text: '登录', disabled: pathname == "/login" },
        { key: '/reg', icon: <AntOutline />, text: '注册', disabled: pathname == "/reg" },
        { key: '/index/mine', icon: <HandPayCircleOutline />, text: '个人中心', disabled: pathname == "/index/mine" },
    ]
    const actionClick = (node) => {
        gotopage(node.key)
    }
    const rights = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                {
                    pathname == "/index/serach" ? "" : <SearchOutline onClick={() => gotopage("/index/serach")} />
                }
                <Popover.Menu
                    mode='dark'
                    actions={actions}
                    placement='bottom-end'
                    trigger='click'
                    onAction={(node) => actionClick(node)}
                >
                    <MoreOutline ></MoreOutline>
                </Popover.Menu>
            </Space>
        </div >
    )
    const { gotopage } = useCommonFunc()
    // 右边默认是更多和搜索  左边可选文字和箭头


    return (
        <>
            <NavBar right={rights} onBack={onback ? onback : () => gotopage(-1)} backArrow={backArrow} back={back}>
                {title}
            </NavBar>

        </>
    )
}

export default MyHeader