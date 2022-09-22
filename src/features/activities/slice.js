import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list:[],//["שחיה","ריקוד","טיול"],
    isLoading: true,
    regData:null,
    catagories:[]
}


const actSlice = createSlice({
    name:'activities',
    initialState:initialState,
    reducers:{
        setActivities:(state,{payload})=>{
            state.list = payload
        },
        setRegData:(state,{payload})=>{
            state.regData = payload
        },
        setCatagories:(state,{payload})=>{
             state.catagories = payload
        }
    }
})

export const {setActivities,setRegData,setCatagories} = actSlice.actions

export default actSlice.reducer