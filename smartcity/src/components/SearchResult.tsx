import React from 'react'
import { baseURL } from '../utils/request'
import { Avatar, Empty } from 'antd-mobile'
import FindItem from './FindItem'


const SearchResult = ({ searchList }) => {
    return (
        <>
            {
                searchList.length > 0 ? <FindItem searchList={searchList}></FindItem> : <Empty description={"暂无数据"} />
            }

        </>
    )
}

export default SearchResult