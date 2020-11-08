import React, { Component } from "react";
import NavBar from "./navbar";
//import ShoppingCart from './shoppingCart';
import { Redirect, Route, Switch } from "react-router-dom";
import About from "./about";
import Contact from "./contact";
import Home from "./home";
import ShoppingCart from "./shoppingCart";
import ProductDetails from "./productDetails";
import NotFound from "./notFound";

class App extends Component {
  state = {
    products: [
      {
        id: 1,
        name: "Burger",
        count: 2,
      },
      {
        id: 2,
        name: "water",
        count: 4,
      },
      {
        id: 3,
        name: "cheess",
        count: 1,
      },
    ],
  };

  handelDelete = (product) => {
    const newProducts = this.state.products.filter((p) => p.id !== product.id);

    this.setState({ products: newProducts });
  };

  handleReset = () => {
    let products = [...this.state.products];
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    this.setState({ products });
  };

  incrementHandler = (product) => {
    let products = [...this.state.products];

    const index = products.indexOf(product);
    products[index] = { ...products[index] };

    products[index].count++;

    this.setState({ products });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          productsCount={this.state.products.filter((p) => p.count > 0).length}
        ></NavBar>
        <main className="container">
          <Switch>
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products}
                  onIncrement={this.incrementHandler}
                  onDelete={this.handelDelete}
                  onReset={this.handleReset}
                  {...props}
                />
              )}
            />
            <Route
              path="/products/:id/:name?"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/contact" component={Contact} />
            <Route path="/" exact component={Home} />
            <Redirect from="/home" to="/" />
            <Redirect to="/notfound" />
          </Switch>
          {/*<ShoppingCart
                        products={this.state.products}
                        onIncrement={this.incrementHandler}
                        onDelete={this.handelDelete}
                        onReset={this.handleReset}
                        ></ShoppingCart>*/}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
