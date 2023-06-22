import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { bannersType } from '../../types'
import { getBannersApi } from '../../api/prodApi/guideApi'
import _ from "lodash"
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { Image } from 'antd-mobile'
import { baseURL } from '../../utils/request'
import { useCookieState } from 'ahooks';
import { useCommonFunc } from '../../hooks'
const Guide = memo(() => {
    const [bannerList, setBannerList] = useState([])
    const getBannerList = async () => {
        let res = await getBannersApi({ type: "2" })
        if (res.code == 200) {
            setBannerList(res.rows)
            console.log(res.rows);

        }
    }
    // 进入此页面 记录  七天内进入过 直接跳转到首页 cookie 过期
    const [value, setValue] = useCookieState('useCookieStateOptions', {
        path: '/',
        expires: (() => new Date(+new Date() + 3600 * 24 * 7 * 1000))(),
    });
    const { gotopage } = useCommonFunc()
    useLayoutEffect(() => {
        if (value) {
            // 有cookie 跳转
            gotopage("/index")
        } else {
            // 没有就存
            setValue("来过", {
                expires: (() => new Date(+new Date() + 3600 * 24 * 7 * 1000))(),
            })
        }
    }, [])
    useEffect(() => {
        getBannerList()
        setValue("来过", {
            expires: (() => new Date(+new Date() + 3600 * 24 * 7 * 1000))(),
        })
    }, [])
    return (
        <div>
            <Swiper autoplay>
                {
                    _.map(bannerList, (item) => {
                        return (
                            <Swiper.Item key={item.id}>
                                <Image src={baseURL + item.advImg} key={item.id} style={{ height: "100%" }} />
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
        </div>
    )
})


export default Guide