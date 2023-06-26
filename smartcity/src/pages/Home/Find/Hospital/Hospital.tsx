import React, { useEffect, useState } from 'react'
import MyHeader from "../../../../components/MyHeader"
import { Image, List, Rate, Swiper } from 'antd-mobile'
import { getHospitalBannerListApi, getHospitalListApi } from '../../../../api/hospital'
import { useCommonFunc } from '../../../../hooks'
import  qs from "qs"
import { useDispatch } from 'react-redux'
import { updataIdInfo } from '../../../../rtk/reducers/hospitalSlice'
const Hospital = () => {
    const [bannerList, setBannerList] = useState([])
    const [hospitalList, setHospitalList] = useState([])
    const {gotopage}=useCommonFunc()
    const dispatch=useDispatch()
    const getHospitalBannerList = async () => {
        let res = await getHospitalBannerListApi()
        console.log(res);
        if (res.code == 200) {
            setBannerList(res.data)
        }
    }
    const getHospitalList = async () => {
        let res = await getHospitalListApi()
        if (res.code == 200) {
            setHospitalList(res.rows)
        }
    }
    const onSelect=(item)=>{
        gotopage("/index/outpatient/hospitaldetail"+"?"+qs.stringify({id:item.id}))
        dispatch(updataIdInfo(item.id))
    }
    useEffect(() => {
        getHospitalBannerList()
        getHospitalList()
    }, [])
    return (
        <>
            <MyHeader title='门诊预约'></MyHeader>
            <div className="center">
                <Swiper
                    loop
                    autoplay
                    onIndexChange={i => {
                        console.log(i, 'onIndexChange1')
                    }}
                >
                    {
                        bannerList.map(item => {
                            return <Swiper.Item key={item.id}>
                                <img src={item.imgUrl} />
                            </Swiper.Item>
                        })
                    }
                </Swiper>
                <div style={{ height: 50, fontSize: 20, padding: 10 }}>医院列表</div>
                <div>
                    <List >
                        {hospitalList.map(item => (
                            <List.Item
                                key={item.id}
                                onClick={()=>onSelect(item)}
                                prefix={
                                    <Image
                                        src={item.imgUrl}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40}
                                    />
                                }
                                description={<><div>{item.brief}</div><div> <Rate readOnly value={item.level} /></div></>}
                            >
                                {item.hospitalName}
                            </List.Item>
                        ))}
                    </List>
                </div>
            </div>
        </>
    )
}

export default Hospital