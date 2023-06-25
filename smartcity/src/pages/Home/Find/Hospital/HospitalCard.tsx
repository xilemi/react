import React, { useEffect } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { useLocalData } from '../../../../hooks'
import { getPatientCardListApi } from '../../../../api/hospital'

const HospitalCard = () => {
    const {userName}=useLocalData()
    const getPatientCardList=async ()=>{
        let res =await getPatientCardListApi({userName})
        if(res.code==200){
            console.log(res.rows)
        }
    }
    useEffect(()=>{
        getPatientCardList()
    },[])

  return (
    <>
        <MyHeader title='选择就诊人'></MyHeader>
        <div className="center">

        </div>
    </>
  )
}

export default HospitalCard