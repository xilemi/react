// 全局路由
import routes from "./Main/routes"
const router = [
    { path: "/", redirect: '/login' },
    { path: '/login', component: '@/pages/Login/Login' },
    { path: '/loginpro', component: '@/pages/Login/LoginPro' },
    { path: "/reg", component: "@/pages/Reg/Reg" },
    { path: "/findpass", component: "@/pages/FindPass/FindPass" },
    {
        path: "/main",
        component: "@/pages/Main/Main",
        // routes: [
        //     {
        //         path: '/main',
        //         redirect: "/main/home"
        //     },
        //     {
        //         path: "/main/home",
        //         component: '@/pages/Main/Home/Home'
        //     },
        //     {
        //         path: "/main/map",
        //         component: '@/layouts/second',
        //         routes: [
        //             {
        //                 path: '/main/map/baidu',
        //                 component: "@/pages/Main/Map/Baidu"
        //             },
        //             {
        //                 path: '/main/map/geo',
        //                 component: "@/pages/Main/Map/Geo"
        //             }
        //         ]
        //     },
        //     {
        //         path: "/main/user",
        //         component: '@/layouts/second',
        //         routes: [
        //             {
        //                 path: '/main/user/list',
        //                 component: "@/pages/Main/User/UserList"
        //             },
        //             {
        //                 path: '/main/user/add',
        //                 component: "@/pages/Main/User/UserAdd"
        //             },
        //             {
        //                 path: '/main/user/data',
        //                 component: "@/pages/Main/User/UserData"
        //             },

        //         ]
        //     },
        //     {
        //         path: '/main/role',
        //         component: '@/layouts/second',
        //         routes: [
        //             {
        //                 path: '/main/role/rolelist',
        //                 component: "@/pages/Main/Roles/RoleList"
        //             },
        //             {
        //                 path: '/main/role/roleadd',
        //                 component: "@/pages/Main/Roles/RoleAdd"
        //             },
        //         ]
        //     },
        //     {
        //         path: '/main/anno',
        //         component: '@/layouts/second',
        //         routes: [
        //             {
        //                 path: '/main/anno/addaoon',
        //                 component: "@/pages/Main/Anno/AddAnno",
        //             },
        //             {
        //                 path: '/main/anno/listanno',
        //                 component: "@/pages/Main/Anno/ListAnno",
        //             },
        //         ]
        //     },
        //     {
        //         path: '*',
        //         redirect: '/404'
        //     },

        // ]
        routes
    },
    {
        path: "/404",
        component: '@/pages/Badserver/NotFound'
    },
    {
        path: '/503',
        component: '@/pages/Badserver/BadServer'
    },
    {
        path: '*',
        redirect: '/404'
    },
]





export default router