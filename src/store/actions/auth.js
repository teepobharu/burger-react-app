import * as actionTypes from './actionsTypes';
// import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        error: null,
        loading: false
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
    // return dispatch => {
    //     setTimeout(() => dispatch(logout()), expirationTime * 1000);
    // }
}
export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
    // const APIKEY = 'AIzaSyC_ZP37Eecfnl8HHBcELc7QLje8gzM5e4Y';
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
    //     if (!isSignup) {
    //         url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="
    //     }
    //     Axios.post(url + APIKEY, authData)
    //         .then(
    //             response => {
    //                 localStorage.setItem('token', response.data.idToken);
    //                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //                 localStorage.setItem('expirationDate', expirationDate);
    //                 localStorage.setItem('userId', response.data.localId);
    //                 dispatch(checkAuthTimeout(response.data.expiresIn));
    //                 dispatch(authSucess(response.data.idToken, response.data.localId));
    //             }
    //         ).catch(err => {
    //             dispatch(authFail(err.response.data.error));
    //         }
    //         )
    // }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return { type: actionTypes.AUTH_CHECK_STATE };
}

//SAGA

export const logoutSucceed = () => {
    return { type: actionTypes.AUTH_LOGOUT }
}

