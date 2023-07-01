import { createUserApi, getRoleListApi } from '@/api/pro';
import UserInfo from '@/mobx/reducer/UserInfo';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';







type DataItem = {
  name: string;
  state: string;
};


const UserAdd = () => {
  const { roles, updataRoles, info } = UserInfo
  const [form]=Form.useForm()
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
      initialValue: '123qwe',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      fieldProps: () => {
        return {
          disabled: true,
        }
      },
      width: 'm',
    },
    {
      title:'权限等级',
      dataIndex:'role',
      width:'m',
      fieldProps: () => {
        return {
          disabled: true,
        }
      },
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      valueType: 'select',
      width: 'm',
      tooltip: '当title为disabled时状态无法选择',
      request:async ()=>{
        let res =await getRoleListApi()
        if(res.code==200){
          res.result.forEach(item=>{
            if(info.role>item.value){
              item.disabled=<false></false>
            }
            else{
              item.disabled=true
            }
          })
          return res.result
        }
      }

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




  useEffect(() => {
    updataRoles()
  }, [])

  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={false}
        layoutType="Form"
        form={form}
        onFinish={async (values) => {
          console.log(values);
          let res =await createUserApi(values)
          if(res.code==200){
            form.resetFields()
          }
        }}
        columns={columns}
      />
    </>
  );
};


export default inject("UserInfo")(observer(UserAdd))