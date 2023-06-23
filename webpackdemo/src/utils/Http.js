// 封装 ajax 请求
import qs from "qs"

const Http = {
    post(url, option = {}) {
        return new Promise((reslove, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            // 这里的token 也由用户发送过来  在option里 
            xhr.setRequestHeader('token', option.token)
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            xhr.send(qs.stringify(option.params))
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        reslove(JSON.parse(xhr.responseText))
                    }
                    else {
                        reject(new Error("请求错误"))
                    }
                }
            }
        })
    },
    get(url, option = {}) {
        return new Promise((reslove, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open("GET", url + "?" + qs.stringify(option?.params), true)
            // 这里的token 也由用户发送过来  在option里 
            xhr.setRequestHeader('token', option.token)
            xhr.send()
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        reslove(JSON.parse(xhr.responseText))
                    }
                    else {
                        reject(new Error("请求错误"))
                    }
                }
            }
        })
    }
}

export default Http