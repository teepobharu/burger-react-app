import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

import * as actions from '../../store';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        });
        this.setState({ controls: updatedControls });
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
    }
    logoutHandler = (event) => {
        event.preventDefault();
        this.props.onLogout();
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ));
        let errorMessage;
        if (this.props.loading) {
            form = <Spinner></Spinner>;
        }
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div>
                {authRedirect}
                <p style={{ textAlign: "center" }}>
                    {this.state.isSignup ? "Signup" : "Signin"}
                    {errorMessage}
                </p>
                <form onSubmit={this.submitHandler} className={classes.Auth}>
                    {form}
                    <Button btntype="Success">SUBMIT</Button>
                </form>
                <div style={{ textAlign: "center" }}>
                    <Button clicked={(event) => this.logoutHandler(event)} btntype="Danger">Logout</Button>
                    <Button type="button" clicked={this.switchAuthModeHandler}
                        btntype="Danger">{this.state.isSignup ? "Switch To Signin" : "Switch to Singup"}</Button>
                </div>
            </div >
        )
    }
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
            onFail: () => dispatch(actions.authFail()),
            onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Auth);