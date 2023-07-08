import { loginApi } from '@/api/pro';
import { useCommonFc, useLocalData } from '@/hooks';
import { useLocalStorageState } from 'ahooks';

import { Button, Checkbox, Form, Input } from 'antd'

import { inject, observer } from 'mobx-react';
import React, { FC, useEffect } from 'react'
import CryptoJS from "crypto-js"
const AccountLogin: FC = () => {

    const [accountForm] = Form.useForm()
    const [password, setpassword] = useLocalStorageState("password")
    const [isremember, setIsremember] = useLocalStorageState("isremember")
    const { setAccount, account, setToken } = useLocalData()
    const { gotopage } = useCommonFc()
    const key = "xile2302"
    const onFinish = async (val: any) => {
        // 提交登录
        // 登录成功存储token   使用useloaclstorage完成 account 和token 的存储
        let res = await loginApi(val)
        if (res.code == 200) {
            if (val.remember) {
                setpassword(CryptoJS.AES.encrypt(val.password, key).toString())
                setAccount(val.account)
                setIsremember(true)
            }
            else {
                setpassword("")
                setAccount("")
                setIsremember(false)
            }
            setToken(res.token)
            gotopage("/main/home")
        }
    }
    useEffect(() => {
        accountForm.setFieldValue("account", account)
        if (password) {
            accountForm.setFieldValue("password", CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8))
        }
        accountForm.setFieldValue("remember", isremember)
    }, [])
    return (
        <>
            <Form
                name="basic1"
                labelCol={{ span: 4, offset: 2 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete="off"
                form={accountForm}
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

export default AccountLogin