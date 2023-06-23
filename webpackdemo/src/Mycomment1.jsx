import React, { Component, createRef, useState, useEffect } from 'react'
import './styles/index.css'
import { v4 as uuidv4 } from 'uuid';
import { listApi, addApi, delApi, updataApi } from "./utils/api"
import { useRef } from 'react';
import { current } from '@reduxjs/toolkit';

const Mycomment1 = () => {
    const [list, setList] = useState([])
    const getList = async () => {
        let res = await listApi()
        res.data = res.data.map(item => {
            item.isEidt = true
            return item
        })
        setList([...res.data.reverse()])
    }
    const addList = async (e) => {
        let res = await addApi({ ...e, time: Date.now() })
        getList()
    }
    const delList = async (commentid) => {
        let res = await delApi({ commentid })
        getList()
    }
    const editList = (commentid) => {
        let index = list.findIndex(item => {
            return item.commentid == commentid
        })
        list[index].isEidt = false
        console.log(list);
        setList([...list])
    }
    const saveList = async (commentid, item) => {
        let index = list.findIndex(item => {
            return item.commentid == commentid
        })
        list[index].isEidt = true
        setList([...list])
        let res = await updataApi({ commentid, ...item })
        getList()
    }
    useEffect(() => {
        getList()
    }, []);
    return (
        <div style={{ border: "1px solid #f3f3f3", width: "80%", borderRadius: 10 }}>
            <h1>留言板</h1>
            <Mycontrol handler={e => addList(e)}></Mycontrol>
            <MyList list={list} handler1={delList} editList={editList} saveList={saveList}></MyList>
        </div>
    )
}

const Mycontrol = (props) => {
    const titleRef = createRef()
    const contentRef = createRef()
    const resetData = () => {
        titleRef.current.value = ""
        contentRef.current.value = ""
    }
    const addComment = (title, content) => {
        // 接收数据  传递到父元素 
        if (title && content) {
            props.handler({ title, content })
            resetData()
        }
        else {
            alert("请输入完整字段")
        }
    }
    return (
        <div>
            <input type="text" ref={titleRef} placeholder='标题' />
            <input type="text" ref={contentRef} placeholder='内容' />
            <div>
                <button onClick={() => addComment(titleRef.current.value, contentRef.current.value)}>添加</button>
                <button onClick={resetData}>重置</button>
            </div>
        </div>
    )
}


const MyList = (props) => {
    const del = (commentid) => {
        // 把下标传递给父组件  进行删除
        itemRef.current[commentid].classList.remove("movein")
        itemRef.current[commentid].classList.add("moveout")
        console.log(itemRef.current[commentid]);
        //立即删除导致动画没有时间执行
        setTimeout(() => {
            props.handler1(commentid)
        }, 1000)
    }
    const edit = (commentid) => {
        // 把isEdit 状态改为 false
        console.log(commentid);
        console.log(props);
        props.editList(commentid)
    }
    const save = (commentid) => {
        let title = titleRef.current[commentid].value
        let content = contentRef.current[commentid].value
        itemRef.current[commentid].classList.remove("movein")
        itemRef.current[commentid].classList.add("bounce")
        setTimeout(() => {
            props.saveList(commentid, { title, content })
            itemRef.current[commentid].classList.remove("bounce")
        }, 1000)

    }
    const { list } = props
    const itemRef = useRef([])
    const titleRef = useRef([])
    const contentRef = useRef([])
    return (
        <div>
            {
                list.map((item, index) => {
                    return (
                        <div key={item.commentid} className='movein' ref={el => itemRef.current[item.commentid] = el} style={{ width: "60%", background: "pink", marginTop: 20, borderRadius: 10, animationDelay: 1 * index + 'ms' }}>
                            <p><input type="text" defaultValue={item.title} ref={el => titleRef.current[item.commentid] = el} className='inp' disabled={item.isEidt} /></p>
                            <p style={{ marginBottom: 20 }}><input className='inp' ref={el => contentRef.current[item.commentid] = el} defaultValue={item.content} disabled={item.isEidt} /></p>
                            <div>
                                <button onClick={() => del(item.commentid)}>删除</button>
                                {item.isEidt ? <button onClick={() => edit(item.commentid)}>修改</button> : <button onClick={() => save(item.commentid)}>保存</button>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}






export default Mycomment1