import { useLocalStorageState } from "ahooks"
import { useNavigate } from "umi"


export const useLocalData = () => {
    const [token,setToken]=useLocalStorageState("token")
    const [account,setAccount]=useLocalStorageState("account")
    return {
        token,setToken,account,setAccount
    }
}


export const useCommonFc=()=>{
    const Navigate=useNavigate()
    const gotopage=(url)=>{
        return Navigate(url)
    }
    return {
        gotopage
    }
}