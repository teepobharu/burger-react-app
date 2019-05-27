import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredients } from './burgerbuilder';
import * as actionTypes from '../actions/actionsTypes';
import { fetchOrders, purchaseBurger } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredients)
}

export function* watchOrder() {
    yield takeLatest(actionTypes.FETCH_ORDER, fetchOrders);
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger);
}