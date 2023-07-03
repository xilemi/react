import { changeuserinfoApi, getRoleListApi, getUserInfoApi, uplodafileApi } from '@/api/pro';
import { useLocalData } from '@/hooks';
import UserInfo from '@/mobx/reducer/UserInfo';
import { baseURL } from '@/utils/request';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Avatar, Button, Form, Input, Modal } from 'antd';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { history } from 'umi';
import { useState } from 'react';
import {
    EditOutlined
} from '@ant-design/icons';
const imgStyle = {
    display: 'block',
    width: 42,
    height: 42,
};
import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { listAftersaleApi, listOrderApi } from '@/api/cart';
import ComUpload from '@/components/ComUpload';

type DataItem = {
    name: string;
    state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
    {
        title: '用户名',
        dataIndex: 'username',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    }, 
    {
        title: '手机号',
        dataIndex: 'phone',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    },
    {
        title: '密码',
        dataIndex: 'password',
        initialValue: '必填',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    },
    {
        title: 'role',
        dataIndex: '角色权限',
        initialValue: '必填',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        width: 'm',
    },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'createName',
        valueType: 'date',
    },
    {
        valueType: 'divider',
    },
];

const Mine = () => {
    const actionRef = useRef()
    const [form] = Form.useForm()
    const fileRef = useRef()
    const { token, setToken } = useLocalData()
    const { info, updataInfo } = UserInfo
    const [responsive, setResponsive] = useState(false);
    const [orderList, setOrderList] = useState([])
    const [aftersaleList, setAftersaleList] = useState([])
    const [money, setMoney] = useState(0)
    const [order, setOrder] = useState(0)
    const [aftersale, setAftersale] = useState(0)
    const getUserInfo = async () => {
        let res = await getUserInfoApi()
        if (res.code == 200) {
            form.setFieldsValue(res.result)
        }
    }
    const uploadFile = async () => {
        const file = fileRef.current.files[0]
        const data = new FormData()
        data.append("file", file)
        let res = await uplodafileApi(data)
        if (res.code == 200) {
            let a = await changeuserinfoApi({ avatar: res.path })
            if (res.code == 200) {
                updataInfo()
            }
        }
    }
    const getOrderList = async () => {
        let res = await listOrderApi({})
        if (res.code == 200) {
            setOrder(res.result.filter(item => {
                return item.author.username == info.username
            }).length)
            setMoney(res.result.filter(item => {
                return item.author.username == info.username
            }).reduce((current, prev) => {
                return current + prev.total
            }, 0))
        }
    }
    const getAftersaleList = async () => {
        let res = await listAftersaleApi({})
        if (res.code == 200) {
            setAftersale(res.result.filter(item => item.author.username == info.username && item.status == 2).length)
        }
    }
    // 当前用户的订单数






    useLayoutEffect(() => {
        getUserInfo()
        getOrderList()
        getAftersaleList()
    }, [])
    const columns: ProFormColumnsType<DataItem>[] = [
        {
            title: '用户名',
            dataIndex: 'username',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
        },
        {
            title: '昵称',
            dataIndex: 'phone',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
        },
        {
            title: '密码',
            dataIndex: 'password',
            valueType: 'password',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
        },
        {
            title: '角色权限',
            dataIndex: 'role',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
        },
        {
            title: '角色类型',
            dataIndex: 'role',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
            valueType: 'select',
            request: async () => {
                let res = await getRoleListApi()
                if (res.code == 200) {
                    return res.result
                }
            }
        },

        {
            valueType: 'divider',
        },
    ];
    return (
        <>
            <div style={{ marginBottom: 30 }}>
                <h2>头像</h2>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    src={info?.avatar.replace("public", baseURL)}
                    icon={<EditOutlined style={{ fontSize: 50 }} />}
                    onClick={() => {
                        fileRef.current.click()
                    }}
                />
                <input type="file" style={{ display: "none" }} ref={fileRef} onChange={uploadFile} />
                <BetaSchemaForm<DataItem>
                    shouldUpdate={false}
                    layoutType="Form"
                    form={form}
                    formRef={actionRef}
                    onFinish={async (values) => {
                        let res = await changeuserinfoApi(values)
                        if (res.code == 200) {
                            getUserInfo()
                        }
                    }}
                    columns={columns}
                    submitter={{
                        render: (props, defaultDoms) => {
                            return [
                                <Button
                                    key="ok"
                                    onClick={() => {
                                        props.submit();
                                    }}
                                >
                                    修改信息
                                </Button>,
                                <Button
                                    key="exit"
                                    onClick={() => {
                                        //退出登录
                                        Modal.confirm({
                                            title: "注销提示",
                                            content: "是否注销登录",
                                            okText: '确认注销',
                                            okType: 'danger',
                                            cancelText: '取消',
                                            onOk: () => {
                                                setToken("")
                                                history.replace("/login")
                                            }
                                        })

                                    }}
                                >
                                    退出登录
                                </Button>,
                            ];
                        },
                    }}
                />
            </div>
            <RcResizeObserver
                key="resize-observer"
                onResize={(offset) => {
                    setResponsive(offset.width < 596);
                }}

            >
                <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
                    <StatisticCard
                        statistic={{
                            title: '支付金额',
                            value: money,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '订单数量',
                            value: order,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '待评价',
                            value: 87,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '售后中',
                            value: aftersale,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    );
};
export default inject("UserInfo")(observer(Mine))