import React, { FC, useRef } from 'react'
import { resetUserInfoApi, uploadFileApi } from '../api/prodApi/userInfo'
import { useCommonFunc } from '../hooks'
// 使用ant design的图片组件  内部input 上传文件  
const MyUpload: FC<{ children: any }> = ({ children }) => {
    // 获取当前文件信息
    const fileRef = useRef<any>()
    const uploadFile = (val) => {
        fileRef.current.click()
    }
    const { refresh } = useCommonFunc()
    const onChange = async () => {
        // 可能多个文件 取第一个 
        console.log(fileRef.current.files[0]);
        const file = fileRef.current?.files[0]
        // 使用 formData 数据 new 
        const params = new FormData()
        params.append("file", file)
        let res = await uploadFileApi(params)
        console.log(res.path);
        // 再调修改信息的接口 
        let data = await resetUserInfoApi({
            avatar: res.path.replace("public", "")
        })
        if (data.code = 200) {
            refresh()
        }
    }
    return (
        <div onClick={uploadFile}>
            <input type="file" style={{ display: "none" }} ref={fileRef} onChange={onChange} />
            {children}
        </div>
    )
}

export default MyUpload