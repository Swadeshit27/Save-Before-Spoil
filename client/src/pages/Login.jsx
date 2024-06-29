import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging in: ', error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-800 to-black">
      <form className="bg-white p-8 rounded-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder='Enter Your Email'
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            placeholder='Enter Your Password'
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-xl shadow-neumorphic hover:bg-gray-800"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-gray-400 text-black py-2 px-4 rounded-xl shadow-neumorphic hover:bg-gray-500"
            onClick={() => navigate('/signup')}
          >
            Go to Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
