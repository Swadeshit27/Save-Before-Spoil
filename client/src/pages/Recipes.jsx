import dotenv from 'dotenv';

import React, { useState } from 'react';
import axios from 'axios';



const Recipes = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        try {
            const response = await axios.post('https://api.genkit.ai/recipes/generate', {
                ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.REACT_APP_GENKIT_API_KEY}`,
                },
            });
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };
  return (
      <div className="min-h-screen bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-4">Recipe Generator</h1>
          <input
              type="text"
              placeholder="Enter ingredients separated by commas"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border p-2 w-full mb-4"
          />
          <button
              onClick={fetchRecipes}
              className="bg-blue-500 text-white p-2 rounded"
          >
              Generate Recipes
          </button>
          <div className="mt-4">
              {recipes.map((recipe, index) => (
                  <div key={index} className="border p-4 mb-4 bg-white">
                      <h2 className="text-xl font-bold">{recipe.name}</h2>
                      <p>{recipe.description}</p>
                      <ul>
                          {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default Recipes
