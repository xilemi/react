import React, { useEffect, useState } from 'react'
import MyHeader from '../../../../components/MyHeader'
import { useCommonFunc, useLocalData } from '../../../../hooks'
import { addPatientCardApi, getPatientCardListApi } from '../../../../api/hospital'
import { Button, Card, Empty, Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { updataPatientInfo } from '../../../../rtk/reducers/hospitalSlice'
import qs  from "qs"
const HospitalCard = () => {
    const { userName } = useLocalData()
    const [cardList, setCardList] = useState([])
    const { gotopage } = useCommonFunc()
    const getPatientCardList = async () => {
        let res = await getPatientCardListApi({ userName })
        if (res.code == 200) {
            console.log(res.rows);
            setCardList(res.rows)
        }
    }
    const dispatch = useDispatch()
    // 选择就诊人,点击谁就存就诊人信息到rtk  
    const onChange = (item) => {
        dispatch(updataPatientInfo(item))
        gotopage("/index/outpatient/addreservation")
    }
    useEffect(() => {
        getPatientCardList()
    }, [])
    return (
        <>
            <MyHeader title='选择就诊人'></MyHeader>
            <div className="center" style={{ padding: '0 10px' }}>
                <div style={{ marginBottom: 10 }}>
                    <Button block color='primary' onClick={() => gotopage("/index/outpatient/addhospcard")}>添加就诊卡</Button>
                </div>
                {
                    cardList.length > 0 ? <>
                        {
                            cardList.map(item => {
                                return <Card title={item.name} key={item.id} style={{ marginBottom: 10 }} onClick={() => onChange(item)}>
                                    <div>{item.tel}</div>
                                    <div>{item.cardId}</div>
                                    <div style={{display:'flex',justifyContent:'flex-end'}} onClick={e => e.stopPropagation()}>
                                        <Button
                                            color='primary'
                                            onClick={()=>gotopage("/index/outpatient/updatahospcard?"+qs.stringify(item))}
                                        >
                                            修改
                                        </Button>
                                    </div>
                                </Card>
                            })
                        }
                    </> : <Empty description={<><div style={{ textAlign: 'center' }}>暂无数据</div></>} />
                }

            </div>
        </>
    )
}

export default HospitalCard