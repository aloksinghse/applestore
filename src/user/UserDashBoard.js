import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getOrders } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const userId = isAuthenticated() ? isAuthenticated().user._id : null;
  const token = isAuthenticated() ? isAuthenticated().token : null;

  const preload = () => {
    getOrders(userId, token)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
          setError(response.error);
        } else {
          setOrders(response);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="UserDashboard"
      description="Check Order Status here."
      className="container"
    >
      <h2>
        Placed Orders <span className="badge badge-info">{orders.length}</span>
      </h2>
      <div>
        {orders.map((order) => {
          return (
            <div key={order._id} className="bg-white p-3 mb-3">
              <div> Status : {order.status} </div>
              <div> Last Update : {order.updated_at} </div>
              <div> Transaction Id : {order.transaction_id} </div>
              <hr />
              {order.products.map((product) => {
                return (
                  <div key={product._id}>
                    <p>Product Name :{product.name}</p>
                    <p>Quantity : {product.count}</p>
                    <p>Price : {product.price}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default UserDashboard;
