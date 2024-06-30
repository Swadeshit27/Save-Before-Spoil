import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
    items: [],
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setAllItems: (state, action) => {
            console.log(action.payload)
            if (action.payload.length > 0) {
                const index = state.items.findIndex(item => item.name === action.payload.name);
                if (index === -1) {
                    state.items.push(action.payload);
                    return;
                }
            }
            else state.items.push(action.payload)
        },
        addIngredient: (state, action) => {
            console.log(action.payload)
            state.ingredients = action.payload;
        },
        emptyIngredients: (state) => {
            state.ingredients = [];
        }
    }
});

export const { addIngredient, emptyIngredients, setAllItems } = itemsSlice.actions;
export default itemsSlice.reducer;
