import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function(f) { return f;}
  reload = undefined,
}) => {
  const productName = product ? product.name : "Image from Pixels";
  const productDescription = product
    ? product.description
    : "This is Nice Description";
  const productPrice = product ? product.price : "0";
  //const productCategory = product ? product.category.name : "T-SHIRT";

  const [redirect, setRedirect] = useState(false);

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addProductToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
    //  console.log(JSON.parse(localStorage.getItem("cart")));
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => {
            addProductToCart();
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card bg-dark border border-dark">
      {getARedirect()}
      <div className="card-header lead">
        <h4>{productName}</h4>
      </div>
      <div className="card-body">
        <ImageHelper productId={product._id} className="m-0" />
        {/*<p className="lead bg-success font-weight-normal text-wrap">
          {productDescription}
        </p>*/}
        <p className="btn btn-info rounded btn-sm px-4">$ {productPrice}</p>

        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
