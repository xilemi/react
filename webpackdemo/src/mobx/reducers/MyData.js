import { fromJS } from "immutable"
import { observable, action, makeObservable, computed, runInAction } from "mobx"
import Http from "../../utils/Http"
class MyData {
    // 方法统一使用箭头函数,不然会有this指向问题 
    @observable count = 1000
    @observable user = fromJS({
        name: 'xile',
        age: 100,
        list: []
    })
    constructor() {
        makeObservable(this)
    }
    @action addCount = () => {
        this.count++
    }
    @action descCount = () => {
        this.count--
    }
    @action changeName = (payload) => {
        console.log(this.user);
        this.user = this.user.set("name", payload)
    }
    // 计算属性,通过@computed 进行定义 
    @computed get total() {
        return this.count * 100 + 10
    }
    set total(val) {
        // 给total 赋值的时候 改变的是count
        this.count = val
    }
    // 修改计算属性 
    @action changeTotal = (payload) => {
        this.total = payload
    }
    @action getList = async (payload) => {
        let res = await Http.get("http://localhost:3000/api/pro/list", { params: payload })
        runInAction(() => {
            console.log(this.user);
            // 存入的res.data 没有被fromjs化 
            // this.user = this.user.set("list", res.data)
            this.user = fromJS({ ...this.user.toJS(), list: res.data })
            console.log(this.user);
            console.log(this.user.get("list"));
        })
    }
}
export default new MyData()