import React from "react";
import "./Home.css";
import ProductList from "../Products/ProductList";

function Home() {
  return (
    <div className="home">
      <div className="home__row">
        
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
