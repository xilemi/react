import React, { FC } from 'react'
import { Button, Space } from 'antd-mobile'
import MyHeader from '../../components/MyHeader'
const Home: FC = () => {

    //进入获取 用户信息 



    return (
        <>
            <MyHeader title='首页' backArrow=''></MyHeader>
            <div className='center'>
                <h2>首页</h2>
            </div>
        </>
    )
}

export default Home