import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import MyHeader from '../../../components/MyHeader'
import { Form, Input, Button, Radio, Space, List, Avatar, CenterPopup } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { NavLink } from 'react-router-dom'
import { useCommonFunc, useLocalData } from '../../../hooks'
import { getUserInfoApi, resetPwdApi, resetUserInfoApi } from '../../../api/prodApi/userInfo'
import { userInfoType } from '../../../types'
import { useSelector } from 'react-redux'
import ResetCommon from '../../../components/ResetCommon'
import MyUpload from '../../../components/MyUpload'
import { imgBaseUrl } from '../../../utils/request'
import QRCode from 'qrcode.react';

const UserInfo = () => {
    const [userInfo] = Form.useForm<userInfoType>()
    const [visiblePwd, setvisiblePwd] = useState(false)
    const [oldValue, setOldValue] = useState({ key: "", title: "", val: "", types: '' })
    const { gotopage } = useCommonFunc()
    const { info } = useSelector(state => state.userInfo)
    const [visible, setVisible] = useState(false)
    const [visibleQr, setVisibleQr] = useState(false)
    const { refresh } = useCommonFunc()
    const {userName}=useLocalData()
    const setVisibleHandler = (payload) => {
        setVisible(payload)
    }
    const onSub = async (val) => {
        let res = await resetUserInfoApi({...val,userName})
        if (res.code = 200) {
            refresh()
            setVisible(false)
        }
    }
    const changeClick = (value) => {
        setOldValue(value)
        setVisible(true)
    }
    // 异步 会慢
    useLayoutEffect(() => {
        userInfo.setFieldsValue(info)
        console.log(info);
    }, [visible])
    return (
        <>
            <MyHeader title="个人信息"></MyHeader>
            <div className='center'>
                <List mode='card'>
                    <List.Item extra={<MyUpload><Avatar src={info?.avatar ? imgBaseUrl + info?.avatar : ''} style={{ borderRadius: '50%', "--size": "48px" }} /></MyUpload>}>头像</List.Item>
                    <List.Item extra={info.userName}>用户名</List.Item>
                    <List.Item extra={info.userId}>用户ID</List.Item>
                    <List.Item extra={info.nickName} onClick={() => changeClick({ key: "nickName", title: "昵称", val: info.nickName, types: '0' })}>昵称</List.Item>
                    <List.Item extra={info.phonenumber} onClick={() => changeClick({ key: "phonenumber", title: "电话", val: info.phonenumber, types: '0' })}>电话</List.Item>
                    <List.Item extra={info.sex == "0" ? "男" : "女"} onClick={() => changeClick({ key: "sex", title: "性别", val: info.sex, types: '1' })}>性别</List.Item>
                    <List.Item extra={info.email} onClick={() => changeClick({ key: "email", title: "邮箱", val: info.email, types: '0' })}>邮箱</List.Item>
                    <List.Item extra={info.idCard} onClick={() => changeClick({ key: "idCard", title: "身份证", val: info.idCard, types: '0' })}>身份证</List.Item>
                    <List.Item arrow={true} onClick={() => setVisibleQr(true)}>二维码</List.Item>
                </List>
                <ResetCommon visible={visible} setVisibleHandler={setVisibleHandler} onSub={onSub} oldValue={oldValue}></ResetCommon>
                <CenterPopup
                    visible={visibleQr}
                    onMaskClick={() => {
                        setVisibleQr(false)
                    }}
                    style={{ "--max-width": "260px", "--background-color": "#000000" }}
                >
                    <div><QRCode
                        id="qrCode"
                        value={"http://192.168.59.106:7700/" + "?" + "userId" + "=" + info.userId}
                        size={280} // 二维码的大小
                        fgColor="#000000" // 二维码的颜色
                        style={{ textAlign: 'center', width: 280, height: 258, borderRadius: 8 }}
                        imageSettings={{ // 二维码中间的logo图片
                            src: 'logoUrl',
                            height: 100,
                            width: 100,
                            excavate: true, // 中间图片所在的位置是否镂空
                        }}
                    />
                    </div>
                </CenterPopup>
            </div >
        </>
    )
}

export default UserInfo