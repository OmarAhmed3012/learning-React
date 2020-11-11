import React, { Component } from "react";
import axios from "axios";

class ProductForm extends Component {
  state = { id: "", name: "", price: "" };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== "new") {
      const { data } = await axios.get(
        "https://iti-react-cource.herokuapp.com/products" + id
      );
      //Clone
      const state = { ...this.state };
      //Edit
      state.name = data.name;
      state.price = data.price;
      state.id = data.id;
      //Set state
      this.setState(state);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.props.match.params.id === "new") {
      const obj = { ...this.state, count: 0, isInCart: false };
      await axios.post("https://iti-react-cource.herokuapp.com/products", obj);
    } else {
      const obj = { ...this.state, count: 0, isInCart: false };

      delete obj.id;
      await axios.patch(
        "https://iti-react-cource.herokuapp.com/products" + this.state.id,
        obj
      );
    }

    this.props.history.replace("/admin");
  };

  handleChange = (e) => {
    //Clone
    let state = { ...this.state };
    //Edit
    state[e.currentTarget.name] = e.currentTarget.value;
    //Set state
    this.setState(state);
  };

  render() {
    return (
      <React.Fragment>
        <h1>
          {this.props.match.params.id === "new"
            ? "Add Product"
            : "Edit Product"}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              value={this.state.price}
              id="price"
              name="price"
              type="text"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {this.props.match.params.id === "new" ? "Add" : "Edit"}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
