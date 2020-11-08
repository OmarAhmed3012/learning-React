import React, { Component } from "react";
import NavBar from "./navbar";
//import ShoppingCart from './shoppingCart';
import { Redirect, Route, Switch } from "react-router-dom";
//import About from "./about";
//import Contact from "./contact";
import Home from "./home";
import ShoppingCart from "./shoppingCart";
import ProductDetails from "./productDetails";
import NotFound from "./notFound";
import Menu from "./menu";
import Login from "./login";

class App extends Component {
  state = {
    products: [
      {
        id: 1,
        name: "Burger",
        count: 0,
        price: 30,
        isInCart: false,
      },
      {
        id: 2,
        name: "water",
        count: 0,
        price: 10,
        isInCart: false,
      },
      {
        id: 3,
        name: "cheess",
        count: 0,
        price: 20,
        isInCart: false,
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
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].count++;
    //Set State
    this.setState({ products });
  };

  handleInCartChange = (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };

    products[index].isInCart = !products[index].isInCart;

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
              path="/products/:id/:name?"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.isInCart)}
                  onIncrement={this.incrementHandler}
                  onDelete={this.handleInCartChange}
                  onReset={this.handleReset}
                  {...props}
                />
              )}
            />
            <Route path="/notfound" component={NotFound} />
            {/* //2. Add Route */}
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  onClick={this.handleInCartChange}
                />
              )}
            />
            <Route path="/home" exact component={Home} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/home" />
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
