import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authslice';  // Update the path as necessary

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
