import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authslice';  // Update the path as necessary
import itemsSlice from './slice/itemsSlice';  // Update the path as necessary
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const combinedReducers = combineReducers({
    auth: authSlice,
    items: itemsSlice
})

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['some.path.to.ignore'],
            },
        }),
});

export const persistedStore = persistStore(store);
export default store;
