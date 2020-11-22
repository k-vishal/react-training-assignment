import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { CartContext } from '../../reducer/Context';
import { useHistory } from "react-router-dom";
function CartItems() {
  const context = useContext(CartContext);
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);

  const orderPlace = () => {
    history.push("/place-order");
  };
  
  let subTotal = 0;
  cartItems.forEach((element) => {
    subTotal = subTotal + element.price * element.qty;
  });
  

  useEffect(() => {
    setCartItems(context.cartProductState);
  }, [context.cartProductState]);

 
  const removeFromCart = (data) => {
    context.dispatchState({
      type: "removeFromCart",
      id: data.id,
    });
  };

  return (
    <div className="cart">
      <div className="cart__contains">
        {context.cartProductState.length !== 0 ? (
          <h1>Place Your Order!</h1>
        ) : (
          <h1>Your cart is Empty :(</h1>
        )}
        {cartItems.map((data, index) => {
          return (
            <div className="cart__contains__map" key={index}>
              <h3>{data.title}</h3>

              <p className="product__desc">{data.description}</p>
              <strong>{data.price} ₹</strong>
              <strong>Quantity : {data.qty} </strong>
              <img src={data.image} alt="Image"></img>
              <br />

              <button
                onClick={() => {
                  removeFromCart(data);
                }}
              >
                REMOVE
              </button>
            </div>
          );
        })}
      </div>
      {context.cartProductState.length !== 0 && (
        <div>
          <h3>Subtotal ({context.cartProductState.length} items) </h3>

          <strong>Price : {subTotal.toFixed(2)} ₹</strong>
          <br />
          <br />

          <button className="subtotal_button" onClick={orderPlace}>PLACE ORDER</button>
        </div>
      )}
    </div>
  );
}

export default CartItems;
