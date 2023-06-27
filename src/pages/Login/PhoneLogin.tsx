import { getTokenApi, loginApi, verifyCaptchaApi } from '@/api/pro';
import { useCommonFc, useLocalData } from '@/hooks';
import { reg } from '@/utils/validate';
import { useLocalStorageState } from 'ahooks';


import { Button, Checkbox, DatePicker, Form, Input } from 'antd'

import { inject, observer } from 'mobx-react';
import React, { FC, useEffect } from 'react'
import Captcha from './Captcha';

const PhoneLogin: FC = () => {
    const {gotopage}=useCommonFc()
    const [phoneFrom] = Form.useForm()
    const { setToken } = useLocalData()
    const [phone, setPhone] = useLocalStorageState("phone")
    const onFinish = async (val) => {
        // 提交登录 不管是否登录成功都会存储手机号
        let res = await verifyCaptchaApi({phone,...val})
        setPhone(val.account)
        if (res.code == 200&&res.data) {
            let data=await getTokenApi({phone,...val})
            if(data.code==200){
                setToken(data.token)
                gotopage("/main/home")
            }
        }
    }
    useEffect(() => {
        phoneFrom.setFieldValue("account", phone)
    }, [])
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 4, offset: 2 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete="off"
                form={phoneFrom}
            >
                <Form.Item label="手机号" name="account" hasFeedback 
                    rules={[{ required: true, message: '请输入手机号' },
                    { pattern: reg.phone, message: '请输入正确的手机号' }
                    ]}
                >
                    <Input allowClear placeholder="请输入手机号" onChange={(e)=>setPhone(e.target.value)} />
                </Form.Item>
                <Captcha phone={phone} />
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default PhoneLogin