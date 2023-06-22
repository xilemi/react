import { Avatar } from "antd-mobile"
import React from "react"
import { baseURL } from "../utils/request"
import { useCommonFunc } from "../hooks"

const FindItem = ({ searchList }) => {
    const { gotopage } = useCommonFunc()
    return <>
        {
            searchList.map(res => {
                return <div key={res.id} onClick={() => gotopage("/index/" + res.link)} style={{ width: "33%", margin: "20px auto", textAlign: "center", }}>
                    <Avatar src={baseURL + res.imgUrl} style={{ "--size": "64px", margin: '20px auto' }} />
                    <span>{res.serviceName}</span>
                </div>
            })
        }
    </>
}

export default FindItem