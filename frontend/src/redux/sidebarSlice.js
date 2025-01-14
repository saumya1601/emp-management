
import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        open: true,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
        setSidebarState: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
