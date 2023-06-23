import React, { FC, useEffect } from 'react'
import MyHeader from '../../components/MyHeader'
import { CloseOutline, MoreOutline } from 'antd-mobile-icons'
import { Space } from "antd-mobile"
import { useLocation } from 'react-router-dom'
const Search: FC = () => {



    return (
        <>
            <MyHeader title="搜索" backArrow={<CloseOutline />}></MyHeader>
            <div className='center'>
            </div>

        </>
    )
}

export default Search