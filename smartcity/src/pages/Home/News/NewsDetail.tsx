import React, { FC, memo, useEffect, useRef, useState } from 'react'
import MyHeader from '../../../components/MyHeader'
import { useParams } from 'react-router-dom'
import { addNewsCommentApi, addNewsCommentLikeApi, addNewsLikeApi, getNewsCommentsApi, getNewsDetailApi } from '../../../api/news'
import { Badge, Button, Card, Empty, Form, Image, Input, Popup, TextArea } from 'antd-mobile'
import { baseURL } from '../../../utils/request'
import { LikeOutline, EyeOutline, LinkOutline, MessageOutline, UpCircleOutline } from 'antd-mobile-icons'
import { failToast, successToast } from '../../../utils/message'
import { useCommonFunc } from '../../../hooks'
import ResetCommon from '../../../components/ResetCommon'
import { useSelector } from 'react-redux'
const NewsDetail = () => {
    type newsDetailType = {
        cover: string,
        content: string,
        title: string,
        updateTime: string,
        commentNum: number,
        readNum: number,
        likeNum: number
    }
    type commentsType = {
        content: string,
        commentDate: string,
        userName: string,
        likeNum: number,
        id: number
    }
    const params = useParams()
    const [newsInfo, setNewsInfo] = useState<newsDetailType>()
    const [commentsList, setcommentsList] = useState<commentsType[]>([])
    const { Authorization } = useSelector(state => state.userInfo)
    const { gotopage } = useCommonFunc()
    const topRef = useRef()
    const commentRef = useRef()
    const getNewsDetail = async () => {
        let res = await getNewsDetailApi(params.id)
        if (res.code == 200) {
            console.log(res.data);
            setNewsInfo(res.data)
        }
    }
    const getCommentsList = async () => {
        let res = await getNewsCommentsApi({ newsId: params.id })
        if (res.code == 200) {
            setcommentsList(res.rows.reverse())
            console.log(res.rows, "111");
        }
    }
    const addNewsLike = async () => {
        if (Authorization) {
            let res = await addNewsLikeApi(params.id)
            if (res?.code == 200) {
                setNewsInfo({ ...newsInfo, likeNum: newsInfo.likeNum + 1 })
                successToast("点赞成功")
            }
        }
        else {
            failToast("请先登录")
            gotopage("/login")
        }
    }
    const addNewsCommentLike = async (item, index) => {
        if (Authorization) {
            let res = await addNewsCommentLikeApi(item.id)
            if (res?.code == 200) {
                item.likeNum += 1
                commentsList.splice(index, 1, { ...item })
                setcommentsList([...commentsList])
            }
        }
        else {
            failToast("请先登录")
            gotopage("/login")
        }
    }
    const [commentInfo] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const addNewsComment = async () => {
        if (Authorization) {
            let res = await addNewsCommentApi({ newsId: params.id, ...commentInfo.getFieldsValue() })
            if (res.code == 200) {
                setVisible(false)
                commentInfo.resetFields()
                getCommentsList()
            }
        } else {
            failToast("请先登录")
            gotopage("/login")
        }

    }
    useEffect(() => {
        getNewsDetail()
        getCommentsList()
    }, [])
    const rigths = (<div style={{ fontSize: 20, width: 160, display: 'flex', justifyContent: 'space-between' }}>
        <Badge content={newsInfo?.commentNum}>
            <MessageOutline />
        </Badge>
        <Badge content={newsInfo?.likeNum}>
            <LikeOutline onClick={addNewsLike} />
        </Badge>
        <Badge content={newsInfo?.readNum}>
            <EyeOutline />
        </Badge>
        <Badge >
            <LinkOutline />
        </Badge>
    </div>)
    return (
        <>
            <MyHeader title='新闻详情'></MyHeader>
            <div className="center" style={{ margin: "0 10px", backgroundColor: '#fff' }} >
                <Image src={baseURL + newsInfo?.cover} ref={topRef} />
                <div style={{ fontSize: 20, marginBottom: 20 }}>{newsInfo?.title}</div>
                <base href={baseURL}></base>
                <div dangerouslySetInnerHTML={{ __html: newsInfo?.content }} />
                <div style={{ marginTop: 20, }}><span style={{ marginRight: 10 }}>:</span>{newsInfo?.updateTime}</div>
                {/* 评论列表 */}
                <div ref={commentRef}>
                    {
                        commentsList.length ? <>
                            {
                                commentsList.map((item, index) => {
                                    return <div style={{ height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: 10 }} key={item.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>                               <span>{item.userName}</span>
                                            <span>{item.commentDate}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>                               <span>{item.content}</span>
                                            <Badge content={item?.likeNum}>
                                                <LikeOutline onClick={() => addNewsCommentLike(item, index)} />
                                            </Badge>
                                        </div>

                                    </div>
                                })



                            }
                        </> : <>
                            <Empty description='暂无数据' />
                        </>
                    }
                </div>
            </div >
            {/* 底部 */}
            <div>
                <Form layout='horizontal'>
                    <Form.Item
                        label=''
                        extra={
                            rigths
                        }
                    >
                        {/* 弹出popovr */}
                        <Input placeholder='请输入评论' clearable onClick={() => setVisible(true)} />
                    </Form.Item>
                </Form>
            </div>
            <Popup
                visible={visible}
                showCloseButton
                onClose={() => {
                    setVisible(false)
                }}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '50vh',
                }}
            >
                <Form layout='horizontal' form={commentInfo} style={{ border: "none" }} footer={
                    <div style={{ margin: "10px 0" }}>
                        <Button block type='submit' onClick={addNewsComment} color='primary' size='large'>
                            提交
                        </Button>
                    </div>
                }>
                    <Form.Item name='content'>
                        <TextArea placeholder='请输入评论' rows={5} style={{ height: 200, border: '2px solid #f8f5f5', borderRadius: 8, marginTop: 30 }} />
                    </Form.Item>
                </Form>
            </Popup>
            <div style={{ position: "fixed", right: 20, bottom: 80, fontSize: 30 }}>
                <div onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })}><UpCircleOutline /></div>
                <div onClick={() => commentRef.current.scrollIntoView({ behavior: "smooth" })}><MessageOutline /></div>
            </div>
        </>
    )
}

export default NewsDetail