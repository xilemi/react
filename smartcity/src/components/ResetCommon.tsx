import React, { Children, FC, useEffect, useLayoutEffect, useState } from 'react'
import { Popup, Space, Button, Form, Input, Radio } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useCommonFunc } from '../hooks'
import { resetPwdApi } from '../api/prodApi/userInfo'
type oldValueType = {
    title: string,
    val: string,
    types: string,
    key: string
}
const ResetCommon: FC<{ visible: boolean, setVisibleHandler: any, onSub: any, oldValue?: oldValueType, children?: any }> = ({ visible = false, setVisibleHandler, onSub, oldValue, children = null }) => {
    type infoType = {
        avatar?: string,
        email?: string,
        idCard?: string,
        nickName?: string,
        phonenumber?: string,
        sex?: string,
        types?: string
    }

    const [info] = Form.useForm<infoType>()
    const subReg = async () => {
        onSub(info.getFieldsValue())
    }
    // 点击关闭  公共的 
    const closeClick = () => {
        setVisibleHandler(false)
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
            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}>修改{oldValue?.title}</div>
            <Form layout='horizontal' form={info} mode='card' style={{ marginTop: 50 }} footer={
                <>
                    <div style={{ margin: "10px 0" }}>
                        <Button block type='submit' onClick={subReg} color='primary' size='large'>
                            提交
                        </Button>
                    </div>

                </>
            }>
                {/* 传入 */}
                {oldValue?.types == "1" ? <Form.Item label={oldValue?.title} name={oldValue?.key}>
                    <Radio.Group defaultValue={oldValue?.val}>
                        <Space>
                            <Radio value='0'>男</Radio>
                            <Radio value='1'>女</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item> : <Form.Item
                    name={oldValue?.key}
                    label={oldValue?.title}
                >
                    <Input placeholder='请输入' defaultValue={oldValue?.val} />
                </Form.Item>
                }
            </Form>
        </Popup>
    )
}

export default ResetCommon