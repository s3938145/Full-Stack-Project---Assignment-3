import React, { useState } from "react";
import { updateProductCustomerStatus } from "../../APIs/customerAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderDetail({ order }) {
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null); // Add state for error message

  async function handleStatusChange(productId, newStatus) {
    try {
      const response = await updateProductCustomerStatus(order._id, productId, newStatus);
      
      // Since you're receiving the success message in the response data, use it directly
      setAlert({ type: 'success', message: response.message });
    } catch (error) {
      console.error(error);
      
      let errorMessage = 'Failed to update the status.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    
      setAlert({ type: 'danger', message: errorMessage });
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the time as necessary
  }

  console.log('Order:', order);

  return (
    <div className="card mb-3">
      <div className="card-body">
        {alert && <div className={`alert alert-${alert.type}`} role="alert">{alert.message}</div>}

        {/* Display the error message if it exists */}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <p className="card-text">Order ID: {order._id}</p>
        <p className="card-text">Date Placed: {new Date(order.datePlaced).toLocaleString()}</p>

        {order.product.map((product, index) => (
          <div key={index} className="mb-3">
            <p className="card-text">Product ID: {product._id}</p>
            <p className="card-text">Seller Status: {product.sellerStatus}</p>
            <p className="card-text">Customer Status: {product.customerStatus}</p>
            <p className="card-text">Quantity: {product.quantity}</p>
            <p className="card-text">Price: {product.price}</p>


            <button className="btn btn-success me-2" onClick={() => handleStatusChange(product._id, "Accepted")}>Accept</button>
            <button className="btn btn-danger me-2" onClick={() => handleStatusChange(product._id, "Rejected")}>Reject</button>


          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetail;
