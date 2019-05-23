import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // console.log(props);
    // const test = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         // Array(length) = empty
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return `<BurgerIngredient key=${igKey + i} type=${igKey} />`
    //         });
    //     });
    // console.log(test);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // Array(length) = empty [[_,_],[_],[_]]
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //[_,_] => meat1, meat2 (component)
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
            //[ [meat1,meat2], [sald] ]
        }) //Flatten to one array
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    //[ meat1,meat2,sald ]
    // console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    // console.log(test.map(igKey => {
    //     return [...Array(props.ingredients[igKey].map((_, i) => {
    //         return <BurgerIngredient key={igKey + i} type={igKey} />
    //     }))]
    // }));
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )

}
export default withRouter(burger);