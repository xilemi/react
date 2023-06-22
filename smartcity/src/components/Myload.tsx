import { SpinLoading } from 'antd-mobile'
import React from 'react'
const Myload = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "100%" }}>
            <SpinLoading color='primary' />
        </div>
    )
}

export default Myload