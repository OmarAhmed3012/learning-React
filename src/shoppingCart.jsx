import React, { Component } from 'react';
import Product from './product';


class ShoppingCart extends Component {
    state = { 
        products: [
            {
                id: 1,
                name: 'Burger',
                count: 2
            },
            {
                id: 2,
                name: 'water',
                count: 4
            },
            {
                id: 3,
                name: 'cheess',
                count: 1
            }
        ]
     }
    render() { 
        return ( 
            <React.Fragment>
                <h1>Shopping cart</h1>
                <Product></Product>
            </React.Fragment>
         );
    }
}
 
export default ShoppingCart;