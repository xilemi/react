import { listOrderApi } from '@/api/cart'
import MyEcharts from '@/components/MyEcharts'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import dayjs from 'dayjs'
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import { listTypeCartApi } from '@/api/pro'
dayjs.extend(isToday)
dayjs.extend(isYesterday)
const Data = () => {
  // 汽车品类 
  // 当天品类的销售统计
  // 分类数组
  const [orderList, setOrderList] = useState([])
  const [todayList, setTodayList] = useState([])
  const [yesDayList, setYesDayList] = useState([])
  const [todayMoneyList, setTodayMoneyList] = useState([])
  const [yesDayMoneyList, setYesDayMoneyList] = useState([])
  const [cartTypeList, setCartTypeList] = useState<any>([])
  const cartTypeNum: any = {
    title: {
      text: '品牌销量统计表'
    },
    xAxis: {
      type: 'category',
      data: cartTypeList.map(item => item?.label)
    },
    yAxis: {
      type: 'value'
    },
    legend: {
      data: ['前一日', '当日',],
      left: '30%'
    },
    series: [
      {
        name: '前一日',
        data: yesDayList,
        type: 'bar'
      },
      {
        name: '当日',
        data: todayList,
        type: 'bar'
      }
    ]
  };
  const cartTypeMoney: any = {
    title: {
      text: '品牌销售额统计表'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ["前一日", "当日"]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: cartTypeList.map(item => item?.label)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '前一日',
        type: 'line',
        stack: 'Total',
        data: yesDayMoneyList
      },
      {
        name: '当日',
        type: 'line',
        stack: 'Total',
        data: todayMoneyList
      },
    ]
  }
  // const afterSaleStatus:any=[]

  const getOrderList = async () => {
    let res = await listOrderApi()
    if (res.code == 200) {
      setOrderList(res.result)
    }
  }
  // 通过dayjs().isToday() 判断当天
  const getdayList = (day: string, item?: string) => {
    const list = []
    const tlist = orderList.filter(order => {
      if (day == "isToday") {
        return dayjs(order?.time).isToday()
      }
      if (day == "isYesterday") {
        return dayjs(order?.time).isYesterday()
      }
    })
    console.log(tlist, 11);

    cartTypeList.forEach(cart => {
      const lg = tlist.filter(items => { return items?.type == cart.value })
      if (lg.length >= 1) {
        if (lg.length == 1) {
          const oneItem = lg[0]
          list.push(oneItem.count)
        }
        else {
          list.push(lg.reduce((prev, current) => {
            return prev?.count + current?.count
          }))
        }
      }
      else {
        list.push(0)
      }
    })
    return list
  }

  const getCartType = async () => {
    let res = await listTypeCartApi()
    if (res.code == 200) {
      setCartTypeList(res.result)
    }
  }
  useEffect(() => {
    getOrderList()
    getCartType()
  }, [])
  useEffect(() => {
    setTodayList(getdayList("isToday"))
    console.log(getdayList("isToday", "count"), 111);
    // setYesDayList(getdayList("isYesterday","count"))
    // console.log(getdayList("isYesterday","count"),222);

    // setTodayMoneyList(getdayList("isToday","total"))
    // setYesDayMoneyList(getdayList("isYesterday","total"))
  }, [orderList, cartTypeList])




  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <MyEcharts option={cartTypeNum}></MyEcharts>
      <MyEcharts option={cartTypeMoney}></MyEcharts>
      {/* <MyEcharts option={afterSaleStatus}></MyEcharts> */}
    </div>
  )
}

export default Data