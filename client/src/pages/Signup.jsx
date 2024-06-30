import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                username,
                email,
                phone,
                role,
                location,
            });

            alert('User registered successfully');
            navigate(role === 'food_bank' ? '/food-bank-dashboard' : '/shop-keeper-dashboard');
        } catch (error) {
            console.error('Error signing up: ', error);
            alert(error.message);
        }
    };

    const signupWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const credential = await GoogleAuthProvider.credentialFromResult(res);
            const token = credential.accessToken;
            const user = res.user;
            console.log("Here is the User" + user);
          navigate(role === 'food_bank' ? '/food-bank-dashboard' : '/shop-keeper-dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 to-black">
            <form onSubmit={handleSignUp} className="bg-white p-8 rounded-2xl  max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                <div className=' flex gap-4'>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full p-3 rounded-xl shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-4 gap-4">
                        <label className="block mb-2 text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 rounded-xl shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                </div>
                <div className=' flex gap-4'>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 rounded-xl shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                            className="w-full p-3 rounded-xl shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                </div>
                <div className=' flex gap-4'>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Role</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="shop_keeper"
                                    checked={role === 'shop_keeper'}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                    className="  form-radio text-indigo-600 shadow-neumorphic-inner focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-800 text-sm">Shop Keeper</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="food_bank"
                                    checked={role === 'food_bank'}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                    className="form-radio text-indigo-600 shadow-neumorphic-inner focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-800 text-sm">Food Bank (NGO)</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your location"
                            required
                            className="w-full p-3 rounded-xl shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <button type="submit" className="bg-black text-white py-3 px-6 rounded-xl shadow-neumorphic hover:bg-gray-800">
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="bg-gray-600 text-white py-3 px-6 rounded-xl shadow-neumorphic hover:bg-gray-700"
                    >
                        Go to Login
                    </button>
                    <button
                        type="button"
                        onClick={signupWithGoogle}
                        className="bg-red-500 text-white py-3 px-6 rounded-xl shadow-neumorphic hover:bg-red-600"
                    >
                        Signup with Google
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignUp
{/* import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../redux/slice/authslice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a new document in Firestore for the user
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        phone,
        role,
        location,
      });

      alert("User registered successfully");

      dispatch(login(user));
      navigate("/dashboard-1");
    } catch (error) {
      console.error("Error signing up: ", error);
      alert(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            className="form-input mt-1 block w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="role"
                value="shop_keeper"
                checked={role === "shop_keeper"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span className="ml-2">Shop Keeper</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="role"
                value="food_bank"
                checked={role === "food_bank"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span className="ml-2">Food Bank (NGO)</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Location</label>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded mr-2"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp; */}
