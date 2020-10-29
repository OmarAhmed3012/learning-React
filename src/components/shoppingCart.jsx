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

     handelDelete = (product) => {
         const newProducts = this.state.products.filter(p => p.id !== product.id);

         this.setState({ products: newProducts })
     }

     handleReset = () => {
         let products = [...this.state.products];
         products = products.map(p => {
             p.count = 0;
             return p;
         });
         this.setState({ products });
     }

     incrementHandler = (product) => {
        let products = [...this.state.products];

        const index = products.indexOf(product);
        products[index] = {...products[index]};

        products[index].count++;

        this.setState({ products });
    }
    render() { 
        return ( 
            <React.Fragment>
                <h1>Shopping cart</h1>
                <button className="btn btn-secondary m-2" onClick={this.handleReset}>Reset</button>
                {this.state.products.map(product => (
                    <Product key={product.id}
                     product={product}
                     onDelete={this.handelDelete}
                     onIncrement={this.incrementHandler}
                     >
                        
                         </Product>
                ))}
            </React.Fragment>
         );
    }
}
 
export default ShoppingCart;