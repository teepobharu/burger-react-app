import React, { Component, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/index';
import { connect } from 'react-redux';

const asyncAuth = React.lazy(() => {
  return (import('./containers/Auth/Auth'))
});
const asyncOrders = React.lazy(() => {
  return (import('./containers/Orders/Orders'))
});
const asyncCheckout = React.lazy(() => {
  return (import('./containers/Checkout/Checkout'))
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = <Switch>
    <Route path="/auth" component={asyncAuth} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
  </Switch>;

  if (props.isAuth) {
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
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
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
