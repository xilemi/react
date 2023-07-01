import {
  HomeOutlined,
  GlobalOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import Home from './Home/Home';
import routes from './routes';


export default {
  route: {
    path: '/',
    // routes: [
    //   {
    //     path: "home",
    //     name: '首页',
    //     component: <Home />,
    //     icon: <HomeOutlined />
    //   },
    //   {
    //     path: "map",
    //     name: '地图',
    //     component: '@/layouts/second',
    //     icon: <GlobalOutlined />,
    //     routes: [
    //       {
    //         path: 'baidu',
    //         component: "@/pages/Main/Map/Baidu",
    //         name: '百度地图'
    //       },
    //       {
    //         path: 'geo',
    //         component: "@/pages/Main/Map/Geo",
    //         name: '高德地图'
    //       }
    //     ]
    //   },
    //   {
    //     path: 'role',
    //     name: '用户权限',
    //     component: '@/layouts/second',
    //     icon: <UserOutlined />,
    //     routes: [
    //       {
    //         path: 'rolelist',
    //         name: '角色列表',
    //         component: "@/pages/Main/Roles/RoleList"
    //       },
    //       {
    //         path: 'roleadd',
    //         name: '添加角色',
    //         component: "@/pages/Main/Roles/RoleAdd"
    //       },
    //     ]
    //   },
    //   {
    //     path: 'anno',
    //     component: '@/layouts/second',
    //     name: '系统公告',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'addanno',
    //         component: "@/pages/Main/Anno/AddAnno",
    //         name:'添加公告'
    //       },
    //       {
    //         path: 'listanno',
    //         component: "@/pages/Main/Anno/ListAnno",
    //         name:"公告列表"
    //       },
    //     ]
    //   },
    //   {
    //     path: 'advise',
    //     component: '@/layouts/second',
    //     name: '广告管理',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'list',
    //         component: "@/pages/Main/Advise/List",
    //         name:'广告列表'
    //       },
    //       {
    //         path: 'add',
    //         component: "@/pages/Main/Advise/Add",
    //         name:'广告新增'
    //       },
          
    //     ]
    //   },{
    //     path: 'user',
    //     component: '@/layouts/second',
    //     name: '用户管理',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'list',
    //         component: "@/pages/Main/User/UserList",
    //         name:'用户列表'
    //       },
    //       {
    //         path: 'add',
    //         component: "@/pages/Main/User/UserAdd",
    //         name:'用户新增'
    //       },
    //       {
    //         path: 'data',
    //         component: "@/pages/Main/User/UserData",
    //         name:'用户分析'
    //       },
          
    //     ]
    //   },{
    //     path: 'cart',
    //     component: '@/layouts/second',
    //     name: '车辆管理',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'add',
    //         component: "@/pages/Main/Cart/Add",
    //         name:'车辆入库'
    //       },
    //       {
    //         path: 'out',
    //         component: "@/pages/Main/Cart/Out",
    //         name:'车辆出库'
    //       },
    //       {
    //         path: 'exchange',
    //         component: "@/pages/Main/Cart/Exchange",
    //         name:'车辆维护'
    //       },
    //     ]
    //   },{
    //     path: 'money',
    //     component: '@/layouts/second',
    //     name: '资金管理',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'change',
    //         component: "@/pages/Main/Money/Change",
    //         name:'资金新增'
    //       },
    //       {
    //         path: 'data',
    //         component: "@/pages/Main/Money/Data",
    //         name:'资金分析'
    //       },
    //       {
    //         path: 'list',
    //         component: "@/pages/Main/Money/List",
    //         name:'资金记录'
    //       },
    //     ]
    //   },{
    //     path: 'sales',
    //     component: '@/layouts/second',
    //     name: '销售管理',
    //     icon:<MessageOutlined />,
    //     routes: [
    //       {
    //         path: 'add',
    //         component: "@/pages/Main/Sales/Add",
    //         name:'新增记录'
    //       },
    //       {
    //         path: 'list',
    //         component: "@/pages/Main/Sales/List",
    //         name:'销售列表'
    //       },
    //     ]
    //   },
    //   {
    //     path: 'mine',
    //     component: '@/pages/Mine/Mine',
    //     name: '个人中心',
    //     icon:<MessageOutlined />,
    //   },
    // ]
    routes
  },
  location: {
    pathname: '/',
  },
  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design',
    },
  ],
};