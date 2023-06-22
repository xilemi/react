import { getCategoryListApi, getNewsListApi } from './../../api/news';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const newsSlice = createSlice({
    name: "newsSpace",
    initialState: {
        categoryList: [],
        newsList: [],
        categoryType: 0
    },
    reducers: {
        updataType(state, { payload }) {
            state.categoryType = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state, { payload }) => {
                state.categoryList = payload
            })
            .addCase(getNewsList.fulfilled, (state, { payload }) => {
                state.newsList = payload
            })
    }
})
export const { updataType } = newsSlice.actions
export const getCategoryList = createAsyncThunk("newsSpace/getCategoryList", async (callback: any) => {
    let res = await getCategoryListApi()
    if (res.code == 200) {
        callback()
        return res.data
    }
})
export const getNewsList = createAsyncThunk("newsSpace/getNewsList", async (params: any) => {
    let res = await getNewsListApi(params)
    return res.rows
})
export default newsSlice.reducer