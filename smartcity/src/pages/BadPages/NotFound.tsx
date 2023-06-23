import React, { FC, useEffect, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import { useCommonFunc } from '../../hooks'
import Img from "../../assets/images/404.png"
import "./index.scss"
import Mycount from '../../components/Mycount'
const NotFound: FC = (props) => {
    // 实现倒计时
    const { gotopage } = useCommonFunc()
    return (
        <>
            <MyHeader title='404'></MyHeader>
            <div className='errorpage'>
                <Mycount type={0} onEnd={() => gotopage("/index")}></Mycount>
                <img src={Img} alt="" className='myimg' />
            </div>
        </>
    )
}

export default NotFound