import { getTokenApi, loginApi, sentCaptchaApi, verifyCaptchaApi } from '@/api/pro';
import { useCommonFc, useLocalData } from '@/hooks';
import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { useLocalStorageState, useRequest } from 'ahooks';
import { Button, Divider, message, Modal, Space, Tabs } from 'antd';
import type { CSSProperties, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { Vertify } from '@alex_xu/react-slider-vertify';
import { reg } from '@/utils/validate';
type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
const LoginPro: FC = () => {
    const [loginType, setLoginType] = useState<LoginType>('phone');
    const [isremember, setIsremember] = useLocalStorageState("isremember")
    const form = useRef<any>()
    const { account, setAccount, token, setToken } = useLocalData()
    const [password, setPassword] = useLocalStorageState("password")
    const [phone, setPhone] = useLocalStorageState("phone")
    const { gotopage } = useCommonFc()
    const captchaRef = useRef()
    // loginAction.run()接受传入的值
    const loginAction = useRequest(loginApi, {
        manual: true,
        onSuccess: (res, paramas) => {
            if (res.code == 200) {
                if (form.current.getFieldValue("remember")) {
                    setAccount(form.current.getFieldValue("account"))
                    setPassword(form.current.getFieldValue("password"))
                    setIsremember(true)
                }
                else {
                    setAccount("")
                    setPassword("")
                    setIsremember(false)
                }
                setToken(res.token)
                gotopage("/main/home")
            }
        }
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const sentCaptcha = useRequest(sentCaptchaApi, {
        manual: true,
        onSuccess: (res, paramas) => {
            // 成功后开启倒计时
            if (res.code == 200) {
                captchaRef.current?.startTiming();
            }
        }
    })
    const onSuccess = () => {
        setIsModalOpen(false)
        // 滑块验证成功可以开启登录
        sentCaptcha.run({ phone: form.current.getFieldValue("phone") })
    }
    const getToken = useRequest(getTokenApi, {
        manual: true,
        onSuccess: (res: any, paramas) => {
            if (res.code == 200) {
                setToken(res.token)
            }
        }
    })
    const phoneLoginAction = useRequest(verifyCaptchaApi, {
        manual: true,
        onSuccess: (res, paramas) => {
            // 验证成功获取token
            if (res.code == 200) {
                setPhone(form.current.getFieldValue("phone"))
                getToken.run({ phone })
                gotopage("/main/home")
            }
        }
    })
    const [val,setVal]=useState("")
    const onChange=(e)=>{
        setVal(e.target.value)
    }
    useEffect(() => {
        form.current.setFieldValue("remember", isremember),
            form.current.setFieldValue("account", account)
        form.current.setFieldValue("password", password)
        form.current.setFieldValue("phone", phone)
    }, [])
    return (
        <div
            style={{
                backgroundColor: 'white',
                height: 'calc(100vh - 48px)',
                margin: -24,
            }}
        >
            <LoginFormPage
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="喜乐汽车"
                subTitle="后台管理系统"
                formRef={form}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
                            <span
                                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
                            >
                                其他登录方式
                            </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
                            </div>
                        </Space>
                    </div>
                }
                submitter={{
                    render: (props: any, doms: any) => {
                        return [

                            <div>
                                <Button style={{ marginRight: 50 }} onClick={() => loginType === "account" ? loginAction.run(form.current.getFieldsValue()) : phoneLoginAction.run(form.current.getFieldsValue())}>登录</Button>
                                <Button onClick={() => form.current?.resetFields()}>重置</Button>
                            </div>

                        ]
                    }
                }}
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}

                >
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="account"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名: '}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'密码: '}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            onChange={(e)=>onChange(e)}
                            name="phone"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            captchaProps={{
                                size: 'large',
                                disabled:!reg.phone.test(val)
                            }}
                            fieldRef={captchaRef}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={() => {
                                // 只是开启的作用
                                setIsModalOpen(true)
                                return new Promise((resolve, reject) => {
                                    reject();
                                });
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="remember">
                        记住密码
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginFormPage>
            <Modal title="验证码" open={isModalOpen}
                closable={false} footer={null}
                maskClosable={true}
                mask={true}
            >
                <Vertify
                    width={320}
                    height={160}
                    onSuccess={onSuccess}
                />
            </Modal>
        </div >
    );
};


export default LoginPro