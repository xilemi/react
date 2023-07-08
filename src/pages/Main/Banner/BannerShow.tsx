import { listBannerApi } from '@/api/cart';
import { baseURL } from '@/utils/request';
import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
const contentStyle: React.CSSProperties = {
    height: '750px',
    color: '#fff',
    lineHeight: '750px',
    textAlign: 'center',
    background: '#364d79',
};


const BannerShow = () => {


    const [list, setList] = useState([])
    const listBanner = async () => {
        let res = await listBannerApi()
        if (res.code == 200) {
            setList(res.result)
        }
    }

    useEffect(() => {
        listBanner()
    }, [])
    return (
        <Carousel autoplay>


            {
                list.filter(res => res?.state == "true").map(item => {
                    return <div>
                        <h3 style={contentStyle}>

                            <img src={item.path.replace("public",baseURL)} style={{ width: "100%" }} />

                        </h3>
                    </div>
                })
            }

        </Carousel>
    )
}



export default BannerShow