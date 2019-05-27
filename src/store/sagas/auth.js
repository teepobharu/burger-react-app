import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';

import * as actions from '../index';
// import * as actionTypes from '../actions/actionsTypes';
import axios from '../../axios-order';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const APIKEY = 'AIzaSyC_ZP37Eecfnl8HHBcELc7QLje8gzM5e4Y';
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
    if (!action.isSignup) {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="
    }
    console.log("TCL: function*authUserSaga -> url", url + APIKEY);
    // Synchronously run the code
    try {
        const response = yield axios.post(url + APIKEY, authData);
        console.log("TCL: function*authUserSaga -> response", response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
        yield put(actions.authSucess(response.data.idToken, response.data.localId));
    } catch (error) {
        console.log(error);
        yield put(actions.authFail(error.response ? error.response.data.error : error));
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = localStorage.getItem("userId");
            yield put(actions.authSucess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}