import { loginApi } from '@/api/pro';

import { Button, Checkbox, Form, Input } from 'antd'

import { inject ,observer} from 'mobx-react';
import React, { FC } from 'react'

const AccountLogin:FC = () => {


    const [accountFrom]=Form.useForm()
    accountFrom.setFieldValue("remember",false)
    const onFinish=async (val)=>{
        // 提交登录
        console.log(val);
        // 登录成功存储token   使用useloaclstorage完成 account 和token 的存储
        if(val.remember){

        }
        let res =await loginApi(val)
        if(res.code==200){
            // 使用useloaclstorage
        }
    }
    const onFinishFailed=(val)=>{
        // 验证失败的
        // console.log(val);
        
    }
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 4 ,offset:2}}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={accountFrom}
            >
                <Form.Item
                    label="账号"
                    name="account"
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      登陆
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default inject("UserInfo")(observer(AccountLogin))