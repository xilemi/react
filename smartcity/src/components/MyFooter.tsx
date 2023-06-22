import React from 'react'
import { Badge, TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import { NavLink } from 'react-router-dom'
import "../style/foot.scss"
function MyFooter() {
    const list = [
        {
            path: '/index/home',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            path: '/index/find',
            title: '发现',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            path: '/index/news',
            title: '新闻',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            path: '/index/mine',
            title: '我的',
            icon: <AppOutline />,
            badge: Badge.dot,
        },

    ]
    return (
        <div className='navCommon'>
            <div className='foot'>
                {
                    list.map(item => {
                        return <NavLink to={item.path} key={item.path}>
                            <i>{item.icon}</i>
                            <span>{item.title}</span>
                        </NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default MyFooter