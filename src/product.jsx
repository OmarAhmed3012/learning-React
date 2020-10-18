import React, { Component } from 'react';

class Product extends Component {
    state = { 
        name: 'Burger',
        count: 3,
        imgUrl: 'logo'
     }

     getClasses() {
         return this.state.count === 0 ? "badge badge-warning m-2" : "badge badge-primary m-2"
     }

     clickHandler = (num) => {
         this.setState({ count: this.state.count + num })
     }

     increment = () => {
        this.clickHandler(2)
     }

    render() { 
        return ( 
            <div>
                <span className="" >{this.state.name}</span>
                <span className={this.getClasses()}>{this.state.count}</span>
                <button className="btn btn-primary btn-sm" onClick={() => this.clickHandler(2)}>+</button>
            </div>
         );
    }
}
 
export default Product;