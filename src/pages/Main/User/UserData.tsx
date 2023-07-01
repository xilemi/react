import { getUserInfoApi, getUserListApi } from '@/api/pro';
import MyEcharts from '@/components/MyEcharts'
import UserInfo from '@/mobx/reducer/UserInfo';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'

const UserData = () => {
    const [userList, setUserList] = useState([])
    const { roles ,updataRoles} = UserInfo
    const getUserList = async () => {
        let res = await getUserListApi()
        if (res.code == 200) {
            setUserList(res.result)
        }
    }
    // 生成data  通过role查出label 统计label的个数 
    const data=[]
    roles.forEach(item=>{
        data.push({name:item.label,value:userList.filter(res=>{
            return res.role==item.value
        })?.length})
    })




    // console.log(userList); //label  
    // const obj={}
    // userList.forEach(item=>{
    //     // obj中有
    //     if(obj[item.label]){
    //        obj[item.label]++
    //     }else{
    //         obj[item.label]=1
    //     }
    // })
    // console.log(obj,111);
    
    // Object.keys(obj).forEach(item=>{
    //     data.push({name:item,value:obj[item]})
    // })
    const option = {
        title: {
            text: '用户分析表',
            subtext: '角色分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '角色类型',
                type: 'pie',
                radius: '50%',
                data:data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    useEffect(() => {
        getUserList()
        updataRoles()
    }, [])
    return (
        <div>

            <MyEcharts option={option} />
        </div>
    )
}

export default inject("UserInfo")(observer(UserData))