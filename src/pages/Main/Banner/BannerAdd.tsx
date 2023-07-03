import { addBannerApi, delBannerApi, listBannerApi, updateBannerApi } from '@/api/cart';
import ComUpload from '@/components/ComUpload';
import { successMessage } from '@/utils/message';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

/* 
desc
link
path
time
status
*/




const BannerAdd = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '图片',
      dataIndex: 'path',
      valueType: 'image',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      readonly: true,
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      width: '10%',
    },
    {
      title: '图片地址',
      width: '20%',
      dataIndex: 'path',
      renderFormItem: () => (<ComUpload />),
    },
    {
      title: '图片链接',
      dataIndex: 'link',
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      width: '15%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        "true": {
          text: '展示',
          status: 'Error',
        },
        "flase": {
          text: '隐藏',
          status: 'Success',
        },
      },
      width: "10%"
    },
    {
      title: '图片描述',
      dataIndex: 'desc',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '添加时间时间',
      dataIndex: 'time',
      valueType: 'date',
      readonly: true,
      width: "15%"
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record: any, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(111);
            actionRef.current?.startEditable?.(record?.id);
            setFlag(true) 
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            setDataSource(dataSource.filter((item) => item.id !== record?.id));
            let res = await delBannerApi({ _id: record?._id })
            if (res.code == 200) {
             successMessage("删除成功")
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  const actionRef = useRef()
  const [flag, setFlag] = useState(false)
  const addBanner = async (val: any) => {
    let res = await addBannerApi(val)
    if (res.code == 200) {
      actionRef.current.reload()
    }
  }
  const updateBanner = async (val) => {
    let res = await updateBannerApi(val)
    if (res.code == 200) {
      successMessage("更新成功")
      setFlag(false)
    }
  }

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        maxLength={5}
        actionRef={actionRef}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
              position: position as 'top',
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async (val) => {
          let res = await listBannerApi(val)
          if (res.code == 200) {
            return { data: res.result }
          }
        }}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: (rowKey, data, row) => {
            console.log(rowKey);
            console.log(flag);
            flag ? updateBanner(data) : addBanner(data)
          },
          onChange: (rowKey) => {
            // 添加一行也会触发 change
            setEditableRowKeys(rowKey)
          }
        }}
      />
    </>
  );
};


export default BannerAdd