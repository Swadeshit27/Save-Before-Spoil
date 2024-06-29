import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    loading: false,
    role: null,
    token: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.role = null;
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
