import React, { useState } from "react";
import { isAuthenticated } from "../../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../../backend";
import { cartEmpty, getCartTotalPrice } from "../helper/cartHelper";

const StripePayments = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const [status, setStatus] = useState("");

  const makeStripePayment = (token, userId) => {
    const body = {
      token,
      products,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return fetch(`${API}/payment/stripe/${userId}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //TODO:call further methods
        const { status } = response;
        console.log("STATUS : ", status);
        //  cartEmpty();
        setReload(!reload);
        setStatus("Order received Successfully");
      })
      .catch((error) => {
        console.log(error);
        setStatus("Payment Failed :( " + error);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <div className="p-3 text-center">
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
          token={() => {
            makeStripePayment(token, userId);
          }}
          amount={getCartTotalPrice() * 100}
          name="Buy T-Shirts"
          shippingAddress
          billingAddress
        >
          <button className="btn btn-outline-info rounded shadow">
            Pay ${getCartTotalPrice()} with Stripe
          </button>
        </StripeCheckout>
      </div>
    ) : (
      <Link to="/signin" className="btn btn-warning">
        Sign in to Checkout
      </Link>
    );
  };

  return (
    <div>
      <div>{showStripeButton()}</div>
      <div>{status && <div className="alert alert-info">{status}</div>}</div>
    </div>
  );
};
export default StripePayments;
