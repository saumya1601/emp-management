import storage from 'redux-persist/lib/storage'; // Default localStorage for web
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authReducer from './authSlice';
import userReducer from './userSlice';
import sidebarReducer from './sidebarSlice';
import salaryReducer from './salarySlice'

// Encryption transform
const encryptor = encryptTransform({
    secretKey: 'your-secret-key', // Replace with a strong, secure key
    onError: (error) => {
        console.error('Encryption error:', error);
    },
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'sidebar',], // State slices to persist
    transforms: [encryptor],
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    sidebar: sidebarReducer,
    salary: salaryReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
