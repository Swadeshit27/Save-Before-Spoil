import { createSlice } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
const auth = getAuth(app);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        signUp: async (state, action) => {
            try {
                const { email, password } = action.payload;
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                state.user = userCredential.user;
                state.error = null;
            } catch (error) {
                state.user = null;
                state.error = error.message;
            }
        },
        signIn: async (state, action) => {
            try {
                const { email, password } = action.payload;
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                state.user = userCredential.user;
                state.error = null;
            } catch (error) {
                state.user = null;
                state.error = error.message;
            }
        },
    },
});

export const { signUp, signIn } = authSlice.actions;

export default authSlice.reducer;