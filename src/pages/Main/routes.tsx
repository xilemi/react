
import { HomeOutlined, GlobalOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

const routes = [
    {
        path: "/main/home",
        name: '首页',
        component: "@/pages/Main/Home/Home",
        icon: <HomeOutlined />,
        role: 1
    },
    {
        path: "/main/map",
        name: '地图',
        component: '@/layouts/second',
        icon: <GlobalOutlined />,
        role: 1,
        routes: [
            {
                path: '/main/map/baidu',
                component: "@/pages/Main/Map/Baidu",
                name: '百度地图',
                role: 1
            },
            {
                path: '/main/map/geo',
                component: "@/pages/Main/Map/Geo",
                name: '高德地图',
                role: 1
            }
        ]
    },
    {
        path: '/main/role',
        name: '用户权限',
        component: '@/layouts/second',
        icon: <UserOutlined />,
        role: 999,
        routes: [
            {
                path: '/main/role/roleadd',
                name: '添加角色',
                component: "@/pages/Main/Roles/RoleAdd",
                role: 999
            },
        ]
    },
    {
        path: '/main/user',
        component: '@/layouts/second',
        name: '用户管理',
        icon: <MessageOutlined />,
        role: 4,
        routes: [
            {
                path: '/main/user/list',
                component: "@/pages/Main/User/UserList",
                name: '用户列表',
                role: 4,
            },
            {
                path: '/main/user/add',
                component: "@/pages/Main/User/UserAdd",
                name: '用户新增',
                role: 4,
            },
            {
                path: '/main/user/data',
                component: "@/pages/Main/User/UserData",
                name: '用户分析',
                role: 4,
            },
        ]
    },

    {
        path: '/main/cart',
        component: '@/layouts/second',
        name: '车辆管理',
        icon: <MessageOutlined />,
        role: 5,
        routes: [
            {
                path: '/main/cart/add',
                component: "@/pages/Main/Cart/Add",
                name: '车辆上架',
                role: 5,
            },
        ]
    },
    {
        path: '/main/money',
        component: '@/layouts/second',
        name: '资金管理',
        icon: <MessageOutlined />,
        role: 6,
        routes: [
            {
                path: '/main/money/change',
                component: "@/pages/Main/Money/Change",
                name: '资金新增',
                role: 6,
            },
            {
                path: '/main/money/data',
                component: "@/pages/Main/Money/Data",
                name: '资金分析',
                role: 6,
            },
            {
                path: '/main/money/list',
                component: "@/pages/Main/Money/List",
                name: '资金记录',
                role: 6,
            },
        ]
    },
    {
        path: '/main/sales',
        component: '@/layouts/second',
        name: '销售管理',
        icon: <MessageOutlined />,
        role: 5,
        routes: [
            {
                path: '/main/sales/order',
                component: "@/pages/Main/Sales/Order",
                name: '销售订单',
                role: 5,
            },
            {
                path: '/main/sales/aftersale',
                component: "@/pages/Main/Sales/AfterSale",
                name: '售后管理',
                role: 5,
            },
            {
                path: '/main/sales/data',
                component: "@/pages/Main/Sales/Data",
                name: '数据分析',
                role: 7,
            },
        ]
    },
    {
        path: '/main/advise',
        component: '@/layouts/second',
        name: '建议管理',
        icon: <MessageOutlined />,
        role: 1,
        routes: [

            {
                path: '/main/advise/add',
                component: "@/pages/Main/Advise/AdviseAdd",
                name: '建议新增',
                role: 1,
            },
            {
                path: '/main/advise/list',
                component: "@/pages/Main/Advise/AdviseList",
                name: '建议列表',
                role: 1,
            },

        ]
    },

    {
        path: '/main/anno',
        component: '@/layouts/second',
        name: '系统公告',
        icon: <MessageOutlined />,
        role: 4,
        routes: [
            {
                path: '/main/anno/addanno',
                component: "@/pages/Main/Anno/AddAnno",
                name: '添加公告',
                role: 4,
            },
            {
                path: '/main/anno/listanno',
                component: "@/pages/Main/Anno/ListAnno",
                name: "公告列表",
                role: 4,
            },
        ]
    },
    {
        path: '/main/settings',
        component: '@/layouts/second',
        name: '系统设置',
        icon: <MessageOutlined />,
        role: 999,
        routes: [
            {
                path: '/main/settings/annotype',
                component: "@/pages/Main/Settings/AnnoType",
                name: '公告类型',
                role: 999,
            },
            {
                path: '/main/settings/carttype',
                component: "@/pages/Main/Settings/CartType",
                name: '车辆类型',
                role: 999,
            },
            {
                path: '/main/settings/advisetype',
                component: "@/pages/Main/Settings/AdviseType",
                name: '建议类型',
                role: 999,
            },
            {
                path: '/main/settings/moneytype',
                component: "@/pages/Main/Settings/MoneyType",
                name: '资金类型',
                role: 999,
            },
        ]
    },
    {
        path: '/main/mine',
        component: '@/pages/Main/Mine/Mine',
        name: '个人中心',
        icon: <MessageOutlined />,
        role: 1,
    },
]



export default routes