import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MyHeader from '../../../components/MyHeader'
import { CapsuleTabs, Empty, IndexBar, List, SearchBar } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getCityListApi } from '../../../api/find'
import { updataCityList, updataLocalCity } from '../../../rtk/reducers/findSlice'
import { useCommonFunc } from '../../../hooks'

const City = () => {

    const dispatch = useDispatch()
    // 获取城市数据
    const { cityList, localCity } = useSelector(state => state.findInfo)
    const { gotopage } = useCommonFunc()
    const [toggle, setToggle] = useState(true)
    const [searchList, setSearchList] = useState([])
    const searchRef = useRef()
    const getCityList = async () => {
        let res = await getCityListApi()
        dispatch(updataCityList(res.data.cities))
    }


    const getRandomList = (min: number, max: number): string[] => {
        return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
    }

    const charCodeOfA = 'A'.charCodeAt(0)
    const groups = Array(26)
        .fill('')
        .map((_, i) => ({
            title: String.fromCharCode(charCodeOfA + i),
            items: cityList.filter(item => {
                return item.pinyin.startsWith(String.fromCharCode(charCodeOfA + i).toLowerCase())
            }).map(res => {
                return res.name
            })
        }))


    const selectCity = (item) => {
        gotopage(-1)
        dispatch(updataLocalCity(item))
    }
    const searchHandler = (val) => {
        // 通过城市或者拼音
        if (val.length > 0) {
            setSearchList(cityList.filter(item => {
                return item.name.match(val) || item.pinyin.match(val)
            }))
        } else {
            setSearchList([])
        }
    }
    const onCancel = () => {
        setToggle(true)
        // 显示列表 清空搜索的列表
        searchRef.current?.clear()
        setSearchList([])
    }

    useEffect(() => {
        getCityList()
    }, [])
    return (
        <>
            <MyHeader title={localCity ? "当前城市-" + localCity : "请选择城市"}></MyHeader>
            <div className="center" style={{ backgroundColor: "#fff" }}>
                <SearchBar placeholder='请输入城市名或者字母' showCancelButton={() => true} onFocus={() => setToggle(false)} onCancel={() => onCancel()} ref={searchRef} onChange={searchHandler} style={{ height: 50, padding: "0 10px" }} />
                {
                    toggle ? <div style={{ height: 'calc(100% - 72px)' }}>
                        <div>
                            <div style={{ margin: '20px 10px' }}>热门城市</div>
                            <CapsuleTabs onChange={selectCity}>
                                {
                                    cityList.filter(item => {
                                        return item.isHot == 1
                                    }).map(res => {
                                        return <CapsuleTabs.Tab title={res.name} key={res.name}></CapsuleTabs.Tab>
                                    })
                                }
                            </CapsuleTabs>
                        </div>
                        <IndexBar style={{ height: 'calc(100% - 102px)' }}>
                            {groups.map(group => {
                                const { title, items } = group
                                return (
                                    <IndexBar.Panel
                                        index={title}
                                        title={`${title}`}
                                        key={`标题${title}`}
                                    >
                                        <List>
                                            {items.map((item, index) => (
                                                <List.Item onClick={() => selectCity(item)
                                                } key={index}>{item}</List.Item>
                                            ))}
                                        </List>
                                    </IndexBar.Panel>
                                )
                            })}
                        </IndexBar>
                    </div> : <>
                        {
                            searchList.length ?
                                <List>
                                    {searchList.map((item, index) => (
                                        <List.Item onClick={() => selectCity(item.name)} key={index}>{item.name}</List.Item>
                                    ))}
                                </List> : <Empty description="暂无数据" />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default City