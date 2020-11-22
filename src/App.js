import React, {  useContext } from "react";
import './App.css';
import Headers from './components/Header/Headers';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from './components/Products/ProductDetails';
import { CartContext } from "./reducer/Context";
import CartItems from './components/CartItems/CartItems';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
function App() {

  return (
    <Router>
    <div className="app">
      <Headers />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product-details/:id" component={ProductDetails} />
       <Route exact path="/cart" component={CartItems} />
       <Route exact path="/place-order" component={PlaceOrder} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
