import { createSlice } from '@reduxjs/toolkit';
import { decryptObject, encryptObject } from '@/utils/cryptoUtils';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;

            const encryptedUser = encryptObject(action.payload.user);

            localStorage.setItem('accessToken', action.payload.token);
            localStorage.setItem('user', encryptedUser);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
        loadUserFromLocalStorage: (state) => {
            const encryptedUser = localStorage.getItem('user');
            const accessToken = localStorage.getItem('accessToken');

            if (encryptedUser && accessToken) {

                const decryptedUser = decryptObject(encryptedUser);

                if (decryptedUser) {
                    state.user = decryptedUser;
                    state.isAuthenticated = true;
                }
            }
        },
    },
});

export const { loginSuccess, logout, loadUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
