import React, { FC, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import { Form, Input, Button, Radio, Space } from 'antd-mobile'
import { regType } from '../../types'
import { regApi } from '../../api/prodApi/userInfo'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { NavLink } from 'react-router-dom'
import { useCommonFunc } from '../../hooks'
import { reg } from '../../utils/valid'
import { failToast } from '../../utils/message'
// 没有做账号校验
const Reg: FC = () => {
    const [regInfo] = Form.useForm<regType>()
    const [visiblePwd, setvisiblePwd] = useState(false)
    const [visibleComPwd, setvisibleComPwd] = useState(false)
    const initialValues: regType = {
        userName: '',
        password: '',
        phonenumber: '',
        sex: '0'
    }
    const subReg = async () => {
        let res = await regApi(regInfo.getFieldsValue())
        
        if (res.code) {
            regInfo.resetFields()
        }
    }
    const checkPwd = (_, value) => {
        if (reg.pwd.test(regInfo.getFieldValue("password"))) {
            if (regInfo.getFieldValue("password") === value) {
                return Promise.resolve()
            }
            return Promise.reject(new Error("两次密码不一致"))
        } else {
            return Promise.resolve()
        }
    }
    const { gotopage } = useCommonFunc()
    return (
        <>
            <MyHeader title="注册"></MyHeader>
            <div className='center'>
                <Form layout='horizontal' form={regInfo} mode='card' onFinish={subReg} onFinishFailed={() => failToast("请完成校验")} initialValues={initialValues} footer={
                    <>
                        <div onClick={() => gotopage("/login")}>去登录</div>
                        <div style={{ margin: "10px 0" }}>
                            <Button block type='submit' color='primary' size='large'>
                                提交
                            </Button>
                        </div>
                        <div>
                            <Button block type='reset' color='primary' size='large'>
                                重置
                            </Button>
                        </div>
                    </>

                }>
                    <Form.Item label='用户名' name="userName" rules={
                        [
                            { required: true, message: '用户名不能为空' },
                        ]
                    }>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item label='电话号码' name="phonenumber" rules={
                        [
                            { required: true, message: '手机号不能为空' },
                            { pattern: reg.phone, message: '手机号不合规' }
                        ]
                    }>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item label='密码' name="password" rules={
                        [
                            { required: true, message: '密码不能为空' },
                            { pattern: reg.pwd, message: "密码必须6-16位数字加字母" }
                        ]
                    }>
                        <div className="password">
                            <Input
                                className="input"
                                placeholder='请输入密码'
                                type={visiblePwd ? 'text' : 'password'}
                            />
                            <div className="eye">
                                {!visiblePwd ? (
                                    <EyeInvisibleOutline onClick={() => setvisiblePwd(true)} />
                                ) : (
                                    <EyeOutline onClick={() => setvisiblePwd(false)} />
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label='密码' name="dbpassword" dependencies={["password"]} rules={
                        [
                            { required: true, message: '密码不能为空' },
                            { pattern: reg.pwd, message: "密码必须6-16位数字加字母" },
                            { validator: checkPwd }
                        ]
                    }>
                        <div className="password">
                            <Input
                                className="input"
                                placeholder='请输入密码'
                                type={visibleComPwd ? 'text' : 'password'}
                            />
                            <div className="eye">
                                {!visibleComPwd ? (
                                    <EyeInvisibleOutline onClick={() => setvisibleComPwd(true)} />
                                ) : (
                                    <EyeOutline onClick={() => setvisibleComPwd(false)} />
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label='性别' name="sex">
                        <Radio.Group>
                            <Space>
                                <Radio value='0'>男</Radio>
                                <Radio value='1'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Form >
            </div >
        </>
    )
}

export default Reg