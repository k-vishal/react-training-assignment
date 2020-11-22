
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartContext } from "../../reducer/Context";
import logo from '../../sale.png'
import "./Headers.css";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";


function Headers() {

    const context = useContext(CartContext);


    const onChangeSearch = (e) => {
     context.dispatchState({ type: "searchProduct", value: e.target.value });
      };
    
      const history = useHistory();
    return (
        <div className="header">
        <Link to="/">
          <img className="header__logo" src={logo} />
        </Link>

      <div className="header__search">
        <input
          type="text"
          placeholder="Search Your Products Here.."
          className="header__searchIn"
          onChange={onChangeSearch}
        value={context.search}
        />
         <SearchTwoToneIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
        <div className="header__option_one">
            <strong>Hello, User</strong>
        </div>
        <div className="header__option_three">
          <Link exact to="/cart">
          <strong>Cart</strong>
          </Link>
        </div>
      </div>
        </div>
    )
}

export default Headers
