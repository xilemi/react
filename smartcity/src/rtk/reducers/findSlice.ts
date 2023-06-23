import { createSlice } from "@reduxjs/toolkit";



const findSlice = createSlice({
    name: "findSpace",
    initialState: {
        serviceList: [],
        cityList: [],
        localCity: ''
    },
    reducers: {
        updataServiceList(state, { payload }) {
            state.serviceList = payload
        },
        updataCityList(state, { payload }) {
            state.cityList = payload
        },
        updataLocalCity(state, { payload }) {
            state.localCity = payload
        }
    },
    extraReducers: (builder) => {
        builder
    },
})


export const { updataServiceList, updataLocalCity, updataCityList } = findSlice.actions


export default findSlice.reducer