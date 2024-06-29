import React, { useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

            // Create a new document in Firestore for the user
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                username,
                email,
                phone,
                role,
                location,
            });

            alert('User registered successfully');
            navigate('/');
        } catch (error) {
            console.error('Error signing up: ', error);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignUp}>
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
                                checked={role === 'shop_keeper'}
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
                                checked={role === 'food_bank'}
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
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded mr-2">
                        Sign Up
                    </button>
                    <button
                        type="button"
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
