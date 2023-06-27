import React, { FC } from 'react'
import { Outlet } from 'umi'

const Main:FC = () => {
  return (
    <div>Main
      <Outlet></Outlet>
    </div>
  )
}

export default Main