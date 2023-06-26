import React, { FC, useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { getHospitalDetailApi } from '../../../../api/hospital'
import { Button, Image } from 'antd-mobile'
import { useCommonFunc } from '../../../../hooks'

const HospitalDetail: FC = () => {
    const [searchParams] = useSearchParams()
    const [info,setInfo]=useState({})
    const {gotopage}=useCommonFunc()
    const getHospitalDetail=async()=>{
        const id=searchParams.get("id")
        let res =await getHospitalDetailApi(id)
        if(res.code==200){
            setInfo(res.data)
        }
    }
    useEffect(()=>{
        getHospitalDetail()
    },[])
    return (
        <>
            <MyHeader title='医院详情'></MyHeader>
            <div className="center">
                <Image src={info?.imgUrl}/>
                <div>{info?.hospitalName}</div>
                <div>{info?.brief}</div>
            </div>
            <Button color='primary' style={{height:40,margin:"0 10px"}} onClick={()=>gotopage("/index/outpatient/addreservation")}>预约就诊</Button>
        </>
    )
}

export default HospitalDetail