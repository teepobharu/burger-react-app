import React from 'react';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux >
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <Logo height={"100px"} />
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuth={props.isAuth} />
            </div>

        </Aux>

    )
};
export default sideDrawer;