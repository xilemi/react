import { listAttendanceApi, updateAttendanceApi } from '@/api/cart';
import MyModalForm from '@/components/MyModalForm';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import { render } from 'react-dom';
import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

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



const List = () => {
    const actionRef = useRef<ActionType>();
    const modalRef = useRef()
    const updataClick = (record) => {
        modalRef.current?.setOpen(true)
        modalRef.current?.form.setFieldsValue(record);
        modalRef.current?.setId(record._id)
    }

    const updataConfirm = async (val) => {
        let res = await updateAttendanceApi({ ...val, _id: modalRef.current.id } )
        if (res.code == 200) {
            actionRef.current?.reload()
        }
    }

    const columns: ProColumns<GithubIssueItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '打卡时间',
            dataIndex: 'fullTime',
            copyable: true,
            ellipsis: true,
            valueType: "date",
            search: false,
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
            title: '上午',
            dataIndex: 'startTime',
            copyable: true,
            ellipsis: true,
            valueType: "dateTime",
            search: false,
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
            title: '下午',
            dataIndex: 'endTime',
            copyable: true,
            valueType: "dateTime",
            ellipsis: true,
            search: false,
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
            title: '工作时长',
            dataIndex: 'time',
            copyable: true,
            ellipsis: true,
            tip: '标题过长会自动收缩',
            search: false,
            width: "10%",
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
            title: '状态',
            dataIndex: 'state',
            filters: true,
            onFilter: true,
            width: "10%",
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                "true": {
                    text: '出勤',
                    status: 'Error',
                },
                "false": {
                    text: '缺勤',
                    status: 'Success',
                    disabled: true,
                },
            },
        },
        {
            disable: true,
            title: '用户名',
            dataIndex: ["author", "username"],
            search: false,
            width: "10%",
        },
        {
            title: '打卡时间',
            dataIndex: 'fullTime',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0],
                        endTime: value[1],
                    };
                },
            },
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: "10%",
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        updataClick(record)
                    }}
                >
                    编辑
                </a>
            ],
        },
    ];
    return (
        <div>
            <MyModalForm ref={modalRef} confirm={updataConfirm}>
                <ProFormText
                    name="fullTime"
                    label="打卡时间"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                    dataFormat='dataTime'
                />
                <ProFormText
                    name="startTime"
                    label="上午"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                />
                <ProFormText
                    name="endTime"
                    label="下午"
                    rules={[{ required: true, message: "请填写" }]}
                    disabled={true}
                    dataFormat='dataTime'
                />
                <ProFormSelect
                    name="state"
                    label="状态"
                    rules={[{ required: true, message: "请填写" }]}
                    valueEnum={
                        {
                            "true": {
                                text: '出勤',
                                status: 'Error',
                            },
                            "false": {
                                text: '缺勤',
                                status: 'Success',
                            },
                        }
                    }
                />
            </MyModalForm>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    // await waitTime(2000);
                    let res = await listAttendanceApi(params)
                    if (res.code == 200) {
                        return { data: res.result }
                        actionRef.current?.reload()
                    }
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
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
                    // syncToUrl: (values, type) => {
                    //     if (type === 'get') {
                    //         return {
                    //             ...values,
                    //             created_at: [values.startTime, values.endTime],
                    //         };
                    //     }
                    //     return values;
                    // },
                }}
                pagination={{
                    pageSize: 5,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
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
                                    key: '1',
                                },
                                {
                                    label: '3rd item',
                                    key: '1',
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
    );
};


export default List