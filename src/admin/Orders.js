import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "../core/helper/orderHelper";

const ManageOrders = () => {
  const userId = isAuthenticated() ? isAuthenticated()._id : null;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState([]);

  const preload = () => {
    getOrders(userId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Manage Orders">
      {orders.length === 0 ? (
        <div className="text-center">No Orders Found</div>
      ) : (
        orders.map((order, index) => {
          return (
            <div>
              {index}.
              <br />
              {order.transaction_id}
              <br />
              {order.user.name}
            </div>
          );
        })
      )}
    </Base>
  );
};

export default ManageOrders;
