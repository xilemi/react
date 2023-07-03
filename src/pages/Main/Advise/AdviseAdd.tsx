import { addAdviseApi, addAnnoApi, listTypeAdviseApi, listTypeAnnoApi } from '@/api/pro';
import UserInfo from '@/mobx/reducer/UserInfo';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { inject, observer } from 'mobx-react';


type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '意见标题',
    dataIndex: 'title',
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
    title: '意见等级',
    dataIndex: 'type',
    width: 'm',
    fieldProps: () => {
      return {
        disabled: true,
      }
    },
  },
  {
    title: '意见类型',
    dataIndex: 'type',
    valueType: 'select',
    width: 'm',
    tooltip: '当title为disabled时状态无法选择',
    request: async () => {
      let res = await listTypeAdviseApi()
      if (res.code == 200) {
        return res.result
      }
    }
  },
  {
    title: '意见描述',
    dataIndex: 'desc',
    width: 'm',
  },
  {
    title: '意见内容',
    dataIndex: 'content',
    width: 'm',
    renderFormItem:()=>{
      return <TextArea name="" id="" cols="20" rows="5"></TextArea>
    }
  },
  {
    valueType: 'divider',
  },
];

const AddAdvise = () => {

  const { info } = UserInfo
  const [form] = Form.useForm()
  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={false}
        layoutType="Form"
        form={form}
        onFinish={async (values) => {
          console.log(values);
          let res = await addAdviseApi({ ...values })
          if (res.code == 200) {
            form.resetFields()
          }
        }}
        columns={columns}
      />
    </>
  );
};


export default inject("UserInfo")(observer(AddAdvise))