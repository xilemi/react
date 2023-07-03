import React, { useEffect, useState } from 'react'
import {
  ModalForm,
  ProForm,
  ProFormColorPicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { ColorPicker, Form, Switch, message } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import MyModalForm from '@/components/MyModalForm';
import { addRoleApi, delRoleApi, getRoleListApi, listTypeCartApi, updataRoleApi } from '@/api/pro';
import { confirmMessage, successMessage } from '@/utils/message';
import { inject, observer } from 'mobx-react';
import UserInfo from '@/mobx/reducer/UserInfo';
import { addCartApi, addOrderApi, delAftersaleApi, delCartApi, listAftersaleApi, listCartApi, updateAftersaleApi, updateCartApi } from '@/api/cart';
import { render } from 'react-dom';
import { number } from 'echarts';
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


const AfterSale = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const actionRef = useRef<ActionType>();
  const modalRef = useRef()
  const [flag, setFlag] = useState(true)
  const { updataRoles, info, updataCartType, typeCart } = UserInfo
  useEffect(() => {
    updataCartType()
  }, [])
  const updataClick = (record) => {
    modalRef.current?.setOpen(true)
    modalRef.current?.form.setFieldsValue(record);
    modalRef.current?.setId(record._id)
    setFlag(false)
  }
  const updataConfirm = async (val) => {
    let res = await updateAftersaleApi({ ...val, _id: modalRef.current.id })
    if (res.code == 200) {
      actionRef.current?.reload()
    }
  }
  const emunStatus = [
    { value: 1, label: "待分配" },
    { value: 2, label: '处理中' },
    { value: 3, label: '已完成' }
  ]
  // 定义每列的属性
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '订单号',
      dataIndex: 'orderId'
    },
    {
      title: '车辆品牌',
      dataIndex: 'brand',
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
      title: '车辆类别',
      dataIndex: 'type',
      search: false,
      render: (text, record: any, dom, action) => {
        return typeCart.find(item => {
          return item.value == record.type
        }).label
      }
    },
    {
      disable: true,
      title: '车辆级别',
      dataIndex: 'type',
      search: false,
      sorter: true
    },
    {
      disable: true,
      title: '车辆价格',
      dataIndex: 'price',
      search: true,
      sorter: true
    },
    {
      disable: true,
      title: '订单总价',
      dataIndex: 'total',
      search: false,
      sorter: true,
      render: (text, record: any, dom, action) => {
        return record.count * record.price
      }
    },
    {
      disable: true,
      title: '售后状态',
      dataIndex: 'status',
      search: true,
      sorter: true,
      render: (text, record: any, dom, action) => {
        return emunStatus.find(item=>{
          return item.value==record.status
        })?.label
      }
    },
    {
      disable: true,
      title: '添加时间',
      dataIndex: 'time',
      valueType: 'date',
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
              let res = await delAftersaleApi({ _id: record._id })
              if (res.code == 200) {
                // 存mobx 先删除前端数据
                actionRef.current?.reload()
              }
            })

          }}
        >
          删除
        </Button>,
        <Button key={record.value} disabled={!(info.role > 6)} onClick={() => updataClick(record)}>
          修改
        </Button>,
      ],
    },
  ];
  return (
    <div>
      <MyModalForm ref={modalRef} title={'修改售后'} confirm={updataConfirm}>
        <ProFormText
          name="orderId"
          label="订单号"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        /> <ProFormText
          name="brand"
          label="车辆名称"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormSelect
          name="type"
          label="车辆类别"
          rules={[{ pattern: /\d/, message: '角色等级只能是数字' }, { required: true, message: "请填写" }]}
          options={typeCart}
          disabled={true}
        />
        <ProFormText
          name="type"
          label="车辆等级"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormText
          name="price"
          label="价格"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormText
          name="count"
          label="件数"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormSelect
          name="status"
          label="售后状态"
          options={ emunStatus}
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
          let res = await listAftersaleApi({ ...params, sort: sort.value == "ascend" ? 1 : -1 })
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
              history.push("/main/sales/order")
              // 会让main刷新
              updataRoles()
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

export default inject("UserInfo")(observer(AfterSale))