// 全局路由



const routes=[
    {
        path:'/',
        component:'@/pages/index',
        routes: [
            { path: '/login', component: '@/pages/Login/Login' },
            {path:"/reg",component:"@/pages/Reg/Reg"},
            {path:"/findpass",component:"@/pages/FindPass/FindPass"},
            {path:"/main",component:"@/pages/Main/Main",routes:[
                {
                    path:"home",
                    component:'@/pages/Main/Home/Home'
                },{
                    path:'*',
                    redirect:'/404'
                },

            ]},

            {path:"/",redirect:'/login'},
            {
                path:"/404",
                component:'@/pages/Badserver/NotFound'
            },
             {
                path:'/503',
                component:'@/pages/Badserver/BadServer'
            },
            {
                path:'*',
                redirect:'/404'
            },
          ],
    },
    {
        path:'*',
        redirect:'/404'
    },
]





export default routes