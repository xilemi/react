import React, { Component } from 'react'
// react插槽和 父子组件产地非常的相似 也是通过props获取 
export default class Slot extends Component {
    render() {
        // 所有具名和默认有区别吗  具名写在标签上   匿名的正常标签一样使用 
        const { leftSlot, centerSlot, rightSlot, children } = this.props
        return (
            <div>
                <h1>{leftSlot}</h1>
                <h2>{centerSlot}</h2>
                <h3>{rightSlot}</h3>
                {children}
            </div>
        )
    }
}
// 总结 匿名插槽 通过 children 站位   在props  中解构出children  
// 具名插槽 就和父子通信 数据传递的使用方式一致 写在标签作为属性  在props 内解构出来  站位 