import React, { Component, createRef } from 'react'
import './styles/index.css'
import { v4 as uuidv4 } from 'uuid';
import { listApi, addApi, delApi, updataApi } from "../src/utils/api"
export default class Mycomment extends Component {
    state = {
        list: [

        ]
    }
    getList = async () => {
        let res = await listApi()
        res.data = res.data.map(item => {
            item.isEidt = true
            return item
        })
        this.setState({
            list: res.data
        })
    }
    addList = async (e) => {
        let res = await addApi({ ...e, time: Date.now() })
        this.getList()
    }
    delList = async (commentid) => {
        let res = await delApi({ commentid })
        this.getList()
    }
    editList = (commentid) => {
        let index = this.state.list.findIndex(item => {
            return item.commentid == commentid
        })
        this.state.list[index].isEidt = false
        this.setState({
            list: this.state.list
        })

    }
    saveList = async (commentid, item) => {
        let index = this.state.list.findIndex(item => {
            return item.commentid == commentid
        })
        this.state.list[index].isEidt = true
        this.setState({
            list: this.state.list
        })
        let res = await updataApi({ commentid, ...item })
        this.getList()
    }
    componentDidMount() {
        this.getList()
    }
    render() {
        return (
            <div style={{ border: "1px solid #f3f3f3", width: "80%", borderRadius: 10 }}>
                <h1>留言板</h1>
                <Mycontrol handler={e => this.addList(e)}></Mycontrol>
                <MyList list={this.state.list} handler1={this.delList} editList={this.editList} saveList={this.saveList}></MyList>
            </div>
        )
    }
}

class Mycontrol extends Component {
    titleRef = createRef()
    contentRef = createRef()
    resetData = () => {
        this.titleRef.current.value = ""
        this.contentRef.current.value = ""
    }
    addComment = (title, content) => {
        // 接收数据  传递到父元素 
        if (title && content) {
            this.props.handler({ title, content })
            this.resetData()
        }
        else {
            alert("请输入完整字段")
        }
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.titleRef} placeholder='标题' />
                <input type="text" ref={this.contentRef} placeholder='内容' />
                <div>
                    <button onClick={() => this.addComment(this.titleRef.current.value, this.contentRef.current.value)}>添加</button>
                    <button onClick={this.resetData}>重置</button>
                </div>
            </div>
        )
    }
}


class MyList extends Component {
    del = (commentid) => {
        // 把下标传递给父组件  进行删除
        this[commentid].classList.remove("movein")
        this[commentid].classList.add("moveout")
        console.log(this[commentid]);
        //立即删除导致动画没有时间执行
        setTimeout(() => {
            this.props.handler1(commentid)
        }, 1000)
    }
    edit = (commentid) => {
        // 把isEdit 状态改为 false
        this.props.editList(commentid)
    }
    save = (commentid) => {
        // this[item.id].classList.remove("movein")
        // this[item.id].classList.add("bounce")
        let title = this["title" + commentid].value
        let content = this["content" + commentid].value
        this.props.saveList(commentid, { title, content })
    }
    saveTitle = createRef()
    saveContent = createRef()
    render() {
        const { list } = this.props
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={item.commentid} className='movein' ref={el => this[item.commentid] = el} style={{ width: "60%", background: "pink", marginTop: 20, borderRadius: 10 }}>

                                <p><input type="text" defaultValue={item.title} ref={el => this["title" + item.commentid] = el} className='inp' disabled={item.isEidt} /></p>
                                <p style={{ marginBottom: 20 }}><input className='inp' ref={el => this["content" + item.commentid] = el} defaultValue={item.content} disabled={item.isEidt} /></p>
                                <div>
                                    <button onClick={() => this.del(item.commentid)}>删除</button>
                                    {item.isEidt ? <button onClick={() => this.edit(item.commentid)}>修改</button> : <button onClick={() => this.save(item.commentid)}>保存</button>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}