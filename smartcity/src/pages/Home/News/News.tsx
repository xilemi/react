import React, { Fragment, useEffect, useRef } from 'react'
import MyHeader from '../../../components/MyHeader'
import { Avatar, Card, Ellipsis, List, Tabs } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList, getNewsList, updataType } from '../../../rtk/reducers/newsSlice'
import { baseURL } from '../../../utils/request'
import { useCommonFunc } from '../../../hooks'
import { NavLink } from 'react-router-dom'
function News() {

    const { categoryList, newsList, categoryType } = useSelector(state => state.newsInfo)


    const dispatch: any = useDispatch()
    const { gotopage } = useCommonFunc()
    const onChange = (id) => {
        console.log(id);

        dispatch(updataType(id))
        dispatch(getNewsList({ type: id }))
        console.log(newsList);
    }
    const getNewsDetail = (id) => {
        gotopage("/index/newsdetail/" + id)
    }
    useEffect(() => {
        dispatch(getCategoryList(() =>
            onChange(categoryType == 0 ? categoryList[0]?.id : categoryType)
        ))
    }, [])
    const itemRef = useRef([])
    return (
        <>
            <MyHeader title='新闻'></MyHeader>
            <div className='center' style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
                {/* 上面为分类横向列表 */}
                <Tabs defaultActiveKey={categoryType == 0 ? categoryList[0]?.id : categoryType} onChange={onChange}>

                    {
                        categoryList.map(item => {
                            return <Tabs.Tab title={item.name} key={item.id}>

                            </Tabs.Tab>
                        })
                    }
                </Tabs>
                <div style={{ flex: 1, overflow: "auto" }}>

                    {
                        newsList.map(item => {
                            return <List mode='card'>
                                <List.Item key={item.title} onClick={() => getNewsDetail(item.id)} prefix={<Avatar src={baseURL + item.cover} style={{ '--size': '72px' }} />} description={<div dangerouslySetInnerHTML={{ __html: item.content }} className='ellipsis' />}>
                                    {item.title}
                                </List.Item>
                            </List>
                        })
                    }

                </div>
            </div>
        </>
    )
}
export default News