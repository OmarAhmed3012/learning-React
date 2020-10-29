import React, { Component } from 'react';
import NavBar from './navbar';
import ShoppingCart from './shoppingCart';


class App extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <NavBar></NavBar>
                    <main className="container">
                        <ShoppingCart></ShoppingCart>
                    </main>
                
            </React.Fragment>
         );
    }
}
 
export default App;