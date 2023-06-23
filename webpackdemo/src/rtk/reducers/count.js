// createSlice 创建切片  包含  state action 
// 创建异步action 需要在外部使用 createAsyncThunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Http from "../../utils/Http"
const initialState = {
    num: 1000,
    name: 'xile',
    age: 18,
    msg: '我是你爹',
    list: []
}
const countSlice = createSlice({
    name: 'countSpace',
    initialState,
    reducers: {
        // action
        addNum(state, action) {
            state.num += 1
        },
        descNum(state, action) {
            state.num -= 1
        },
        changeNum(state, { payload }) {
            state.num += payload
        },
        changeMsg(state, { payload }) {
            console.log(111);
            state.msg = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListAsync.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.list = payload
            })
            .addCase(getMsgAsync.fulfilled, (state, { payload }) => {
                state.msg = payload
            })
    }
})



// 异步的已经导出了 
export const getListAsync = createAsyncThunk("countSpace/getList", async (params) => {
    let res = await Http.get("http://localhost:3000/api/pro/list", { params })
    return res.data
})

export const getMsgAsync = createAsyncThunk("countSpace/getMsg", async (params) => {
    let res = await Http.get("http://localhost:3000/api/pro/list", { params })
    return res.message
})



export const { addNum, descNum, changeNum, changeMsg } = countSlice.actions
//导出 在store 中进行导入
export default countSlice.reducer