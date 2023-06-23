import { Toast } from 'antd-mobile'



export const successToast = (msg: string = "成功") => {
    Toast.show({
        icon: 'success',
        content: msg,
        duration: 1000
    })
}
export const failToast = (msg: string = "失败") => {
    Toast.show({
        icon: 'fail',
        content: msg,
        duration: 1000
    })
}
export const loadToast = () => {
    Toast.show({
        icon: 'loading',
        content: "加载中",
        duration: 1000
    })
}
export const liteToast = (msg: string = "提示") => {
    Toast.show({
        content: msg,
        duration: 1000
    })
}