// 全局路由

const routes = [
    { path: "/", redirect: '/login' },
    { path: '/login', component: '@/pages/Login/Login' },
    { path: "/reg", component: "@/pages/Reg/Reg" },
    { path: "/findpass", component: "@/pages/FindPass/FindPass" },
    {
        path: "/main", component: "@/pages/Main/Main", routes: [
            {
                path: "home",
                component: '@/pages/Main/Home/Home'
            }, 
            {
                path: "test",
                component: '@/pages/Main/Home/Test'
            },
            {
                path: '*',
                redirect: '/404'
            },

        ]
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





export default routes