import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from './persistConfig'; // Import the persisted reducer

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
            },
        }),
});

const persistor = persistStore(store); // Persistor for the store

export { store, persistor };
