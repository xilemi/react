import { sentCaptchaApi } from '@/api/pro'
import { Button, Col, Form, Input, Popover, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import PhoneLogin from './PhoneLogin'
import { reg } from '@/utils/validate'
import { useCountDown } from 'ahooks'
import { Vertify } from '@alex_xu/react-slider-vertify';
import { failMessage } from '@/utils/message'

const Captcha = ({ phone }) => {
    // 根据phone发送验证码

    const [visible, setVisible] = useState(false);

    // 控制是否显示验证码
    const [toggle, setToggle] = useState(false)

    const [targetDate, setTargetDate] = useState<number>();
    const total = 5
    const [countdown] = useCountDown({
        targetDate,
        onEnd: () => {
            setToggle(false)
        },
    });
    const sentCaptcha = async () => {
        let res = await sentCaptchaApi({ phone })
        if (res.code == 200) {
            setTargetDate(Date.now() + total * 1000)
            setToggle(true)
        }
    }
    const onSuccess = () => {
        setVisible(false);
        sentCaptcha()
    }
    const onFail = () => {
        setVisible(false)
        failMessage("请重新验证")
        setTimeout(() => {
            setVisible(true)
        })
    }
    return (
        <Form.Item label="验证码">
            <Row gutter={8}>
                <Col span={15}>
                    <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    {
                        toggle ? <Button disabled={true}>剩余{Math.round(countdown / 1000)}s</Button> : <Popover content={<Vertify
                            width={320}
                            height={160}
                            onSuccess={onSuccess}
                            onFail={onFail}
                            visible={visible}
                        />} trigger="click">
                            <Button onClick={() => setVisible(true)} disabled={!reg.phone.test(phone)}>发送验证码</Button>
                        </Popover>
                    }
                </Col>
            </Row>
        </Form.Item>

    )
}

export default Captcha