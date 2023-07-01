import React from 'react'
import { Outlet } from 'umi'
//公共的二级路由出口页面
const second = () => {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default second