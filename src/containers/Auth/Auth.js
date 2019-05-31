import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email Address'
            },
            value: 'test@test.com',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            value: '123456',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath) {
            props.onSetAuthRedirectPath();
        }
        return (() => {
            props.onErrorReset();
        })
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        });
        setAuthForm(updatedControls);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }
    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
        props.onErrorReset();
    }
    const logoutHandler = (event) => {
        event.preventDefault();
        props.onLogout();
    }
    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form;

    form = formElementsArray.map(
        formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.elementType}
                changed={(event) => inputChangedHandler(event, formElement.id)} />
        ));
    let errorMessage;
    if (props.loading) {
        form = <Spinner></Spinner>;
    }
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirect, logout = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
        logout = <Button clicked={(event) => logoutHandler(event)} btntype="Danger">Logout</Button>;
    }

    return (
        <div className={isSignup ? classes.Signup : classes.Signin}>
            {authRedirect}
            <p className={classes.TopHeader}>
                {isSignup ? "Signup" : "Signin"}
            </p>
            <p className="centerText"> {errorMessage}</p>
            <form onSubmit={submitHandler} className={classes.Auth}>
                {form}
                <Button btntype="Success">Confirm</Button>
            </form>
            <div style={{ textAlign: "center" }}>
                {logout}
                <span className={classes.SwitchMode}>
                    Go to
                        <Button type="button" clicked={switchAuthModeHandler}
                        btntype="Danger">{isSignup ? " Signin" : "Singup"}</Button>
                </span>
            </div>
        </div >
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps
    = dispatch => {
        return {
            onAuth: (email, password, issignup) => dispatch(actions.auth(email, password, issignup)),
            onLogout: () => dispatch(actions.logout()),
            onErrorReset: () => dispatch(actions.authFail(null)),
            onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Auth);