import React, { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../reducer/Context";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const context = useContext(CartContext);
  const { id } = useParams();
 
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        let temp = data;
        temp.qty = qty;
        setProductDetails(temp);
      });
  }, [id]);
  useEffect(() => {
    let temp = productDetails;
    temp.qty = qty;
    setProductDetails(temp);
  }, [qty]);
  function decrementQty() {
    qty <= 1 ? setQty(1) : setQty(qty - 1);
  }
  return (
    <div className="productDetails">
      <div className="productDetails__left">
        <img
          className="productDetails_img"
          src={productDetails.image}
          alt="Loading Image"
        ></img>
      </div>
      <div className="productDetails__right">
        <h1>{productDetails.title}</h1>
        <p>{productDetails.description}</p>
        <strong>Category : {productDetails.category}</strong>
        <h3>
          Price : <span></span>
          {productDetails.price} ₹
        </h3>
        <strong>Quantity</strong>
        <input style={{width: "100px"}} type="number" value={qty} readOnly />
        <button
          onClick={() => {
            setQty(qty + 1);
          }}   className="product__qty"  >
          +
        </button>

        <button
          onClick={() => {
            decrementQty();
          }}   className="product__qty" >
          -
        </button>
        <button
          onClick={() => {
            context.dispatchState({
              type: "addToCart",
              value: { productDetails },
            });
            history.push(`/`);
            alert("Added to Cart!")
          }}
          className="product__cart"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
