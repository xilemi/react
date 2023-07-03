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
    const [endTime, setEndTime] = useState(null);
    const [list, setList] = useState([])
    const clockInTime = {
        startTime: 9,
        endTime: 18,
    }
    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        if (dayjs(newValue).isToday()) {
            console.log(dayjs(newValue).hour());
            if (dayjs(newValue).hour() < clockInTime.startTime && dayjs(newValue).hour() > 7) {
                setStartTime(dayjs(newValue).format("HH:mm:ss"));
            }
            else {
                if (dayjs(newValue).hour() > clockInTime.endTime) {
                    setEndTime(dayjs(newValue).format("HH:mm:ss"))
                    add()
                } else {
                    failMessage("请在规定的时间内打卡")
                }
            }
        } else {
            failMessage("请选择当天打卡")
        }
    };
    const add = async () => {
        const time = startTime && endTime ? Math.floor(endTime.diff(startTime, "hour", true) * 100) / 100 : null
        const state = startTime && endTime ? "true" : "false"
        const fullTime = dayjs().format("YYYY-MM-DD")
        const data = {
            startTime, endTime, time, state, fullTime
        }
        let res = await addAttendanceApi(data)
        if (res.code == 200) {
            successMessage("当日打卡完成")
            // 请求考勤数据list
            getList()
        }
    }
    const getList = async () => {
        let res = await listAttendanceApi({})
        if (res.code == 200) {
            setList(res.result)
        }
    }
    useEffect(() => {
        setStartTime(null)
        getList()
    }, [])

    const dateCellRender = (value: Dayjs) => {
        // 当前值 本身就是遍历

        const listData = list.filter(item => {
            return item.fullTime.month() == value.month() && item.fullTime.year() == value.year()
        })
        // [{fullTime:2023.07.06,state:"true"}]
        return (
            <div style={{ marginLeft: 100 }}>{listData[value.date()-1]?.state=='true'?"出勤":"缺勤"}</div>
        )
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
                    <span>上午:{startTime ? startTime : "未打卡"}</span>
                    <span>下午:{endTime ? endTime : "未打卡"}</span>
                    <span>上班时间:{endTime && startTime ? Math.floor(endTime.diff(startTime, "hour", true) * 100) / 100 : ""}</span>
                    <span>考勤状态:{endTime && startTime ? "出勤" : "缺卡"}</span>
                </div>
            } />
            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} cellRender={cellRender} />
        </>
    )
}

export default ClockIn