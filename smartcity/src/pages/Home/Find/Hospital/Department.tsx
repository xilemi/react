import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { List, Tabs } from 'antd-mobile'
import { getHospitalDepartmentListApi } from '../../../../api/hospital'
import { useCommonFunc } from '../../../../hooks'
import { useDispatch } from 'react-redux'
import { updataDepartmentInfo } from '../../../../rtk/reducers/hospitalSlice'

const Department = () => {
    const [departmentList,setDepartmentList]=useState([])
    const {gotopage}=useCommonFunc()
    const dispatch=useDispatch()
    const getHospitalDepartmentList= async(params)=>{
        let res =await getHospitalDepartmentListApi(params)
        if(res.code==200){
            setDepartmentList(res.rows)
        }
    }
    const onChange=(val=1)=>{
        getHospitalDepartmentList({type:val})
    }
    const onSelect=(item)=>{
        gotopage(-1)
        dispatch(updataDepartmentInfo(item))
    }
    useEffect(()=>{
        onChange()
    },[])

    return (
        <>
            <MyHeader title='医院科室'></MyHeader>
            <div className="center">
                <Tabs onChange={onChange} defaultActiveKey={1}>
                    <Tabs.Tab title='普通门诊' key='1'/>
                    <Tabs.Tab title='专家门诊' key='2'/>
                </Tabs>
                {/* 后台取数据 */}
                <List mode='card'>
                 {
                    departmentList.map(item=>{
                        return <List.Item extra={item.money} onClick={()=>onSelect(item)}>{item.categoryName}</List.Item>
                    })
                 }
                </List>
            </div>
        </>
    )
}

export default Department