import { addAnnoApi, listTypeAnnoApi } from '@/api/pro';
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
    title: '公告标题',
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
    title: '公告等级',
    dataIndex: 'type',
    width: 'm',
    fieldProps: () => {
      return {
        disabled: true,
      }
    },
  },
  {
    title: '公告类型',
    dataIndex: 'type',
    valueType: 'select',
    width: 'm',
    tooltip: '当title为disabled时状态无法选择',
    request: async () => {
      let res = await listTypeAnnoApi()
      if (res.code == 200) {
        return res.result
      }
    }
  },
  {
    title: '公告描述',
    dataIndex: 'desc',
    width: 'm',
  },
  {
    title: '公告内容',
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

const AddAnno = () => {

  const { info } = UserInfo
  const [form] = Form.useForm()
  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={false}
        layoutType="Form"
        form={form}
        onFinish={async (values) => {
          let res = await addAnnoApi({ ...values })
          if (res.code == 200) {
            form.resetFields()
          }
        }}
        columns={columns}
      />
    </>
  );
};


export default inject("UserInfo")(observer(AddAnno))