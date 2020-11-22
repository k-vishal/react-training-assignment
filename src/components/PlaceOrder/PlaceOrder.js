import React, { useContext } from "react";
import "./PlaceOrder.css";
import { CartContext } from '../../reducer/Context';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
function PlaceOrder() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const context = useContext(CartContext);
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: context.cartUserState ? context.cartUserState.email : "",
    mob: "",
    creditNo: "",
  });


  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  //  setErrors(validate(values));
  };
  
  const handleSubmit = e => {

    e.preventDefault();
    let errArray= validate(values);
    setErrors(errArray);
   setIsSubmitting(true);

   if(Object.keys(errArray).length === 0) {
      alert("Order placed Successfully!");
    context.dispatchState({
      type: "clearCart",
    });
    history.push("/");}
  };

  const validate = (values) => {

    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required!";
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(values.name)
    ) {
      errors.name = "Please enter valid Name!";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter valid email!";
    }
    if (!values.mob) {
      errors.mob = "Mobile No is Required!";
    } else if (isNaN(values.mob)) {
      errors.mob = "Please enter valid Mobile No!";
    } else if (values.mob.length !== 10) {
      errors.mob = "Mobile No must contain 10 digits!";
    }
    if (!values.creditNo) {
      errors.creditNo = "Credit Card No is Required!";
    } else if (isNaN(values.creditNo)) {
      errors.creditNo = "Please enter valid Credit Card No!";
    } else if (values.creditNo.length !== 16) {
      errors.creditNo = "Credit Card No must contain 16 digits!";
    }
    return errors;
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="place__order">
          <h1>Order Summary</h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
          />

          {errors.name && <span>{errors.name}</span>}

          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
         
          <input
            type="tel"
            placeholder="Mobile No"
            name="mob"
            id="mob"
            value={values.mob}
            onChange={handleChange}
            />
             {errors.mob && <span>{errors.mob}</span>}

          <input
            type="number"
            placeholder="Credit Card No"
            name="creditNo"
            id="creditNo"
            value={values.creditNo}
            onChange={handleChange}
          />

         {errors.creditNo && <span>{errors.creditNo}</span>}
         
          <button type="submit">BUY NOW</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
