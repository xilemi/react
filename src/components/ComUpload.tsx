import React, { useRef } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uplodafileApi } from '@/api/pro'
import { baseURL } from '@/utils/request'

type comuploadProps = {
    value?: {
        key: string;
        label: string;
    }[]
    onChange?: () => void
}

const ComUpload: React.FC<comuploadProps> = (props: comuploadProps) => {
    const path = props.value
    const { onChange } = props
    const fileRef = useRef()
    //   const action = `${URL_PREFIX}/file/upload`
    // const action = async () => {
    //     const file = fileRef.current.files[0]
    //     const data = new FormData()
    //     data.append("file", file)
    //     let res = await uplodafileApi(data)
    // }


    //   const action = `1`
    const changeFile = async () => {
        const file = fileRef.current.files[0]
        const data = new FormData()
        data.append("file", file)
        console.log(data);
        let res = await uplodafileApi(data)
        if (res.code == 200) {
            onChange(res.path.replace("public", baseURL))
        }
    }

    return (
        <div>
            <input
                type='file'
                onChange={changeFile}
                defaultFileList={path}
                style={{ display: "none" }}
                ref={fileRef}
            >
            </input>
            <Button icon={<UploadOutlined />} type="text" onClick={() => fileRef.current.click()} />
        </div>
    )
}

export default ComUpload