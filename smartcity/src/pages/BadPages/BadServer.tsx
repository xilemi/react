import React, { useState } from 'react'
import MyHeader from '../../components/MyHeader'
import Img from "../../assets/images/503.png"
import "./index.scss"
import { ProgressCircle, Space } from 'antd-mobile'
import { useCommonFunc } from '../../hooks'
import Mycount from '../../components/Mycount'
function BadServer() {
    const { gotopage } = useCommonFunc()

    return (
        <>
            <MyHeader title="503"></MyHeader>
            <div className='errorpage'>
                <img src={Img} className='myimg' />
                <Mycount type={1} onEnd={() => gotopage("/index")} ></Mycount>
            </div >
        </>
    )
}

export default BadServer