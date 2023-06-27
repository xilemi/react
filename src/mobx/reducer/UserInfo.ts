import { observable, action, makeObservable, computed, runInAction } from "mobx"
import { makePersistable } from "mobx-persist-store";

class UserInfo {
    constructor() {
        makeObservable(this)
        // makePersistable(this, { name: 'UserInfo', properties: ["token","info"] });
    }
    @observable token = ""
    @observable info={}
    @action updataToken = (payload:string) => {
        this.token= payload
    }
    @action updataInfo = (payload:string) => {
        this.info= payload
    }
}

// persist("UserInfo",new UserInfo())

export default new UserInfo()