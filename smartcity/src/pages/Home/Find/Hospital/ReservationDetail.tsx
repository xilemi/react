import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { useSearchParams } from 'react-router-dom'
import { getReservationDetailApi, removeReservationApi, updataReservationApi } from '../../../../api/hospital'
import { Button, Card } from 'antd-mobile'
import dayjs from "dayjs"
import QRCode from "qrcode.react"
import { useCommonFunc } from '../../../../hooks'
const ReservationDetail = () => {
    const [detail, setDetail] = useState({})
    const [searchParams] = useSearchParams()
    const { gotopage } = useCommonFunc()
    const getReservationDetail = async () => {
        let res = await getReservationDetailApi({ id: searchParams.get("id") })
        if (res.code == 200) {
            setDetail(res.data)
        }
    }
    const removeReservation = async () => {
        let res = await removeReservationApi(JSON.stringify({ id: searchParams.get("id") }))
        if (res.code == 200) {
            gotopage("/index/outpatient/reservationlist")
        }
    }
    const updataReservation = async () => {
        let res = await updataReservationApi(JSON.stringify({ id: searchParams.get("id"), status: "2" }))
        if (res.code == 200) {
            gotopage("/index/outpatient/reservationlist")
        }
    }
    useEffect(() => {
        getReservationDetail()
    }, [])
    enum statusType {
        "未使用",
        "已使用",
        "已过期"
    }
    const checkStatus=()=>{
        if(detail.status=="2"){
            return statusType[detail.status - 1]
        }
        else{
            if(new Date(detail.reserveTime).getTime() > new Date().getTime()){
                return statusType[0]
            }else{
                return statusType[2]
            }
        }
    }
    return (
        <>
            <MyHeader title='预约详情'></MyHeader>
            <div className="center" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column" }}>
                <Card key={detail.id} style={{ margin: 10, border: '1px solid #fff', backgroundColor: "#fff" }} title={detail.name} extra={checkStatus()}>
                    <div>订单编号:{detail.orderNum}</div>
                    <div>就诊科室:{detail.categoryName}</div>
                    <div>挂号类型:{detail.type}</div>
                    <div>挂号费用:{detail.money}</div>
                    <div>预约时间:{dayjs(detail?.reserveTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                </Card>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <QRCode
                        id="bill_qr_code_url"
                        value={"index/outpatient/reservationdetail?id=8"}//value参数为生成二维码的链接 我这里是由后端返回
                        size={200} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                </div>
                <div style={{ margin: "10px 10px" }}>
                    <div style={{ marginBottom: 10 }}><Button block color='primary' onClick={removeReservation}>删除</Button></div>
                    <div><Button block color='primary' disabled={checkStatus()!="未使用"} onClick={updataReservation}>立即使用</Button></div>
                </div>
            </div>
        </>
    )
}

export default ReservationDetail