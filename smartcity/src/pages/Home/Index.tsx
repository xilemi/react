import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MyFooter from '../../components/MyFooter'
import { useLocalData } from '../../hooks'
function Index() {
    // 动态生成头部内容?
    const { pathname } = useLocation()
    const reg = /(newsdetail|city)/g
    const { setfromPath, settoPath, toPath, fromPath } = useLocalData()
    useEffect(() => {
        setfromPath(toPath)
        settoPath(pathname)
    }, ["pathname"])
    return (
        <>
            <Outlet></Outlet>
            {
                !reg.test(pathname) && <MyFooter></MyFooter>
            }

        </>
    )
}

export default Index