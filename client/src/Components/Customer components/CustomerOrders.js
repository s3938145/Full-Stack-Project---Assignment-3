import React, { useEffect, useState } from "react";
import { getCustomerOrders } from "../../APIs/customerAPI";
import OrderDetail from "./OrderDetail"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getCustomerOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div>
      {orders ? (
        orders.map((order) => (
          <OrderDetail key={order._id} order={order} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OrderList;
