import React, { useState } from 'react'
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
import { addRoleApi, addTypeAdviseApi, addTypeAnnoApi, addTypeCartApi, delRoleApi, delTypeAdviseApi, delTypeAnnoApi, delTypeCartApi, getRoleListApi, listTypeAdviseApi, listTypeAnnoApi, listTypeCartApi, updataRoleApi, updateAdviseTypeApi, updateCartTypeApi, updateTypeAnnoApi } from '@/api/pro';
import { confirmMessage } from '@/utils/message';
import { inject, observer } from 'mobx-react';
import UserInfo from '@/mobx/reducer/UserInfo';




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


const AnnoType = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const actionRef = useRef<ActionType>();
  const modalRef = useRef()
  const [flag, setFlag] = useState(true)
  const { updataRoles } = UserInfo
  const addConfirm = async (val) => {
    let res = await addTypeAdviseApi(val)
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
    let res = await updateAdviseTypeApi({ ...val, _id: modalRef.current.id })
    if (res.code == 200) {
      actionRef.current?.reload()
      updataRoles()
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
      title: '建议类型',
      dataIndex: 'label',
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
      title: '建议等级',
      dataIndex: 'value',
      search: true,
      sorter: true
    },
    {
      disable: true,
      title: '建议属性',
      dataIndex: 'color',
      search: false,
      render: (text, record: any, dom, action) => {
        return <Space key={record._id}>
          <ColorPicker value={record?.color} disabled={true} />
          {record?.color}
        </Space>
      }
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key={record._id}
          onClick={() => {
            confirmMessage("是否删除", async () => {
              let res = await delTypeAdviseApi({ _id: record._id })
              if (res.code == 200) {
                // 存mobx 先删除前端数据
                actionRef.current?.reload()
              }
            })

          }}
        >
          删除
        </a>,
        <a key={record.value} onClick={() => updataClick(record)}>
          修改
        </a>,
      ],
    },
  ];




  return (
    <div>
      <MyModalForm ref={modalRef} title={flag ? "添加建议类型" : '修改建议类型'} confirm={flag ? addConfirm : updataConfirm}>
        <ProFormText
          name="label"
          label="建议类型"
          rules={[{ required: true, message: "请填写" }]}
        />
        <ProFormText
          name="value"
          label="建议等级"
          rules={[{ pattern: /\d/, message: '建议等级只能是数字' }, { required: true, message: "请填写" }]}
        />
        <ProFormColorPicker
          name="color"
          label="建议属性"
          rules={[{ required: true, message: "请填写" }]}
          initialValue={"red"}
        />
      </MyModalForm>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          // 获取列表
          //  sort 得到的是个对象,value,需要后端接受
          let res = await listTypeAdviseApi({ ...params, sort: sort.value == "ascend" ? 1 : -1 })
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

export default inject("UserInfo")(observer(AnnoType))