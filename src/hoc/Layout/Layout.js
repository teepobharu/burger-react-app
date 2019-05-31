import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

import classes from './Layout.css';

const Layout = props => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
    }
    const sideDrawerTogglehandler = () => {
        setSideDrawerVisible((!sideDrawerVisible));
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerTogglehandler}
                isAuth={props.isAuth} />
            <SideDrawer
                open={sideDrawerVisible}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuth} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
