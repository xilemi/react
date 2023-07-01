
import React, { FC, useEffect, useRef } from 'react'
import  './index.scss'
import * as echarts from 'echarts'

const MyEcharts:FC<any> = ({
    option={}
}) => {
    const chartOne:any  = useRef()
    const chartInit = ()=>{
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(chartOne.current);
        // 指定图表的配置项和数据
       
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    useEffect(()=>{
        chartInit()
    },[option])
    return (
        <div className="chartbox" ref={chartOne} ></div>
    )
}

export default MyEcharts