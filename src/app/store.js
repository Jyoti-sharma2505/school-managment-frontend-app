import { configureStore } from "@reduxjs/toolkit";
import  studentSlice  from "../pages/studentSlice";

export default configureStore({
    reducer:{
        students:studentSlice,
    }
})