import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    loading: false,
    token: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            // state.status = true;
            // state.userData = action.payload.userData;
        },
        logout: (state) => {
            // state.status = false;
            // state.userData = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
            // if (state.loading) {
            //     setInterval(() => {
            //         state.loading = false;
            //     }, 5000);
            // }
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { login, logout, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
