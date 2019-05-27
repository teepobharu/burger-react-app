import { put } from "redux-saga/effects";
import axios from '../../axios-order';
import * as actions from '../index';

export function* purchaseBurger(action) {
    yield put(actions.purchaseBurgerStart());
    try {

        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);

        yield put(actions.purchaseBurgerSuccess(response.data.name, response.data));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrders(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const response = yield axios.get("/orders.json?auth=" + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"');
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}