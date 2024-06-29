// src/components/RegisterFoodBank.js
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const FoodBankRegister = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "foodBanks"), {
                name,
                location,
                contact,
            });
            setName("");
            setLocation("");
            setContact("");
            alert("Food bank registered successfully!");
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register Food Bank</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contact</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default FoodBankRegister;
