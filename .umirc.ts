import routes from "./src/pages/routes";
import { defineConfig } from "umi";

export default defineConfig({
  routes:routes,    // 全局的路由配置 
  npmClient: 'npm',
  history: {  // 路由模式  browser / hash 
    type: 'hash'
  },

  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  alias:{

  },
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  // 百度地图 地图 
  headScripts: [
    { src: '//api.map.baidu.com/api?type=webgl&v=1.0&ak=9gBuRQstGZmVWOgCWOrEFTxvt3zv3Gv4' },
  ], // index.html  script src = 

  title: '恒鑫汽车销售管理系统后台',
  links: [{ rel: 'icon', href: './src/assets/images/logo.png' }], // logo
  favicons: ['./src/assets/images/logo.png'],
  // base: './',  // 项目的基路径 
  publicPath:process.env.NODE_ENV === 'production' ? './' : '/', // 公共路径 

  proxy:{  // 反向代理 

  }
});