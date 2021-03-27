import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getCartTotalPrice, loadCart } from "./helper/cartHelper";
import StripePayments from "./paymentGateways/StripePayments";
import BraintreePayment from "./BraintreePayment";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1>Products in Cart</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-md-4 col-sm-6 p-0">
                <div className="m-1 shadow rounded">
                  <Card
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const loadCheckoutOld = () => {
    return (
      <div>
        <div className="d-flex py-2">
          <div className="w-50">
            <h4>Total Price :</h4>
          </div>
          <div className="w-50 text-right">
            <h4>$ {getCartTotalPrice()}</h4>
          </div>
        </div>
        <ul className="nav nav-tabs">
          <li className="w-50 active nav-item">
            <a
              data-toggle="tab"
              href="#home"
              className="active text-center nav-link  btn btn-outline-info "
            >
              Stripe
            </a>
          </li>
          <li className="w-50 nav-item">
            <a
              data-toggle="tab"
              className="text-center nav-link  btn btn-outline-info"
              href="#paypal"
            >
              PayPal
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="home" className="tab-pane fade in active">
            <StripePayments
              products={products}
              setReload={setReload}
              reload={reload}
            />
          </div>
          <div id="paypal" className="tab-pane fade">
            <BraintreePayment
              products={products}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </div>
      </div>
    );
  };

  const loadCheckout = (products) => {
    return (
      <div>
        <div className="d-flex py-2">
          <div className="w-75">
            <h4>Total Price :</h4>
          </div>
          <div className="w-25 text-right">
            <h4>$ {getCartTotalPrice()}</h4>
          </div>
        </div>
        <div>
          <BraintreePayment
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base
      title="Product Cart"
      className="container"
      description="All Selected Items for purchase"
    >
      <div className="row">
        <div className="col-md-8">
          {products.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            loadAllProducts(products)
          )}
        </div>
        <div className="col-md-4">{loadCheckout(products)}</div>
      </div>
    </Base>
  );
}
