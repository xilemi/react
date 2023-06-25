import React, { FC, useEffect, useLayoutEffect, useState, } from 'react'
import MyHeader from '../../../components/MyHeader'
import { useDispatch, useSelector } from "react-redux"
import { List, Avatar } from 'antd-mobile'
import { getUserInfoAsync, loginAndUpdateTokenAsync, updataInfo, updataToken } from '../../../rtk/reducers/userSlice'
import { useCommonFunc, useLocalData } from '../../../hooks'
import Reset from '../../../components/Reset'
import { imgBaseUrl } from '../../../utils/request'
import { failToast } from '../../../utils/message'
import { getUserInfoApi } from '../../../api/prodApi/userInfo'
import getLocalToken from '../../../utils/getLoaclToken'
const Mine: FC = () => {
    // 登录后进入首页,会存token rtk 中会有Authorization
    const { Authorization, info } = useSelector(state => state.userInfo)
    const { setToken } = useLocalData()
    const {userName,setuserName}=useLocalData()
    const defaultUserInfo = {
        userId: "",
        userName: "",
        nickName: "",
        email: "",
        phonenumber: "",
        sex: "0",
        avatar: '',
        idCard: "",
        balance: "",
        score: ""
    }
    const { gotopage, refresh } = useCommonFunc()
    // const [userInfo, setUserInfo] = useState<userInfoType>(defaultUserInfo)
    const dispatch: any = useDispatch()
    const logout = () => {
        setToken(""),
        setuserName("")
        dispatch(updataToken(null))
        dispatch(updataInfo(null))
    }
    const [visible, setVisible] = useState(false)
    const setVisibleHandler = (payload) => {
        setVisible(payload)
    }
    useEffect(() => {
        if (!info) {
            dispatch(getUserInfoAsync({userName:userName}))
        }
    }, [])
    const onGoInfo = () => {
        if ((Authorization && info)||userName) {
            gotopage("/index/userinfo")
        } else {
            failToast("请登录")
        }
    }
    return (
        <>
            <MyHeader title='我的'></MyHeader>
            <div className='center'>
                <List mode='card'>
                    {/* 点击跳个人信息页面 */}
                    <List.Item
                        prefix={<Avatar src={info?.avatar ? imgBaseUrl + info?.avatar : ''} style={{ borderRadius: '50%', "--size": "48px" }} />}
                        description={info?.userId ? "ID:" + info?.userId : "ID:"}
                        arrow={true}
                        onClick={onGoInfo}
                    >
                        用户名:{info?.userName}
                    </List.Item>
                </List>
                <List mode='card'>
                    <List.Item arrow={true} >
                        订单列表
                    </List.Item>
                    <List.Item arrow={true} onClick={() => setVisible(true)}>修改密码</List.Item>
                    <List.Item arrow={true}>意见反馈</List.Item>
                    {
                        Authorization ? <List.Item arrow={true} onClick={logout}>注销登录</List.Item> : <List.Item arrow={true} onClick={() => gotopage("/login")}>登录授权</List.Item>
                    }
                </List>
                <Reset visible={visible} setVisibleHandler={setVisibleHandler}></Reset>
            </div>
        </>


    )
}

// 组件化修改   需要传入  visible  父组件修改 visible 并且传入 子组件   点击x 的父组件 传递过来的事件
// 可以控制的地方是 中间 传入的表单 




export default Mine