import { Alert, Badge, BadgeProps, Calendar, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';

import dayjs from 'dayjs';
import isToday from "dayjs/plugin/isToday"
import { failMessage, successMessage } from '@/utils/message';
import { addAttendanceApi, listAttendanceApi } from '@/api/cart';
import { useLocalStorageState } from 'ahooks';
dayjs.extend(isToday)
const ClockIn = () => {
    const [value, setValue] = useState(() => dayjs());
    const [startTime, setStartTime] = useLocalStorageState("startTime");
    const [endTime, setEndTime] = useLocalStorageState("endTime");
    const [list, setList] = useState([])
    const [flag, setFlag] = useState(dayjs(endTime).isToday())
    const clockInTime = {
        startTime: 9,
        endTime: 18,
    }



    //第二天怎么办
    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        if (dayjs(newValue).isToday()) {
            console.log(dayjs(newValue).hour());
            if (dayjs(newValue).hour() < clockInTime.startTime && dayjs(newValue).hour() >= 7) {
                setStartTime(dayjs(newValue).format("YYYY-MM-DD HH:mm:ss"));
            }
            else {
                if (!flag) {
                    console.log(dayjs(newValue).hour());
                    if (dayjs(newValue).hour() >= clockInTime.endTime && dayjs(newValue).hour() < 23) {
                        setEndTime(dayjs(newValue).format("YYYY-MM-DD HH:mm:ss"))
                        add()
                        setFlag(true)
                    } else {
                        add()
                        failMessage("请在规定的时间内打卡")
                        setFlag(true)
                    }

                } else {
                    failMessage("今天已打卡")
                }
            }
        } else {
            failMessage("请选择当天打卡")
        }
    };
    const add = async (newValue) => {
        const time = startTime && endTime ? Math.floor(dayjs(endTime).diff(dayjs(startTime), "hour", true) * 100) / 100 : null
        const state = startTime && endTime ? "true" : "false"
        const fullTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
        const endTime = dayjs(newValue).format("YYYY-MM-DD HH:mm:ss")
        const data = {
            startTime, endTime, time, state, fullTime
        }
        let res = await addAttendanceApi(data)
        if (res.code == 200) {
            successMessage("当日打卡完成")
            // 请求考勤数据list
            getList()
            // setFlag(true)
        }
    }
    const getList = async () => {
        let res = await listAttendanceApi({})
        if (res.code == 200) {
            setList(res.result.filter(item => {
                return dayjs(item.fullTime).month() == dayjs().month() && dayjs(item.fullTime).year() == dayjs().year()
            }))
        }


    }

    const checkState = () => {
        if (startTime && endTime) {
            return "出勤"
        }
        else {
            if (list.find(item => dayjs(item.fullTime).isToday())) {
                return "缺勤"
            } else {
                return "未完成"
            }
        }
    }
    // 第二天进来如何
    useEffect(() => {
        if (!startTime) {
            setStartTime(null)
        }
        if (!endTime) {
            setEndTime(null)
        }
        // 都有值 true  true  当天正确
        // 一个null 一个有值  false true 
        // 第二天 都有  false false来正确
        //       一个有 一个无 false false 进来正确
        if (!dayjs(startTime).isToday() && !dayjs(endTime).isToday()) {
            setEndTime(null)
            setStartTime(null)
        }
        console.log(dayjs(endTime).isToday(), 1112121);

        console.log(dayjs(startTime).isToday(), 1111112898);

        getList()
    }, [])

    const dateCellRender = (value: Dayjs) => {
        if (value.month() == dayjs().month()) {
            // 当前值 本身就是遍历
            // [{fullTime:2023.07.06,state:"true"}]
            // 下标并不匹配  
            const val = list.find(item => {
                return dayjs(item.fullTime).date() == value.date()
            })
            if (val) {
                return (
                    <div style={{ marginLeft: 100 }}>{val?.state == 'true' ? "出勤" : "缺勤"}</div>
                )
            } else {
                return ""
            }

        }
    }
    const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };
    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };
    // 显示规则 
    return (
        <>
            <Alert message={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>上午:{startTime ? dayjs(startTime).format("HH:mm:ss") : "未打卡"}</span>
                    <span>下午:{endTime ? dayjs(endTime).format("HH:mm:ss") : "未打卡"}</span>
                    <span>上班时间:{endTime && startTime ? Math.floor(dayjs(endTime).diff(dayjs(startTime), "hour", true) * 100) / 100 : ""}小时</span>
                    <span>考勤状态:{checkState()}</span>
                </div>
            } />
            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} cellRender={cellRender} />
        </>
    )
}

export default ClockIn