import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

const FoodBankDashboard = () => {
    const [shopkeepers, setShopkeepers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchShopkeepers = async () => {
            try {
                const usersQuery = query(collection(db, 'users'), where('role', '==', 'shop_keeper'));
                const usersSnapshot = await getDocs(usersQuery);
                const shopkeeperData = [];
                for (const userDoc of usersSnapshot.docs) {
                    const userId = userDoc.id;
                    const expiredFoodQuery = query(collection(db, 'expired_food'), where('shop_keeper_id', '==', userId));
                    const expiredFoodSnapshot = await getDocs(expiredFoodQuery);
                    const expiredFood = expiredFoodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    shopkeeperData.push({ id: userId, ...userDoc.data(), expiredFood });
                }
                setShopkeepers(shopkeeperData.slice(0, 10)); // Display only the first 10 shopkeepers
                setLoading(false);
            } catch (error) {
                console.error('Error fetching shopkeepers:', error);
                setLoading(false);
            }
        };

        fetchShopkeepers();
    }, []);

    const handleAddToCart = (food) => {
        setCart([...cart, food]);
        alert('Added to cart!');
    };

    const handleAddFood = async (e, shopKeeperId) => {
        e.preventDefault();
        const foodName = e.target.foodName.value;
        const expiryDate = e.target.expiryDate.value;
        const quantity = e.target.quantity.value;
        const price = parseFloat(e.target.price.value);
        const discount = parseFloat(e.target.discount.value);

        const newFood = {
            shop_keeper_id: shopKeeperId,
            food_name: foodName,
            expiry_date: expiryDate,
            quantity: parseInt(quantity),
            price: price,
            discount: discount,
        };

        try {
            await addDoc(collection(db, 'expired_food'), newFood);
            const updatedShopkeepers = shopkeepers.map(shopkeeper => {
                if (shopkeeper.id === shopKeeperId) {
                    return { ...shopkeeper, expiredFood: [...shopkeeper.expiredFood, newFood] };
                }
                return shopkeeper;
            });
            setShopkeepers(updatedShopkeepers);
            alert('Expired food added successfully');
        } catch (error) {
            console.error('Error adding expired food:', error);
            alert(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Food Bank Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shopkeepers.map(shopkeeper => (
                    <div key={shopkeeper.id} className="bg-white shadow-lg rounded-lg p-6 w-full">
                        <h2 className="text-2xl font-bold mb-2">{shopkeeper.username}</h2>
                        <p className="text-gray-700 mb-4">{shopkeeper.email}</p>
                        {shopkeeper.expiredFood.map(food => {
                            const finalPrice = (food.price * (1 - food.discount / 100)).toFixed(2);
                            return (
                                <div key={food.id} className="mb-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCart([...cart, food]);
                                                } else {
                                                    setCart(cart.filter(item => item.id !== food.id));
                                                }
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{food.food_name}</h3>
                                            <p className="text-gray-600">Expiry Date: {food.expiry_date}</p>
                                            <p className="text-gray-600">Quantity: {food.quantity}</p>
                                            <p className="text-gray-600">Price: ${food.price.toFixed(2)}</p>
                                            <p className="text-gray-600">Discount: {food.discount}%</p>
                                            <p className="text-gray-800 font-bold">Final Price: ${finalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <form onSubmit={(e) => handleAddFood(e, shopkeeper.id)} className="mt-4 hidden">
                            <div className="mb-2">
                                <label className="block mb-1 text-gray-700">Food Name</label>
                                <input
                                    type="text"
                                    name="foodName"
                                    placeholder="Enter food name"
                                    required
                                    className="w-full p-2 rounded-lg shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 text-gray-700">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    required
                                    className="w-full p-2 rounded-lg shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    required
                                    className="w-full p-2 rounded-lg shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    placeholder="Enter price"
                                    required
                                    className="w-full p-2 rounded-lg shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-gray-700">Discount (%)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    step="0.01"
                                    placeholder="Enter discount"
                                    required
                                    className="w-full p-2 rounded-lg shadow-neumorphic-inner focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <button type="submit" className="bg-black text-white py-2 px-4 rounded-lg shadow-neumorphic hover:bg-gray-800">
                                Add Expired Food
                            </button>
                        </form>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-8"
                    onClick={() => alert('Added to cart: ' + JSON.stringify(cart, null, 2))}
                >
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export default FoodBankDashboard;
