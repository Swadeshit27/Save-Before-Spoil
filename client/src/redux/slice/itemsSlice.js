import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            state.ingredients = action.payload;
        },
        emptyIngredients: (state) => {
            state.ingredients = [];
        }
    }
});

export const { addIngredient, emptyIngredients } = itemsSlice.actions;
export default itemsSlice.reducer;
