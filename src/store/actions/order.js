import * as actionTypes from './actionsTypes';
// import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return { type: actionTypes.PURCHASE_BURGER_START }
}
export const purchaseBurger = (token, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        token: token,
        orderData: orderData
    }
    // return dispatch => {
    //     dispatch(purchaseBurgerStart());
    //     axios.post("/orders.json?auth=" + token, orderData)
    //         .then(response => {
    //             dispatch(purchaseBurgerSuccess(response.data.name, response.data));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             dispatch(purchaseBurgerFail(error));
    //         });
    // }
}

export const purchaseInit = () => {
    return { type: actionTypes.PURCHASE_INIT }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };

}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDER,
        token: token,
        userId: userId
    }
    // return (dispatch) => {
    //     dispatch(fetchOrdersStart());
    //     axios.get("/orders.json?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"')
    //         .then(res => {
    //             const fetchedOrders = [];
    //             for (let key in res.data) {
    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }
    //             dispatch(fetchOrdersSuccess(fetchedOrders));
    //         })
    //         .catch(err => {
    //             dispatch(fetchOrdersFail(err));
    //         });
    // }
}