import { loginApi } from '@/api/pro'
import { successMessage } from '@/utils/message'
import { Button, Tabs } from 'antd'
import React from 'react'
import "@/styles/login.scss"
import AccountLogin from './AccountLogin'
import PhoneLogin from './PhoneLogin'


const Login = () => {
  const items = [{
    key: '1',
    label: `账号登录`,
    children: <AccountLogin/>,
  },
  {
    key: '2',
    label: `手机号登录`,
    children: <PhoneLogin/>,
  },]

  return (
    <>
      <div className='lgbox'>
        <div className='mybg'></div>
        <div className='login-box'>
          <div className="title">用户登录</div>
          <div className="box"> <Tabs defaultActiveKey="1" items={items} />;</div>
        </div>
      </div>
    </>
  )
}

export default Login