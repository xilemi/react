import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { Button, DatePicker, Form, Input, Radio, Space, Toast } from 'antd-mobile'
import {  removePatientCardApi, updatePatientCardApi } from '../../../../api/hospital'
import { useCommonFunc, useLocalData } from '../../../../hooks'
import dayjs from "dayjs"
import { useSearchParams } from 'react-router-dom'
const  UpdataHospCard= () => {
    const [cardInfo] = Form.useForm()
    const { userName } = useLocalData()
    const [visible, setVisible] = useState(false)
    const {gotopage}=useCommonFunc()
    const [searchParams]=useSearchParams()
    const confirmTime=(val)=>{
        cardInfo.setFieldValue("birthday",dayjs(val).format("YYYY-MM-DD"))
    }
    const updataCard = async () => {
        let res = await updatePatientCardApi(JSON.stringify({ userName, ...cardInfo.getFieldsValue(),id:searchParams.get("id") }))
        if(res.code==200){
            gotopage(-1)
        }
    }   

    const removeCard=async ()=>{
        let res =await removePatientCardApi(JSON.stringify({userName,id:searchParams.get("id")}))
        if(res.code==200){
            gotopage(-1)
        }
    }
    useEffect(()=>{
        cardInfo.setFieldValue("name",searchParams.get("name"))
        cardInfo.setFieldValue("tel",searchParams.get("tel"))
        cardInfo.setFieldValue("sex",searchParams.get("sex"))
        cardInfo.setFieldValue("birthday",searchParams.get("birthday"))
        cardInfo.setFieldValue("cardId",searchParams.get("cardId"))
        cardInfo.setFieldValue("address",searchParams.get("address"))
    },[])
    return (
        <>
            <MyHeader title='修改就诊卡'></MyHeader>
            <div className="center">
                <Form mode='card' form={cardInfo} footer={
                    <>
                        <div style={{ marginBottom: 15 }}><Button color='primary' block onClick={updataCard}>保存</Button></div>
                        <div><Button color='primary' block onClick={removeCard}>删除</Button></div>
                    </>
                }>
                    <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
                        <Input placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item name='tel' label='电话' rules={[{ required: true }]}>
                        <Input placeholder='请输入电话' />
                    </Form.Item>
                    <Form.Item name='cardId' label='身份证'  rules={[{ required: true }]}>
                        <Input placeholder='请输身份证'  />
                    </Form.Item>
                    <Form.Item name='birthday' label='出生日期'>
                        <Input placeholder='请选择出生日期' onClick={() => setVisible(true)} />
                    </Form.Item>
                    <Form.Item name="sex"  label='性别' rules={[{ required: true }]}>
                        <Radio.Group >
                            <Space>
                                <Radio value='0'>男</Radio>
                                <Radio value='1'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='address'  label='地址' >
                        <Input placeholder='请输入地址'  />
                    </Form.Item>
                </Form>
                <DatePicker
                    visible={visible}
                    onClose={() => {
                        setVisible(false)
                    }}
                    precision='day'
                    onConfirm={(val)=>confirmTime(val)}
                />
            </div>
        </>
    )
}

export default UpdataHospCard