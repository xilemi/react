import React, { FC, useEffect, useState } from 'react'
import { ProgressCircle, Space } from 'antd-mobile'
import { useCountDown, useCounter } from 'ahooks';
import { useCommonFunc } from '../hooks'
const Mycount: FC<{ time?: number, type?: number, total?: number, onEnd?: any }> = ({ type = 0, time = 5, total = 100, onEnd }) => {
    // 封装倒计时 递增  或者递减  
    //   类型  0 递增  1 递减   时间 total 总共份数
    const { gotopage } = useCommonFunc()
    let timer: number = 0
    // 递减
    const [countDown] = useCountDown({
        leftTime: time * 1000,
        interval: time * 1000 / total,  //执行频率
        onEnd
    })
    // 递增
    const [current, { inc }] = useCounter(0, { max: time * 1000 })
    useEffect(() => {
        if (current <= time * 1000) {
            timer = setInterval(() => {
                inc(time * 1000 / total)
            }, time * 1000 / total)
        } else {
            clearInterval(timer)
        }
    }, [])
    const typeCount = type ? current : countDown
    return (
        <>
            <div className='errorpage'>
                <Space style={{ '--gap': '24px', position: "absolute", left: 20, top: 20 }} >
                    <ProgressCircle percent={typeCount / (time * 1000 / total)} style={{ color: "#fff" }}>{Math.round(typeCount / (time * 1000 / total))}%</ProgressCircle>
                </Space>
            </div>
        </>
    )
}

export default Mycount