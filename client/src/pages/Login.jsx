import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setToken } from "@/redux/slice/authslice";
import { login } from "../redux/slice/authslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await signInWithEmailAndPassword(auth, email, password);
      // const idToken = await res.user.getIdToken();
      const userdata = res.user;
      // console.log(idToken);
      // dispatch(setToken(idToken));
      dispatch(login(userdata));
      navigate("/dashboard-1");
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const user = auth.currentUser;
  if (user) {
    console.log(user);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="form-input mt-1 block w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="form-input mt-1 block w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded mr-2"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/signup")}
          >
            Go to Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
