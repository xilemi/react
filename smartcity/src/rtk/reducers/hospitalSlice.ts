import { createSlice } from "@reduxjs/toolkit";


const hospitalSlice=createSlice({
    name:'hospitalSpace',
    initialState:{
        patientInfo:{},
        departmentInfo:{},
        id:''
    },  
    reducers:{
        updataPatientInfo(state,{payload}){
            state.patientInfo=payload
        },
        updataDepartmentInfo(state,{payload}){
            state.departmentInfo=payload
        },
        updataIdInfo(state,{payload}){
            state.id=payload
        }
    }
})



export const {updataPatientInfo,updataDepartmentInfo,updataIdInfo} =hospitalSlice.actions


export default hospitalSlice.reducer
