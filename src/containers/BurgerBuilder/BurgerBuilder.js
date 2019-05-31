import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/index';

import classes from './BurgerBuilder.css';


export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const textarea = React.createRef();
    const buildControlRef = React.createRef();

    useEffect(() => {
        console.log("%c [BurgerBuilder] useEffect", "color:red");
        props.onInitIngredients();
    }, []);
    useEffect(() => {
        checkHash();
    });
    const checkHash = () => {
        console.log("%c [BurgerBuilder] CheckHash", "color:red", buildControlRef);
        if (props.location.hash === "#burgerControl" && buildControlRef.current) {
            console.log("%c HASH: %o %o", "color:green; font-weight:bold;", props.location.hash, buildControlRef)
            scrollIntoView();
            buildControlRef.current = null;
            console.log(props.history);
        }
        //Check for hash
        console.log("%c [BurgerBuilder] %c Location: %o", "color:red", "color:pink; font-weight:bold;", props.location);
        if (textarea.current) textarea.current.select();
    }

    const scrollIntoView = (ref) => {
        buildControlRef.current.scrollIntoView({
            // optional params
            behaviour: 'smooth',
            block: 'start',
            inline: 'center',
        });

    }
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: 'checkout',
            search: '?queryString'
        });
    }
    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredient can't be loaded!</p> : <Spinner></Spinner>;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <div className={classes.burgerBuild} id="burgerControl" ref={buildControlRef}>Burger Controls</div>
                <textarea
                    rows="5"
                    style={{ display: "block", margin: "0.5em auto" }}
                    className="red center"
                    defaultValue="Please Login to Order. Upon success you will redirect to Checkout Page with current Burger."
                    ref={textarea} />

                < BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemove={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    price={props.price}
                    isAuth={props.isAuth}
                />
            </Aux >
        );
        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.price} />
        )

    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <div className={classes.header}>Your Burger</div>
            {burger}

        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onFailIngredient: () => dispatch(actions.fetchIngredientsFailed()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));