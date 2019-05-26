import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';


export const addIngredient = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
};
export const removeIngredient = (name) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    console.log(axios);
    return dispatch => {
        axios.get('https://react-my-burger-b8b1b.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            }).catch(
                error => {
                    dispatch(fetchIngredientsFailed());
                }
            );
    };
};