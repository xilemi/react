import React, { useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { Button, DatePicker, Form, Input, Radio, Space, Toast } from 'antd-mobile'
import { addPatientCardApi } from '../../../../api/hospital'
import { useCommonFunc, useLocalData } from '../../../../hooks'
import dayjs from "dayjs"
const AddHospCard = () => {
    const [cardInfo] = Form.useForm()
    const { userName } = useLocalData()
    const [visible, setVisible] = useState(false)
    const {gotopage}=useCommonFunc()
    const confirmTime=(val)=>{
        cardInfo.setFieldValue("birthday",dayjs(val).format("YYYY-MM-DD"))
    }
    const addCard = async () => {
        console.log({ userName, ...cardInfo.getFieldsValue() });
        let res = await addPatientCardApi(JSON.stringify({ userName, ...cardInfo.getFieldsValue() }))
        if(res.code==200){
            gotopage(-1)
        }
    }   
    return (
        <>
            <MyHeader title='添加就诊卡'></MyHeader>
            <div className="center">
                <Form mode='card' form={cardInfo} footer={
                    <>
                        <div style={{ marginBottom: 15 }}><Button color='primary' block onClick={addCard}>添加</Button></div>
                    </>
                }>
                    <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
                        <Input placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item name='tel' label='电话' rules={[{ required: true }]}>
                        <Input placeholder='请输入电话' />
                    </Form.Item>
                    <Form.Item name='cardId' label='身份证' rules={[{ required: true }]}>
                        <Input placeholder='请输身份证' />
                    </Form.Item>
                    <Form.Item name='birthday' label='出生日期'>
                        <Input placeholder='请选择出生日期' onClick={() => setVisible(true)} />
                    </Form.Item>
                    <Form.Item name="sex" label='性别' rules={[{ required: true }]}>
                        <Radio.Group>
                            <Space>
                                <Radio value='0'>男</Radio>
                                <Radio value='1'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='address' label='地址' >
                        <Input placeholder='请输入地址' />
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

export default AddHospCard