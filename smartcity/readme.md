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
## hooks使用
1.useInterval

## bug
1.非路由组件不能使用  路由相关的hooks