import { useLocalStorageState } from "ahooks"


export const useLocalData = () => {
    const [token,setToken]=useLocalStorageState("token")
    const [account.setAccount]=useLocalStorageState("account")
    const [password,setPassword]=useLocalStorageState("password")
    return {
        token,setToken,account,setAccount,password,setPassword
    }
}