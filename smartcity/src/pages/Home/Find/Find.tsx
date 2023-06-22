import React, { useEffect, useRef, useState } from 'react'
import { getListApi } from '../../../api/prodApi/prodApi'
import MyHeader from '../../../components/MyHeader'
import { useCommonFunc } from '../../../hooks'
import { SearchBar, SideBar } from 'antd-mobile'
import { DownOutline, EnvironmentOutline } from 'antd-mobile-icons'
import { getServiceListApi } from '../../../api/service'
import SearchResult from '../../../components/SearchResult'
import FindItem from '../../../components/FindItem'
import { useDispatch, useSelector } from 'react-redux'
import { updataServiceList } from '../../../rtk/reducers/findSlice'
function Find() {
    type resulttype = {
        code: string,
        data: object[],
        message: string
    }
    const { serviceList, localCity } = useSelector(state => state.findInfo)
    const { gotopage } = useCommonFunc()
    // const [serviceList, setServiceList] = useState([])
    const [serviceType, setServiceType] = useState([])
    const [searchList, setSearchList] = useState([])
    const [toggle, setToggle] = useState(true)
    const dispatch = useDispatch()
    const getServiceList = async () => {
        let res = await getServiceListApi()
        if (res.code == 200) {
            // 做个存储,不用每次进来都请求,一天更新一次
            // setServiceList(res.rows)
            // 去重 

            dispatch(updataServiceList(res.rows))
            serviceList.forEach(item => {
                if (item.serviceType != null) {
                    serviceType.push(item.serviceType)
                }
            })
            setServiceType([...new Set(serviceType)])
            console.log(serviceType);
        }
    }
    const rightRef = useRef([])
    const searchRef = useRef()
    const changeBar = (val) => {
        if (val == "全部服务") {
            rightRef.current["便民服务"].scrollIntoView({ behavior: "smooth" })
            return
        }
        rightRef.current[val].scrollIntoView({ behavior: "smooth" })
    }
    const searchHandler = (val) => {
        let list = serviceList.filter(item => {
            return item.serviceName?.match(val)
        })
        console.log(list);

        setSearchList(list)
    }
    const onCancel = () => {
        setToggle(true)
        searchRef.current?.clear()
        setSearchList([])
    }
    // 首次进来会不存在那么久需要判断是否更新
    useEffect(() => {
        setServiceType([...new Set(serviceType)])
        console.log(serviceType);
        getServiceList()
    }, [])
    return (
        <>
            <MyHeader title='发现' backArrow={<span style={{ fontSize: 16 }}>{localCity ? <><EnvironmentOutline />{localCity}</> : <>选择城市<DownOutline /> </>}</span>} onback={() => gotopage("/index/city")}></MyHeader>
            <div className='center' style={{ backgroundColor: "#fff" }}>
                <SearchBar ref={searchRef} placeholder='请输入内容' showCancelButton={() => true} onFocus={() => setToggle(false)} onCancel={() => onCancel()} onSearch={searchHandler} style={{ height: 50, padding: "0 10px" }} />
                {
                    toggle ? <div style={{ display: 'flex', justifyContent: "space-between", height: 'calc(100% - 50px)' }}>
                        <SideBar defaultActiveKey={"全部服务"} style={{ width: 90, height: "100%", fontSize: 16 }} onChange={changeBar}>
                            <SideBar.Item key={"全部服务"} title={"全部服务"} />
                            {serviceType.map((item) => (
                                <SideBar.Item key={item} title={item} />
                            ))}
                        </SideBar>
                        <div style={{ flex: 1, overflow: "auto", height: "100%" }}>
                            {
                                serviceType.map((type, index) => {
                                    return (<div key={type}>
                                        <div ref={(el) => rightRef.current[type] = el} style={{ height: 40, fontSize: 20, marginLeft: 20 }}>{type}</div>
                                        <div style={{ display: "flex", flexWrap: 'wrap' }}>
                                            <FindItem searchList={serviceList.filter(item => item.serviceType == type)} />
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div> : <SearchResult searchList={searchList}></SearchResult>
                }
            </div >
        </>
    )
}


// 需求  点击搜索 下面隐藏   展示 暂无数据   回车搜索后   展示数据   点击取消 暂时列表 


export default Find