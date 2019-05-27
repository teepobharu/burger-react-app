import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-order';
import * as actions from '../index';
import { put } from 'redux-saga/effects';

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

export function* initIngredients(action) {
    try {
        const response = yield axios.get('https://react-my-burger-b8b1b.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}