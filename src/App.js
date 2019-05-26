import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
// import classes from './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => {
  return (import('./containers/Auth/Auth'))
});
const asyncOrders = asyncComponent(() => {
  return (import('./containers/Orders/Orders'))
});
const asyncCheckout = asyncComponent(() => {
  return (import('./containers/Checkout/Checkout'))
});
class App extends Component {
  // state = { show: true }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>;

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
