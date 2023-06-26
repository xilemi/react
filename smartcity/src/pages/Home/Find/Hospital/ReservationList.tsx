import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { addReservationListApi } from '../../../../api/hospital'
import { useCommonFunc, useLocalData } from '../../../../hooks'
import { Card, Empty } from 'antd-mobile'
import dayjs  from "dayjs"
import qs from "qs"
import { useSelector } from 'react-redux'
const ReservationList = () => {
    const {userName}=useLocalData()
    const [reservationList,setReservationList]=useState([])
    const {id}=useSelector(state=>state.hospitalInfo)
    const {gotopage} =useCommonFunc()
    const getReservationList=async ()=>{
        let res =await addReservationListApi({userName})
        if(res.code==200){
            setReservationList(res.data)
        }
    }
    useEffect(()=>{
        getReservationList()
    },[])
    enum statusType{
        "未使用",
        "已使用",
        "已过期"
    }
    const checkStatus=(item)=>{
        if(item.status=="2"){
            return statusType[item.status - 1]
        }
        else{
            if(new Date(item.reserveTime).getTime() > new Date().getTime()){
                return statusType[0]
            }else{
                return statusType[2]
            }
        }
    }

  return (
    <>
        <MyHeader title="预约记录" onback={()=>gotopage("/index/outpatient/hospitaldetail?"+qs.stringify({id}))}></MyHeader>
        <div className="center" style={{backgroundColor:'#f3f3f3'}}> 
            {
                reservationList.length>0?<>
                    {
                        reservationList.map(item=>{
                            return <Card key={item.id} style={{margin:10,border:'1px solid #fff',backgroundColor:"#fff"}} title={item.name} extra={checkStatus(item)} onClick={()=>gotopage("/index/outpatient/reservationdetail?"+qs.stringify({id:item.id}))}>
                                <div>订单编号:{item.orderNum}</div>
                                <div>就诊科室:{item.categoryName}</div>
                                <div>挂号类型:{item.type}</div>
                                <div>挂号费用:{item.money}</div>
                                <div>预约时间:{dayjs(item?.reserveTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                            </Card>
                        })



                    }
                </>:<Empty description={"暂无数据"}></Empty>
            }
        </div>
    </>
  )
}

export default ReservationList