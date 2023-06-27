# 智慧城市项目  
##  react + rtk  + ant-design-mobile + hooks 
## 项目要点  
1.封装倒计时,使用useCountDown(ahook),广告,404,503等页面自动跳转.
2.封装路由跳转函数(跳转指定页面),封装跳转上一级(未完成)
3.封装axios请求,post,get传参任意(意义不大)
4.使用useLoaclStorageState,useCookiesState完成页面访问次数的计数,根据次数做出判断
5.封装轮播图,loading组件
6.底部导航栏,激活高亮
7.封装头部,带插槽,自定义左右两边的内容
8.二次封装倒计时组件,递增递减.
9.数据持久化,使用redux-persist
10.持久化rtk
11.使用qrcode生成二维码,下载?
12.图片上传组件,路径替换掉public 传入的数据为formData,
使用new创建,使用append进行导入数据.input为file属性的获取的文件数组files.
13.新闻分类,新闻列表可以做持久化处理,可以持久化全部,每次切换就用请求了.
14.新闻分类布局上下,上面新闻类别,点击切换,下部展示新闻列表
新闻页面缓存,返回任然保留在当前选项,记录下categoryList的id在rtk中
15.未登录跳转到登录页面,后返回的路劲判断,记录topath frompath在storage 
16.城市使用city接口,使用列表的城市,省下面市,可以搜索,侧边有导航栏,记录当前选中的地址,存rtk   
17.发现页面数据存rtk,不用每次进入都重新请求 
18.页面 keep-alive 如何实现
## hooks使用
1.useInterval
2.useLocalStorageState 存储storage在本地
## bug
1.非路由组件不能使用  路由相关的hooks

## 开始项目前应该考虑的问题 

1.项目框架,使用的ui库,使用的全局状态管理插件,
2.网络请求配置,请求拦截,响应拦截.
3.未登录访问跳转到登录,登录完成后返回页面的规则,返回个人中心或者返回上一页.使用localstorage存储路由地址在本地,进行判断.
4.页面为登录和登录访问的两种状态.显示处理
5.全局状态管理,数据持久化.
6.头部和底部,底部要考虑到有些页面是不需要底部的,在些组件的时候留下判断的空间
头部划分左中右,左侧返回,返回上一级或者像选择地址一样,到达指定的页面,根据路由显示选择的城市,右侧搜索,以及更多,
搜索可选展示,点击跳转到搜索页面.
7.对于像分类,不会经常改变的数据,可以做数据持久化,减少请求的次数.
8.点赞后,赞的数量更新,这种需要频繁更新的数据,可以先改变前段显示的数据,后期页面刷新会也会更新数据,
就不用每次点赞发一个请求,获取更新的数据发一个请求,减少请求的次数
9.后面就是增删改查的调取接口,考虑未登录的跳转,登录后返回
10.对于一些需要频繁更新的数据,可以使用websocket,实时更新数据,减少请求的次数.



## 项目总结