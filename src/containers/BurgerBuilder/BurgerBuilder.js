import React, { Component } from 'react';

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


export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.buildControlRef = React.createRef();
    }
    componentDidUpdate() {
        console.log("%c [BurgerBuilder] DidUpdate", "color:red", this.buildControlRef);
        if (this.props.location.hash === "#burgerControl" && this.buildControlRef.current) {
            console.log("%c HASH: %o %o", "color:green; font-weight:bold;", this.props.location.hash, this.buildControlRef)
            this.scrollIntoView();
            this.buildControlRef.current = null;
            console.log(this.props.history);
        }
    }
    componentDidMount = () => {
        console.log("%c [BurgerBuilder] DidMount", "color:red");
        this.props.onInitIngredients();
        //Check for hash
        console.log("%c [BurgerBuilder] %c Location: %o", "color:red", "color:pink; font-weight:bold;", this.props.location);
        if (this.textarea.current) this.textarea.current.select();

    }
    scrollIntoView = (ref) => {
        this.buildControlRef.current.scrollIntoView({
            // optional params
            behaviour: 'smooth',
            block: 'start',
            inline: 'center',
        });

    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: 'checkout',
            search: '?queryString'
        });
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredient can't be loaded!</p> : <Spinner></Spinner>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <div className={classes.burgerBuild} id="burgerControl" ref={this.buildControlRef}>Burger Controls</div>
                    <textarea
                        rows="5"
                        style={{ display: "block", margin: "0.5em auto" }}
                        className="red center"
                        defaultValue="Please Login to Order. Upon success you will redirect to Checkout Page with current Burger."
                        ref={this.textArea} />

                    < BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuth}
                    />
                </Aux >
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price} />
            )

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <div className={classes.header}>Your Burger</div>
                {burger}

            </Aux>
        );
    }

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