import React, { Component } from "react";
import NavBar from "./navbar";
import axios from "axios";
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
import Admin from "./admin";
import ProductForm from "./productform";

class App extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3000/products/");
    this.setState({ products: data });
  }

  handelDelete = async (product) => {
    const oldProducts = [...this.state.products];
    const newProducts = this.state.products.filter((p) => p.id !== product.id);

    this.setState({ products: newProducts });
    try {
      await axios.delete("http://localhost:3000/products/111" + product.id);
    } catch (ex) {
      alert("Cant delete");
      this.setState({ products: oldProducts });
    }
  };

  handleEdit = () => {
    console.log("edit");
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
            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  {...props}
                  products={this.state.products}
                  onDelete={this.handelDelete}
                  onEdit={this.handleEdit}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/productform/:id" component={ProductForm} />
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
