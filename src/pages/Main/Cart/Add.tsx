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
import { addCartApi, addOrderApi, delCartApi, listCartApi, updateCartApi } from '@/api/cart';
import { render } from 'react-dom';
import { number } from 'echarts';




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


const CartAdd = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const actionRef = useRef<ActionType>();
  const modalRef = useRef()
  const buyRef = useRef()
  const [flag, setFlag] = useState(true)
  const { updataRoles, info, updataCartType, typeCart } = UserInfo
  useEffect(() => {
    updataCartType()
  }, [])
  const addConfirm = async (val) => {
    let res = await addCartApi(val)
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
    let res = await updateCartApi({ ...val, _id: modalRef.current.id })
    if (res.code == 200) {
      actionRef.current?.reload()
    }
  }
  const buyClick = (record) => {
    buyRef.current?.setOpen(true)
    buyRef.current?.form.setFieldsValue(record);
    buyRef.current?.setId(record._id)
  }
  const buyConfirm = async (val) => {
    let res = await addOrderApi({ ...val, _id: buyRef.current.id })
    if (res.code == 200) {
      successMessage("添加成功")
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
      search: false,
      sorter: true
    },
    {
      disable: true,
      title: '车辆描述',
      dataIndex: 'desc',
      search: false,
      sorter: false
    },
    {
      disable: true,
      title: '车辆库存',
      dataIndex: 'num',
      search: false,
      sorter: false
    },
    {
      disable: true,
      title: '是否上架',
      dataIndex: 'sale',
      search: false,
      sorter: false,
      render: (text, record, dom, action) => {
        return <Switch checkedChildren="上架中" unCheckedChildren="下架中" checked={record?.sale} onClick={async (checked) => {
          let res = await updateCartApi({ _id: record?._id, sale: record?.sale ? 0 : 1 })
          if (res.code == 200) {
            actionRef.current?.reload()
          }
        }} />
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
      key: 'option1',
      render: (text, record, _, action) => [
        <Button
          disabled={!(info.role > 6)}
          key={record?.time}
          onClick={() => {
            confirmMessage("是否删除", async () => {
              let res = await delCartApi({ _id: record._id })
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
    {
      title: '操作',
      valueType: 'option',
      key: 'option2',
      render: (text, record, _, action) => [
        <Button
          disabled={!(info.role > 6)}
          key={record?._id}
          onClick={() => buyClick(record)}
        >
          购买
        </Button>,
      ],
    },
  ];
  return (
    <div>
      <MyModalForm ref={modalRef} title={flag ? "添加车辆" : '修改车辆'} confirm={flag ? addConfirm : updataConfirm}>
        <ProFormText
          name="brand"
          label="车辆名称"
          rules={[{ required: true, message: "请填写" }]}
        />
        <ProFormSelect
          name="type"
          label="车辆类别"
          rules={[{ pattern: /\d/, message: '角色等级只能是数字' }, { required: true, message: "请填写" }]}
          options={typeCart as any}
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
        />
        <ProFormText
          name="desc"
          label="描述"
          rules={[{ required: true, message: "请填写" }]}
        />
        <ProFormText
          name="num"
          label="库存"
          rules={[{ required: true, message: "请填写" }]}
        />
      </MyModalForm>
      <MyModalForm ref={buyRef} title={"添加订单"} confirm={buyConfirm}>
        <ProFormText
          name="brand"
          label="车辆名称"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormSelect
          name="type"
          label="车辆类别"
          rules={[{ pattern: /\d/, message: '角色等级只能是数字' }, { required: true, message: "请填写" }]}
          options={typeCart as any}
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
          label="车辆单价"
          rules={[{ required: true, message: "请填写" }]}
          disabled={true}
        />
        <ProFormText
          name="desc"
          label="描述"
          disabled={true}
          rules={[{ required: true, message: "请填写" }]}
        />
        <ProFormText
          name="count"
          label="数量"
          initialValue={1}
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
          let res = await listCartApi({ ...params, sort: sort.value == "ascend" ? 1 : -1 })
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
              modalRef.current.setOpen(true)
              setFlag(true)
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

export default inject("UserInfo")(observer(CartAdd))