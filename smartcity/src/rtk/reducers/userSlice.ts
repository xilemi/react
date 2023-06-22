import { getUserInfoApi } from './../../api/prodApi/userInfo';
import { userInfoType } from './../../types/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginType } from "../../types";
import { getUserInfoApi, loginApi } from "../../api/prodApi/userInfo";
import { useCommonFunc } from "../../hooks";
import { useNavigate } from "react-router-dom";
const userSlice = createSlice({
    name: 'userInfo',
    initialState: { Authorization: '', info: {} },
    reducers: {
        updataToken(state, { payload }) {
            state.Authorization = payload
        },
        updataInfo(state, { payload }) {
            state.info = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAndUpdateTokenAsync.fulfilled, (state, { payload }) => {
                state.Authorization = payload
            })
            .addCase(getUserInfoAsync.fulfilled, (state, { payload }) => {
                state.info = payload
            })
    }
})

export const { updataToken, updataInfo } = userSlice.actions
export const loginAndUpdateTokenAsync = createAsyncThunk("userInfo/loginAndUpdateToken", async (params: loginType) => {
    let res = await loginApi(params)
    if (res.code == 200) {
        return res.token
    }
})
export const getUserInfoAsync = createAsyncThunk("userInfo/getUserInfo", async () => {
    let res = await getUserInfoApi()
    return res.user
})
export default userSlice.reducer