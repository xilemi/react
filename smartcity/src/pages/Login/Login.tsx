import React, { FC, useEffect, useState } from 'react'
import MyHeader from '../../components/MyHeader'
import { Form, Input, Button } from 'antd-mobile'
import { loginType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoAsync, loginAndUpdateTokenAsync, updataInfo, updataToken } from '../../rtk/reducers/userSlice'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { reg } from '../../utils/valid'
import { failToast } from '../../utils/message'
import { getUserInfoApi, loginApi } from '../../api/prodApi/userInfo'
import { useCommonFunc, useLocalData } from '../../hooks'
import { useLocation } from 'react-router-dom'
// import "../../style/common.scss"
const Login: FC = () => {
  const [loginInfo] = Form.useForm<loginType>()
  const initialValues: loginType = {
    username: '',
    password: ''
  }
  const { Authorization } = useSelector(state => state.userInfo)
  const [visible, setVisible] = useState(false)
  const dispatch: any = useDispatch()
  const { pathname } = useLocation()
  const { gotopage } = useCommonFunc()
  const { token, setToken } = useLocalData()
  const { setfromPath, settoPath, toPath, fromPath ,setuserName} = useLocalData()
  const subLogin = () => {
    if (loginInfo) {
      dispatch(loginAndUpdateTokenAsync(loginInfo.getFieldsValue())).then((res) => {
        if (!res.error) {
          // setToken(res.payload)
          setuserName(res.payload)
          if (((fromPath.includes("/reg") || fromPath.includes("/login")))) {
            gotopage("/index/mine")
          }
          else {
            // 这里为什么是/index/mine  而 -1 回到的确实reg
            console.log(fromPath);
            gotopage(-1)
          }
        }

      })
    }
  }
  return (
    <>
      <MyHeader title="登录"></MyHeader>
      <div className='center'>
        <Form layout='horizontal' form={loginInfo} initialValues={initialValues} mode='card'
          onFinish={subLogin}
          onFinishFailed={() => failToast("校验失败")}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }>
          <Form.Item label='账号' name="username" rules={[
            { required: true, message: '账号不能为空' }
          ]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item label='密码' name="password">
            <div className="password">
              <Input
                className="input"
                placeholder='请输入密码'
                type={visible ? 'text' : 'password'}
              />
              <div className="eye">
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}



export default Login