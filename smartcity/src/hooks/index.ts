import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserInfoApi } from "../api/prodApi/userInfo"
import { updataInfo } from "../rtk/reducers/userSlice"
import { useLocalStorageState } from "ahooks"
export const useCommonFunc = () => {
    const router = useNavigate()
    const gotopage = (url: any) => {
        return router(url)
    }
    const dispatch = useDispatch()
    const refresh = async () => {
        let res = await getUserInfoApi()
        if (res.code = 200) {
            dispatch(updataInfo(res.user))
            return res.user
        }
    }


    return {
        gotopage, refresh
    }
}

export const useLocalData = () => {
    const [fromPath, setfromPath] = useLocalStorageState("fromPath")
    const [toPath, settoPath] = useLocalStorageState("toPath")
    const [token, setToken] = useLocalStorageState("token")

    return {
        setfromPath, settoPath, fromPath, toPath, token, setToken
    }
}