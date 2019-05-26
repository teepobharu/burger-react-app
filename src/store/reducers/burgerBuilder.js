import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7,
}
const removeIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients: updateIngredients,
        building: true,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updateState);
}
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}
const fetchIngredientFail = (state, action) => {
    return {
        ...state,
        error: true
    }
}
const setIngredients = (state, action) => {
    // Not order ings
    return updateObject(state, {
        ingredients: {
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon,
            salad: action.ingredients.salad
        },
        totalPrice: 0,
        building: false,
        error: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientFail(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        default:
            return state;
    }
};
export default reducer;