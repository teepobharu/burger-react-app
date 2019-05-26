import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import { Link } from 'react-router-dom';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store';
import { connect } from 'react-redux';
export class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        console.log(this.props.orders);
        let orders = <Spinner></Spinner>
        if (!this.props.loading) {
            orders = this.props.orders.map(
                order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                )
            )
        }
        let msg = orders.length < 1 ? <Link to={{ hash: "burgerControl", pathname: "/" }}><p style={{ textAlign: "center" }}>No recipe orders Yet! </p></Link> : null

        return (
            <div>
                {msg}
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, id) => dispatch(actions.fetchOrders(token, id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));