import { defineConfig } from 'umi';
import routes from './src/pages/routes';
// umi 配置文件  
export default defineConfig({

  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  alias:{

  },
  mock: false,   // 关闭mock 
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [  // 全局的路由配置 
  //     { path: '/', component: '@/pages/index' },
  // ],
  routes:routes,
  fastRefresh: {},
  // 百度地图 地图 
  headScripts: [
    { src: '//api.map.baidu.com/api?type=webgl&v=1.0&ak=9gBuRQstGZmVWOgCWOrEFTxvt3zv3Gv4' },
  ], // index.html  script src = 

  history: {  // 路由模式  browser / hash 
    type: 'hash'
  },
  title: '恒鑫汽车销售管理系统后台',
  links: [{ rel: 'icon', href: './src/assets/images/logo.png' }], // logo
  favicon: './src/assets/images/logo.png',
  base: './',  // 项目的基路径 
  publicPath: './', // 公共路径 

  // 自动打开浏览器 
  chainWebpack(memo, { env, webpack, craeteCSSRule }) {
    env === 'development'
      ? memo
        .plugin('open-browser-webpack-plugin')
        .use('open-browser-webpack-plugin', [{ url: 'http://127.0.0.1:8000' }])
      : ''; // 此处URL与项目启动的URL保持一致
  },
});
