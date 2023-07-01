import { Modal, message } from "antd"
export const successMessage = (msg: string = "成功") => {
    message.destroy()
    message.success({
        content: msg,
        duration: 1.5
    })
}
export const failMessage = (msg: string = "失败") => {
    message.destroy()
    message.error({
        content: msg,
        duration: 1.5
    })
}
export const loadMessage = () => {
    message.destroy()
    message.loading({
        content: "加载中",
        duration: 1.5
    })
}
export const liteToast = (msg: string = "提示") => {
    message.destroy()
    message.info({
        content: msg,
        duration: 1.5
    })
}


export const confirmMessage=(content="是否操作",confirm)=>{
    Modal.confirm({
        title: "友情提示",
        content: content,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          confirm()
        }
      })
}