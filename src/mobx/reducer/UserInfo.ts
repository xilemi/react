import { getRoleListApi, getUserInfoApi, listTypeAnnoApi } from "@/api/pro";
import { observable, action, makeObservable, computed, runInAction } from "mobx"
import { makePersistable } from "mobx-persist-store";

class UserInfo {
    constructor() {
        makeObservable(this)
        // makePersistable(this, { name: 'UserInfo', properties: ["token","info"] });
    }
    @observable info = null
    @observable roles = null
    @observable typeAnno=null
    @action updataInfo = async () => {
        let res = await getUserInfoApi()
        if (res.code == 200) {
            this.info = res.result
        }
    }
    @action updataTypeAnno=async ()=>{
        let res =await listTypeAnnoApi()
        if(res.code==200){
            this.typeAnno=res.result
        }
    }
    // 加上disabled 属性? 传入当前用户信息 
    @action updataRoles = async () => {
        let res = await getRoleListApi()
        if (res.code == 200) {
            res.result.forEach(item => {
                if (this.info?.role > item.value) {
                    item.disabled = false
                } else {
                    item.disabled = true
                }
            })
            this.roles = res.result
        }

    }
    @action updataInfoSync = (payload: any) => {
        this.info = payload
    }
}



export default new UserInfo()