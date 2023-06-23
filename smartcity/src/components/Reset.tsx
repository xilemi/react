import React, { FC, useEffect, useState } from 'react'
import { Popup, Space, Button, Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useCommonFunc } from '../hooks'
import { resetPwdApi } from '../api/prodApi/userInfo'
import { reg } from '../utils/valid'
const Reset: FC<{ visible?: boolean, setVisibleHandler: any }> = ({ visible = false, setVisibleHandler }) => {
    type infoType = { oldPassword: string, newPassword: string }
    const [info] = Form.useForm<infoType>()
    const [visiblePwd, setvisiblePwd] = useState(false)
    const [visibleComPwd, setvisibleComPwd] = useState(false)
    const [visibleDbComPwd, setvisibleDbComPwd] = useState(false)
    // 提交事件
    const subReg = async () => {
        console.log();
        let res = await resetPwdApi(info.getFieldsValue())
        if (res.code = 200) {
            setVisibleHandler(false)
            info.resetFields()
        }
    }
    const { gotopage } = useCommonFunc()
    // 点击关闭  公共的 
    const closeClick = () => {
        setVisibleHandler(false)
        // 清空表单 
        info.resetFields()
    }
    const checkPwd = (_, value) => {
        if (reg.pwd.test(info.getFieldValue("newPassword"))) {
            if (info.getFieldValue("newPassword") === value) {
                return Promise.resolve()
            }
            return Promise.reject(new Error("两次密码不一致"))
        } else {
            return Promise.resolve()
        }
    }
    return (
        <Popup
            visible={visible}
            showCloseButton
            bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '50vh',
            }}
            onMaskClick={() => closeClick()}
            onClose={() => closeClick()}
        >
            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}>修改密码</div>
            <Form layout='horizontal' form={info} mode='card' style={{ marginTop: 50 }} footer={
                <>
                    <div style={{ margin: "10px 0" }}>
                        <Button block type='submit' onClick={subReg} color='primary' size='large'>
                            提交
                        </Button>
                    </div>

                </>
            }>
                <Form.Item label='旧密码' name="oldPassword">
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
                <Form.Item label='新密码' name="newPassword">
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
                <Form.Item label='确认密码' name="dbNewPassword" dependencies={["newPassword"]} rules={[
                    { required: true, message: '确认密码必填' },
                    { pattern: reg.pwd, message: '密码6-16位数字加字母' },
                    { validator: checkPwd }
                ]}>
                    <div className="password">
                        <Input
                            className="input"
                            placeholder='请输入密码'
                            type={visibleComPwd ? 'text' : 'password'}
                        />
                        <div className="eye">
                            {!visibleDbComPwd ? (
                                <EyeInvisibleOutline onClick={() => setvisibleDbComPwd(true)} />
                            ) : (
                                <EyeOutline onClick={() => setvisibleDbComPwd(false)} />
                            )}
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Popup>
    )
}

export default Reset