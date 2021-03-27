import React, { useState, useEffect } from "react";
import { cartEmpty, getCartTotalPrice } from "./helper/cartHelper";
import {
  getBraintreeToken,
  makeBraintreePayment,
} from "./paymentGateways/braintreeHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "./helper/orderHelper";
import { Redirect } from "react-router-dom";

const BraintreePayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() ? isAuthenticated().user._id : undefined;
  const token = isAuthenticated() ? isAuthenticated().token : undefined;

  const getToken = (userId, token) => {
    getBraintreeToken(userId, token)
      .then((response) => {
        if (response.error) {
          setInfo({ ...info, error: response.error });
        }
        if (response.clientToken) {
          console.log(response);
          setInfo({ ...info, clientToken: response.clientToken });
        }
      })
      .catch((err) => {
        console.log(err);
        setInfo({ ...info, error: err });
      });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showBraintreeDropIn = () => {
    return (
      <div className="pb-5">
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="pt-2 mb-0">
              <b>
                Card : 4217651111111119 <br />
                Expiry : 12/21
              </b>
            </div>

            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => {
                setInfo({ ...info, instance: instance });
                console.log(info.instance);
              }}
            />
            <button
              className="btn btn-outline-info rounded shadow btn-block"
              onClick={onPurchase}
            >
              Transaction Proceed
            </button>
          </div>
        ) : (
          <div>
            <h5> Add Products in Cart</h5>
          </div>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getCartTotalPrice(),
      };
      makeBraintreePayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, loading: false, success: response.success });

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData).then((response) => {
            console.log("ORDER CREATED");
            console.log(response);
          });

          cartEmpty(() => {
            console.log("CART CLEANED");
            setReload(!reload);
          });
          console.log("Payment Success.");
        })
        .catch((error) => {
          setInfo({ ...info, loading: false, success: false });
          console.log("Payment Failed.");
        });
    });
  };

  return (
    <div>
      {info.success ? (
        <div>
          Order Successfully Created.
          <Redirect to="/user/dashboard" />
        </div>
      ) : (
        showBraintreeDropIn()
      )}
    </div>
  );
};

export default BraintreePayment;
