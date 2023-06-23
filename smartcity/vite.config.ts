import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  devtool: "source-map",  // 调试专用的   上线必须干掉 
  transpileDependencies: true,
  pwa: {  // 设置logo 
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  lintOnSave: false,  // 去除eslist 的规则警告 
  base: "./", // 基路径 
  mode: "development",  // 代码环境  开发和生产    production 生产环境 
  publicPath: './',  // 打包的相对路径
  server: {  //开发的服务器配置 
    host: "0.0.0.0", // 0.0.0.0
    port: 7700,
    open: true,  // 自动打开浏览器 
    proxy: {  // 反向代理 

    }
  },

  // @ => src
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  }
})


