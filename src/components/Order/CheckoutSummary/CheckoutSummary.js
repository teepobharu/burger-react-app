import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSumary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope it taste well</h1>
            <div style={{ width: '100%', height: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btntype="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btntype="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>

    )
}

export default checkoutSummary;
