import { configureStore } from '@reduxjs/toolkit';
import authslice from './slice/authslice';


const store = configureStore({
    reducer: {
        auth: authslice,
    },
});

export default store;