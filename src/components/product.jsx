import React, { Component } from "react";
import { Link } from "react-router-dom";

class Product extends Component {
  getClasses() {
    return this.props.product.count === 0
      ? "badge badge-warning m-2"
      : "badge badge-primary m-2";
  }

  render() {
    console.log("Product render");
    return (
      <div className="row">
        <div className="col-2">
          <span className="">
            <Link to={`/products/${this.props.product.id}`}>
              {this.props.product.name}
            </Link>
          </span>
        </div>
        <div className="col">
          <span className={this.getClasses()}>{this.props.product.count}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => this.props.onIncrement(this.props.product)}
          >
            +
          </button>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.props.onDelete(this.props.product)}
          >
            <i className="fas fa-trash m-2"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default Product;
