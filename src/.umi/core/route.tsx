// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/login","parentId":"@@/global-layout","id":"1"},"2":{"path":"/login","parentId":"@@/global-layout","id":"2"},"3":{"path":"/reg","parentId":"@@/global-layout","id":"3"},"4":{"path":"/findpass","parentId":"@@/global-layout","id":"4"},"5":{"path":"/main","parentId":"@@/global-layout","id":"5"},"6":{"path":"home","parentId":"5","id":"6"},"7":{"path":"test","parentId":"5","id":"7"},"8":{"path":"*","redirect":"/404","parentId":"5","id":"8"},"9":{"path":"/404","parentId":"@@/global-layout","id":"9"},"10":{"path":"/503","parentId":"@@/global-layout","id":"10"},"11":{"path":"*","redirect":"/404","parentId":"@@/global-layout","id":"11"},"@@/global-layout":{"id":"@@/global-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Login__Login" */'@/pages/Login/Login.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Reg__Reg" */'@/pages/Reg/Reg.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__FindPass__FindPass" */'@/pages/FindPass/FindPass.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__Main__Main" */'@/pages/Main/Main.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__Main__Home__Home" */'@/pages/Main/Home/Home.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__Main__Home__Test" */'@/pages/Main/Home/Test.tsx')),
'8': React.lazy(() => import( './EmptyRoute')),
'9': React.lazy(() => import(/* webpackChunkName: "p__Badserver__NotFound" */'@/pages/Badserver/NotFound.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "p__Badserver__BadServer" */'@/pages/Badserver/BadServer.tsx')),
'11': React.lazy(() => import( './EmptyRoute')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/xile/Desktop/react/umi4/src/layouts/index.tsx')),
},
  };
}
