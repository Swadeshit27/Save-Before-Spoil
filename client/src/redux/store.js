import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authslice';  // Update the path as necessary
import itemsSlice from './slice/itemsSlice';  // Update the path as necessary


const store = configureStore({
    reducer: {
        auth: authSlice,
        items: itemsSlice,
    },
});

export default store;
