import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { Button, DatePicker, Form, Input, Radio, Space } from 'antd-mobile'
import { useCommonFunc, useLocalData } from '../../../../hooks'
import dayjs from "dayjs"
import { useSelector } from 'react-redux'
import { addReservationApi } from '../../../../api/hospital'
import qs from "qs"
const AddReservation = () => {
    const [info] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const { gotopage } = useCommonFunc()
    const {userName}=useLocalData()
    const {id}=useSelector(state=>state.hospitalInfo)
    enum departmentType {
        "普通门诊",
        "专家门诊" 
    }
    const confirmTime = (val) => {
        info.setFieldValue("reserveTime", dayjs(val).format("YYYY-MM-DD HH:mm:ss"))
    }
    const { patientInfo, departmentInfo } = useSelector(state => state.hospitalInfo)


    const addReservation =async ()=>{
        let res =await addReservationApi(JSON.stringify({userName,...patientInfo, ...departmentInfo,reserveTime:info.getFieldValue("reserveTime")}))
        if (res.code==200) {
            gotopage("/index/outpatient/reservationlist")
        }
    }
    useEffect(() => {
        info.setFieldsValue({ ...patientInfo, ...departmentInfo })
        info.setFieldValue("type", departmentType[departmentInfo.type-1])
    }, [])
    return (
        <>
            <MyHeader title='添加预约' onback={()=>gotopage("/index/outpatient/hospitaldetail?"+qs.stringify({id}))}></MyHeader>
            <div className="center">
                <Form mode='card' form={info} footer={
                    <>
                        <div style={{ marginBottom: 15 }}><Button color='primary' block onClick={addReservation} >提交预约</Button></div>
                    </>
                }>
                    <Form.Item name='name' label='姓名'  rules={[{ required: true }]}>
                        <Input placeholder='请输入姓名' onClick={() => gotopage("/index/outpatient/hospitalcard")} />
                    </Form.Item>
                    <Form.Item name='tel' label='电话'  disabled={true} rules={[{ required: true }]}>
                        <Input placeholder='请输入电话' />
                    </Form.Item>
                    <Form.Item name='cardId' label='身份证' disabled={true} rules={[{ required: true }]}>
                        <Input placeholder='请输身份证' />
                    </Form.Item>
                    <Form.Item name='reserveTime' label='预约时间' rules={[{ required: true }]}>
                        <Input placeholder='请选择预约时间' onClick={() => setVisible(true)} />
                    </Form.Item>
                    <Form.Item name='categoryName' label='挂号科室'>
                        <Input placeholder='请选科室' onClick={() => gotopage("/index/outpatient/department")} />
                    </Form.Item>
                    <Form.Item name='type' label='挂号类型' disabled={true}>
                        <Input placeholder='请选类型' />
                    </Form.Item>
                    <Form.Item name='money' label='挂号费用' disabled={true}>
                        <Input placeholder='费用' />
                    </Form.Item>
                    <Form.Item name="sex" label='性别' disabled={true} rules={[{ required: true }]}>
                        <Radio.Group>
                            <Space>
                                <Radio value='0'>男</Radio>
                                <Radio value='1'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <DatePicker
                    visible={visible}
                    onClose={() => {
                        setVisible(false)
                    }}
                    precision='minute'
                    onConfirm={(val) => confirmTime(val)}
                />
            </div>
        </>
    )
}

export default AddReservation