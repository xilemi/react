// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/login","parentId":"@@/global-layout","id":"1"},"2":{"path":"/login","parentId":"@@/global-layout","id":"2"},"3":{"path":"/loginpro","parentId":"@@/global-layout","id":"3"},"4":{"path":"/reg","parentId":"@@/global-layout","id":"4"},"5":{"path":"/findpass","parentId":"@@/global-layout","id":"5"},"6":{"path":"/main","parentId":"@@/global-layout","id":"6"},"7":{"path":"/main/home","name":"首页","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":1,"parentId":"6","id":"7"},"8":{"path":"/main/map","name":"地图","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":1,"parentId":"6","id":"8"},"9":{"path":"/main/map/baidu","name":"百度地图","role":1,"parentId":"8","id":"9"},"10":{"path":"/main/map/geo","name":"高德地图","role":1,"parentId":"8","id":"10"},"11":{"path":"/main/role","name":"用户权限","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":999,"parentId":"6","id":"11"},"12":{"path":"/main/role/roleadd","name":"添加角色","role":999,"parentId":"11","id":"12"},"13":{"path":"/main/user","name":"用户管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":4,"parentId":"6","id":"13"},"14":{"path":"/main/user/list","name":"用户列表","role":4,"parentId":"13","id":"14"},"15":{"path":"/main/user/add","name":"用户新增","role":4,"parentId":"13","id":"15"},"16":{"path":"/main/user/data","name":"用户分析","role":4,"parentId":"13","id":"16"},"17":{"path":"/main/cart","name":"车辆管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":5,"parentId":"6","id":"17"},"18":{"path":"/main/cart/add","name":"车辆上架","role":5,"parentId":"17","id":"18"},"19":{"path":"/main/money","name":"资金管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":6,"parentId":"6","id":"19"},"20":{"path":"/main/money/change","name":"资金新增","role":6,"parentId":"19","id":"20"},"21":{"path":"/main/money/data","name":"资金分析","role":6,"parentId":"19","id":"21"},"22":{"path":"/main/money/list","name":"资金记录","role":6,"parentId":"19","id":"22"},"23":{"path":"/main/sales","name":"销售管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":5,"parentId":"6","id":"23"},"24":{"path":"/main/sales/order","name":"销售订单","role":5,"parentId":"23","id":"24"},"25":{"path":"/main/sales/aftersale","name":"售后管理","role":5,"parentId":"23","id":"25"},"26":{"path":"/main/sales/data","name":"数据分析","role":7,"parentId":"23","id":"26"},"27":{"path":"/main/advise","name":"建议管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":1,"parentId":"6","id":"27"},"28":{"path":"/main/advise/add","name":"建议新增","role":1,"parentId":"27","id":"28"},"29":{"path":"/main/advise/list","name":"建议列表","role":1,"parentId":"27","id":"29"},"30":{"path":"/main/attendance","name":"考勤管理","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":1,"parentId":"6","id":"30"},"31":{"path":"/main/attendance/clockin","name":"考勤打卡","role":1,"parentId":"30","id":"31"},"32":{"path":"/main/attendance/list","name":"考勤列表","role":1,"parentId":"30","id":"32"},"33":{"path":"/main/attendance/data","name":"考勤分析","role":1,"parentId":"30","id":"33"},"34":{"path":"/main/banner","name":"轮播设置","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":3,"parentId":"6","id":"34"},"35":{"path":"/main/banner/banneradd","name":"轮播添加","role":5,"parentId":"34","id":"35"},"36":{"path":"/main/banner/bannershow","name":"轮播展示","role":1,"parentId":"34","id":"36"},"37":{"path":"/main/anno","name":"系统公告","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":4,"parentId":"6","id":"37"},"38":{"path":"/main/anno/addanno","name":"添加公告","role":4,"parentId":"37","id":"38"},"39":{"path":"/main/anno/listanno","name":"公告列表","role":4,"parentId":"37","id":"39"},"40":{"path":"/main/settings","name":"系统设置","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":999,"parentId":"6","id":"40"},"41":{"path":"/main/settings/annotype","name":"公告类型","role":999,"parentId":"40","id":"41"},"42":{"path":"/main/settings/carttype","name":"车辆类型","role":999,"parentId":"40","id":"42"},"43":{"path":"/main/settings/advisetype","name":"建议类型","role":999,"parentId":"40","id":"43"},"44":{"path":"/main/settings/moneytype","name":"资金类型","role":999,"parentId":"40","id":"44"},"45":{"path":"/main/mine","name":"个人中心","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null},"role":1,"parentId":"6","id":"45"},"46":{"path":"/404","parentId":"@@/global-layout","id":"46"},"47":{"path":"/503","parentId":"@@/global-layout","id":"47"},"48":{"path":"*","redirect":"/404","parentId":"@@/global-layout","id":"48"},"@@/global-layout":{"id":"@@/global-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Login__Login" */'@/pages/Login/Login.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Login__LoginPro" */'@/pages/Login/LoginPro.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__Reg__Reg" */'@/pages/Reg/Reg.tsx')),
'5': React.lazy(() => import(/* webpackChunkName: "p__FindPass__FindPass" */'@/pages/FindPass/FindPass.tsx')),
'6': React.lazy(() => import(/* webpackChunkName: "p__Main__Main" */'@/pages/Main/Main.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__Main__Home__Home" */'@/pages/Main/Home/Home.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "p__Main__Map__Baidu" */'@/pages/Main/Map/Baidu.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "p__Main__Map__Geo" */'@/pages/Main/Map/Geo.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'12': React.lazy(() => import(/* webpackChunkName: "p__Main__Roles__RoleAdd" */'@/pages/Main/Roles/RoleAdd.tsx')),
'13': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'14': React.lazy(() => import(/* webpackChunkName: "p__Main__User__UserList" */'@/pages/Main/User/UserList.tsx')),
'15': React.lazy(() => import(/* webpackChunkName: "p__Main__User__UserAdd" */'@/pages/Main/User/UserAdd.tsx')),
'16': React.lazy(() => import(/* webpackChunkName: "p__Main__User__UserData" */'@/pages/Main/User/UserData.tsx')),
'17': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'18': React.lazy(() => import(/* webpackChunkName: "p__Main__Cart__Add" */'@/pages/Main/Cart/Add.tsx')),
'19': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'20': React.lazy(() => import(/* webpackChunkName: "p__Main__Money__Change" */'@/pages/Main/Money/Change.tsx')),
'21': React.lazy(() => import(/* webpackChunkName: "p__Main__Money__Data" */'@/pages/Main/Money/Data.tsx')),
'22': React.lazy(() => import(/* webpackChunkName: "p__Main__Money__List" */'@/pages/Main/Money/List.tsx')),
'23': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'24': React.lazy(() => import(/* webpackChunkName: "p__Main__Sales__Order" */'@/pages/Main/Sales/Order.tsx')),
'25': React.lazy(() => import(/* webpackChunkName: "p__Main__Sales__AfterSale" */'@/pages/Main/Sales/AfterSale.tsx')),
'26': React.lazy(() => import(/* webpackChunkName: "p__Main__Sales__Data" */'@/pages/Main/Sales/Data.tsx')),
'27': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'28': React.lazy(() => import(/* webpackChunkName: "p__Main__Advise__AdviseAdd" */'@/pages/Main/Advise/AdviseAdd.tsx')),
'29': React.lazy(() => import(/* webpackChunkName: "p__Main__Advise__AdviseList" */'@/pages/Main/Advise/AdviseList.tsx')),
'30': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'31': React.lazy(() => import(/* webpackChunkName: "p__Main__Attendance__ClockIn" */'@/pages/Main/Attendance/ClockIn.tsx')),
'32': React.lazy(() => import(/* webpackChunkName: "p__Main__Attendance__List" */'@/pages/Main/Attendance/List.tsx')),
'33': React.lazy(() => import(/* webpackChunkName: "p__Main__Attendance__Data" */'@/pages/Main/Attendance/Data.tsx')),
'34': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'35': React.lazy(() => import(/* webpackChunkName: "p__Main__Banner__BannerAdd" */'@/pages/Main/Banner/BannerAdd.tsx')),
'36': React.lazy(() => import(/* webpackChunkName: "p__Main__Banner__BannerShow" */'@/pages/Main/Banner/BannerShow.tsx')),
'37': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'38': React.lazy(() => import(/* webpackChunkName: "p__Main__Anno__AddAnno" */'@/pages/Main/Anno/AddAnno.tsx')),
'39': React.lazy(() => import(/* webpackChunkName: "p__Main__Anno__ListAnno" */'@/pages/Main/Anno/ListAnno.tsx')),
'40': React.lazy(() => import(/* webpackChunkName: "layouts__second" */'@/layouts/second.tsx')),
'41': React.lazy(() => import(/* webpackChunkName: "p__Main__Settings__AnnoType" */'@/pages/Main/Settings/AnnoType.tsx')),
'42': React.lazy(() => import(/* webpackChunkName: "p__Main__Settings__CartType" */'@/pages/Main/Settings/CartType.tsx')),
'43': React.lazy(() => import(/* webpackChunkName: "p__Main__Settings__AdviseType" */'@/pages/Main/Settings/AdviseType.tsx')),
'44': React.lazy(() => import(/* webpackChunkName: "p__Main__Settings__MoneyType" */'@/pages/Main/Settings/MoneyType.tsx')),
'45': React.lazy(() => import(/* webpackChunkName: "p__Main__Mine__Mine" */'@/pages/Main/Mine/Mine.tsx')),
'46': React.lazy(() => import(/* webpackChunkName: "p__Badserver__NotFound" */'@/pages/Badserver/NotFound.tsx')),
'47': React.lazy(() => import(/* webpackChunkName: "p__Badserver__BadServer" */'@/pages/Badserver/BadServer.tsx')),
'48': React.lazy(() => import( './EmptyRoute')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/xile/Desktop/react/umi4/src/layouts/index.tsx')),
},
  };
}
