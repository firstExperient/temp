import { configureStore } from "@reduxjs/toolkit";
import actReducer from "./features/activities/slice"
import userReducer from './features/user/slice'

export const store = configureStore({
    reducer:{
       activities:actReducer,
       user:userReducer
    }
})