import React, { useState, useEffect } from 'react';
import { getSellerOrders } from '../../APIs/sellerAPI';

function SellerOrders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const orderData = await getSellerOrders();
        setOrders(orderData);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error loading seller orders.</div>;
  }

  if (!orders) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div>
      <h2 className="card-title">Seller Orders</h2>
      <div style={{ maxHeight: '500px', overflowY: 'scroll', margin: '0 auto', width: '100%' }}>
        <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date Placed</th>
              <th>Total Price</th>
              <th>Customer ID</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.datePlaced).toLocaleString()}</td>
                <td>{order.totalPrice ? order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'VND' }) : 'N/A'}</td>
                <td>{order.customer}</td>
                <td>
                  {order.product.map((product, index) => (
                    <div key={index}>
                      <strong>Product ID:</strong> {product._id} <br />
                      <strong>Price:</strong> {product.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })} <br />
                      <strong>Quantity:</strong> {product.quantity} <br />
                      <strong>Seller Status:</strong> {product.sellerStatus} <br />
                      <strong>Customer Status:</strong> {product.customerStatus} <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerOrders;
