// src/redux/slices/salarySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSalary, addSalary } from "@/utils/axiosInstance";

// Thunk for fetching salaries
export const fetchSalaries = createAsyncThunk("salary/fetchSalaries", async () => {
    const response = await getSalary();
    return response.data.data; // Assuming the response has `data.data` structure
});

// Thunk for adding a new salary
export const createSalary = createAsyncThunk("salary/createSalary", async (newSalary) => {
    const response = await addSalary(newSalary);
    return response.data; // Assuming response contains the newly created salary object
});

const salarySlice = createSlice({
    name: "salary",
    initialState: {
        salaries: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalaries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSalaries.fulfilled, (state, action) => {
                state.salaries = action.payload;
                state.loading = false;
            })
            .addCase(fetchSalaries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createSalary.fulfilled, (state, action) => {
                state.salaries.unshift(action.payload); // Add new salary to the beginning
            });
    },
});

export default salarySlice.reducer;
