
// 需求   封装 modalform   自定义 title  自定义 内部表单 自定义确认操作  

import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import React, { FC, forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const MyModalForm: FC<any> = ({ title = "标题", children, confirm }, ref) => {
    useImperativeHandle(ref, () => {
        return { setOpen, form ,setId,id}
    })
    const [form] = Form.useForm<{ name: string; company: string }>();
    const [open, setOpen] = useState<boolean>(false)
    const [id,setId]=useState<string>("")
    return (
        <div>
            <ModalForm<{
                name: string;
                company: string;
            }>
                title={title}
                form={form}
                open={open}
                autoFocusFirstInput
                width={500}
                modalProps={{
                    destroyOnClose: true,
                    onCancel: () => setOpen(false),
                }}
                onFinish={  (values) => {
                   confirm(values)
                   setOpen(false)
                }}

            >
                {children}
            </ModalForm>
        </div>
    )
}

export default forwardRef(MyModalForm)