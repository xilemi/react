import React, { useEffect, useState } from 'react'
import {
    ModalForm,
    ProForm,
    ProFormColorPicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from '@ant-design/pro-components';
import { ColorPicker, Form, message } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import MyModalForm from '@/components/MyModalForm';
import { addRoleApi, delRoleApi, delUserApi, getRoleListApi, getUserListApi, updataRoleApi, updataUserApi } from '@/api/pro';
import { confirmMessage } from '@/utils/message';
import { inject, observer } from 'mobx-react';
import UserInfo from '@/mobx/reducer/UserInfo';
import { history } from 'umi';
import { reg } from '@/utils/validate';




type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};


const UserList = () => {
    const [form] = Form.useForm<{ name: string; company: string }>();
    const actionRef = useRef<ActionType>();
    const modalRef = useRef()
    const [flag, setFlag] = useState(true)
    const { updataRoles, info, roles, updataInfo } = UserInfo
    const addConfirm = async (val) => {
        let res = await addRoleApi(val)
        if (res.code == 200) {
            actionRef.current?.reload()
            updataRoles()
        }
    }

    const updataClick = (record) => {
        modalRef.current?.setOpen(true)
        modalRef.current?.form.setFieldsValue(record);
        modalRef.current?.setId(record._id)
        setFlag(false)
    }
    const updataConfirm = async (val) => {
        let res = await updataUserApi({ ...val, _id: modalRef.current.id })
        if (res.code == 200) {
            actionRef.current?.reload()
            updataRoles()
            updataInfo()
        }
    }
    // 定义每列的属性
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '用户编号',
            dataIndex: '_id',
            search: false
        },
        {
            title: '用户名',
            dataIndex: 'username',
            copyable: true,
            ellipsis: true,
            search: true,
            tip: '标题过长会自动收缩',

        }, {
            title: '手机号',
            dataIndex: 'phone',
            copyable: true,
            ellipsis: true,
            search: true,
        },
        {
            disable: true,
            title: '用户密码',
            dataIndex: 'password',
            search: false,
        },
        {
            disable: true,
            title: '用户等级',
            dataIndex: 'role',
            search: true,
        },
        {
            disable: true,
            title: '用户角色',
            dataIndex: 'labelCol',
            search: false,
            render: (text, record: any, dom, action) => {
                return <div key={record._id}>
                    {roles?.find(item => {
                        return item.value == record.role
                    })?.label}
                </div>
            }
        },
        {
            disable: true,
            title: '创建时间',
            dataIndex: 'time',
            valueType: "date",
            search: false
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        time: JSON.stringify(value)
                    };
                },
            },
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <Button
                    disabled={info?.role>record?.role?false:true}
                    key={record?._id}
                    onClick={() => {
                        confirmMessage("是否删除", async () => {
                            let res = await delUserApi({ _id: record._id })
                            if (res.code == 200) {
                                actionRef.current?.reload()
                            }
                        })
                    }}
                >
                    删除
                </Button>,
                <Button key={record.phone} disabled={info?.role>record.role?false:true} onClick={() => updataClick(record)}>
                    修改
                </Button>,
            ],
        },
    ];

    useEffect(() => {
        updataRoles()

    }, [])

    return (
        <div>
            <MyModalForm ref={modalRef} title={'修改用户'} confirm={updataConfirm}>
                <ProFormText
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: "请填写" }]}
                />
                <ProFormText
                    name="password"
                    label="用户密码"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormText
                    name="phone"
                    label="手机号"
                    rules={[{ pattern: reg.phone, message: '手机号格式不正确' }]}
                    disabled={true}
                />
                <ProFormText
                    name="role"
                    label="权限等级"
                    disabled={true}
                />
                {/* 控制这里的roles disabled */}
                <ProFormSelect
                    options={roles}
                    width="s"
                    name="role"
                    label="用户角色"
                    rules={[{ required: true, message: "请填写" }]}
                />
            </MyModalForm>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    // 获取列表
                    //  sort 得到的是个对象,value,需要后端接受
                    console.log(params);

                    let res = await getUserListApi(params)
                    if (res.code == 200) {
                        return { data: res.result }
                    }
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value) {

                    },
                }}
                rowKey="_id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                }}
                pagination={{
                    pageSize: 5,
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            history.push("/main/user/add")
                        }}
                        type="primary"
                        disabled={!(info.role > 800)}
                    >
                        新建
                    </Button>,
                    <Dropdown
                        key="menu"
                        menu={{
                            items: [
                                {
                                    label: '1st item',
                                    key: '1',
                                },
                                {
                                    label: '2nd item',
                                    key: '2',
                                },
                                {
                                    label: '3rd item',
                                    key: '3',
                                },
                            ],
                        }}
                    >
                        <Button>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                ]}
            />



        </div>
    )
}

export default inject("UserInfo")(observer(UserList))