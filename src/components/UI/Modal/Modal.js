import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Modal = props => {

    // shouldComponentUpdate (nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.childre !== props.children;
    // }

    // const componentDidUpdate() {
    //     console.log("[Modal] didupdate");
    // }
    console.log("%c [Modal] render", "color:slategrey;font-weight: bold;");
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-200vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
}
// export default Modal;
export default React.memo(Modal
    , (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);
