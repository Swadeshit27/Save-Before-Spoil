// src/GenRecipe.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'markdown-to-jsx'
import { useEffect } from 'react';

const GenRecipe = ({ data }) => {
    // const { ingredients } = useSelector(state => state.items);
    const [recipe, setRecipe] = useState('');

    const generateRecipe = async () => {
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
            const model = genAI.getGenerativeModel({
                model: 'gemini-pro',
                maxTokens: 2000,
                temperature: 1,
                topP: 1.0,
                topK: 40,
                presencePenalty: 0.0,
                frequencyPenalty: 0.0,
                bestOf: 1,
                n: 1,
                stop: ['\n', ':', '.', '?', '!'],
            });

            const prompt = `Generate recipes can be made with these following ingredients in food banks: ${data.join(', ')}`;
            console.log(prompt)
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            console.log(text)
            setRecipe(text);
        } catch (error) {
            console.error('Error generating recipe: ', error);
        }
    };

    const saveIngredients = async () => {
        try {
            const ingredientList = data.map((ingredient) => ingredient.name);
            await addDoc(collection(db, 'ingredients'), {
                ingredients: ["rice", "chicken"],
                timestamp: new Date(),
            });
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleGenerateRecipe = async () => {
        await saveIngredients();
        await generateRecipe();
    };

    useEffect(() => {
        handleGenerateRecipe();
    }, [])

    return (
        <div>

            {recipe ? <Markdown>{recipe}</Markdown> : <p>Sorry, we are currently enable to generate recipes using these ingredients</p>}
        </div>
    );
};

export default GenRecipe;

