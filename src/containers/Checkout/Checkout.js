import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }
    const checkoutContinuedHandler = () => {
        console.log("checkoutContinue")
        props.history.replace('/checkout/contact-data');
    }
    let summary = <Redirect to="/" />
    console.log("Redirect:(skip-step) %c summary", "color:red");
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
        summary = (
            <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancel={checkoutCancelledHandler}
                    checkoutContinue={checkoutContinuedHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </React.Fragment>
        )
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);