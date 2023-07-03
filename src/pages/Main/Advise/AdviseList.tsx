import React, { useEffect, useState } from 'react'
import {
    DrawerForm,
    ModalForm,
    ProForm,
    ProFormColorPicker,
    ProFormDateRangePicker,
    ProFormDateTimePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { ColorPicker, Form, message } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import MyModalForm from '@/components/MyModalForm';
import { addAnnoApi, addRoleApi, delAdviseApi, delAnnoApi, delRoleApi, getRoleListApi, listAdviseApi, listAnnoApi, updataRoleApi, updateAdviseApi, updateAnnoApi } from '@/api/pro';
import { confirmMessage } from '@/utils/message';
import { inject, observer } from 'mobx-react';
import UserInfo from '@/mobx/reducer/UserInfo';
import { history } from 'umi';




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


const ListAdvise = () => {
    const [form] = Form.useForm<{ name: string; company: string }>();
    const actionRef = useRef<ActionType>();
    const modalRef = useRef()
    const [open, setOpen] = useState(false)
    const [flag, setFlag] = useState(true)
    const { updataTypeAdvise, typeAdvise, info } = UserInfo
    const addConfirm = async (val) => {
        let res = await addAnnoApi(val)
        if (res.code == 200) {
            actionRef.current?.reload()
        }
    }

    const updataClick = (record) => {
        modalRef.current?.setOpen(true)
        modalRef.current?.form.setFieldsValue(record);
        modalRef.current?.setId(record._id)
        setFlag(false)
    }
    const updataConfirm = async (val) => {
        let res = await updateAdviseApi({ ...val, _id: modalRef.current.id })
        if (res.code == 200) {
            actionRef.current?.reload()
        }
    }
    // 定义每列的属性
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '意见标题',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,
            search: true,
            tip: '标题过长会自动收缩',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            disable: true,
            title: '意见等级',
            dataIndex: 'type',
            search: true,
        },
        {
            disable: true,
            title: '意见类型',
            dataIndex: 'label',
            search: false,
            render: (text, record: any, dom, action) => {
                return <span>
                    {typeAdvise?.find(item => {
                        return item.value == record.type
                    })?.label}
                </span>
            }
        },
        {
            disable: true,
            title: '意见描述',
            dataIndex: 'desc',
            search: false,
        },
        {
            disable: true,
            title: '意见内容',
            dataIndex: 'content',
            search: false,
            ellipsis: true,
            render: (text, record: any, dom, action) => {
                return <span onClick={() => {
                    setOpen(true)
                    form.setFieldsValue(record)
                }}>
                    {text}
                </span>
            }
        },
        {
            disable: true,
            title: '作者',
            dataIndex: 'author',
            search: false,
            render: (text, record: any, dom, action) => {
                return <span>
                    {record.author.username}
                </span>
            }
        },
        {
            disable: true,
            dataIndex: 'time',
            valueType: "dateRange",
            hideInTable: true,
        },
        {
            disable: true,
            title: '发布时间',
            dataIndex: 'time',
            valueType: "date",
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <Button
                    disabled={!(info.role > 6)}
                    key={record._id}
                    onClick={() => {
                        confirmMessage("是否删除", async () => {
                            let res = await delAdviseApi({ _id: record._id })
                            if (res.code == 200) {
                                // 存mobx 先删除前端数据
                                actionRef.current?.reload()
                            }
                        })

                    }}
                >
                    删除
                </Button>,
                <Button key={record.type} disabled={!(info.role > 6)} onClick={() => updataClick(record)}>
                    修改
                </Button>,
            ],
        },
    ];

    useEffect(() => {
        updataTypeAdvise()
    }, [])
    return (
        <div>
            <MyModalForm ref={modalRef} title={'修改意见'} confirm={updataConfirm}>
                <ProFormText
                    name="title"
                    label="意见名称"
                    rules={[{ required: true, message: "请填写" }]}
                />
                <ProFormText
                    name="type"
                    label="意见等级"
                    rules={[{ pattern: /\d/, message: '意见等级只能是数字' }, { required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormSelect
                    options={typeAdvise}
                    name="type"
                    label="意见类型"
                    rules={[{ required: true, message: "请填写" }]}
                />
                <ProFormText
                    name="desc"
                    label="意见描述"
                    rules={[{ required: true, message: "请填写" }]}
                />
                <ProFormTextArea
                    name="content"
                    label="意见内容"
                    rules={[{ required: true, message: "请填写" }]}
                />

            </MyModalForm>
            <DrawerForm<{
                name: string;
                company: string;
            }>
                title="意见详情"
                form={form}
                open={open}
                autoFocusFirstInput
                drawerProps={{
                    destroyOnClose: true,
                }}
                onFinish={async (values) => {
                    // 不返回不会关闭弹框
                    setOpen(false)
                    return true;
                }}
                submitter={{
                    render: (props) => {
                        return [
                            <Button
                                key="ok"
                                onClick={() => {
                                    props.submit();
                                }}
                            >
                                确认
                            </Button>,
                            <Button
                                key="cancel"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >Œ
                                取消
                            </Button>,
                        ];
                    },
                }}
            >
                <ProFormText
                    name="_id"
                    label="意见编号"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormText
                    name="title"
                    label="意见名称"
                    rules={[{ required: true, message: "请填写" }]}
                />
                <ProFormText
                    name="type"
                    label="意见等级"
                    rules={[{ pattern: /\d/, message: '意见等级只能是数字' }, { required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormSelect
                    options={typeAdvise}
                    name="type"
                    label="意见类型"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormText
                    name="desc"
                    label="意见描述"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormTextArea
                    name="content"
                    label="意见内容"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormText
                    name={["author", "username"]}
                    label="意见作者"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormDateTimePicker
                    name="time"
                    label="发表时间"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
            </DrawerForm>


            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    // 获取列表
                    console.log(params);

                    //  sort 得到的是个对象,value,需要后端接受
                    let res = await listAdviseApi({ ...params, sort: sort.value == "ascend" ? 1 : -1, time: JSON.stringify(params.time) })
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
                            history.push("/main/anno/addanno")
                        }}
                        type="primary"
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

export default inject("UserInfo")(observer(ListAdvise))