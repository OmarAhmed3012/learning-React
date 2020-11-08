import React, { Component } from "react";
import Product from "./product";

class ShoppingCart extends Component {
  constructor(props) {
    super();
    console.log("Shopping cart constructor");
  }

  componentDidMount() {
    console.log("shopping cart component did mount");
  }

  render() {
    //  const { onReset, onDelete, onIncrement, products } = this.props;
    return (
      <React.Fragment>
        <h1>Shopping cart</h1>
        <button className="btn btn-secondary m-2" onClick={this.props.onReset}>
          Reset
        </button>
        {this.props.products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
