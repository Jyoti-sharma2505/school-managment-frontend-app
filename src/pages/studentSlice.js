import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const response = await axios.get("https://school-managment-backend-app.vercel.app/students");
    return response.data
})

export const addStudent = createAsyncThunk("students/addStudent", async (newStudent) => {
    const response = await axios.post("https://school-managment-backend-app.vercel.app/students", newStudent);
    console.log("fetch", response)
    return response.data
})

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id) => {
    const response = await axios.delete(`https://school-managment-backend-app.vercel.app/students/${id}`);
    console.log(response, "delete")
    return response.data.student;
})

export const updateStudent = createAsyncThunk("students/updateStudent", async ({ id, updateStudent }) => {
    const response = await axios.put(`https://school-managment-backend-app.vercel.app/students/${id}`, updateStudent);
    return response.data;
})

export const studentSlice = createSlice({
    name: "Students",
    initialState: {
        students: [],
        status: "idle",
        error: null,
        filter: "All",
        sortBy: "name",
        totalStudents: 0,
        averageMarks: 0,
        averageAttendance: 0,
        topStudent: null,
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        updateSchoolStats: (state, action) => {
            state.topStudent = action.payload.topStudent;
            state.averageAttendance = action.payload.averageAttendance;
            state.averageMarks = action.payload.averageMarks;
            state.totalStudents = action.payload.totalStudents;
        },
        setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.students.push(action.payload);
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter((student) => student._id !== action.payload._id)
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.students.findIndex((student) => student._id === action.payload._id);
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            })
    }
})
export const { setFilter, setSortBy, setTopStudent, updateSchoolStats } = studentSlice.actions;

export default studentSlice.reducer;