import React, { useState } from 'react';
import { updateProductStatus } from '../../APIs/sellerAPI'; 

function UpdateProductStatus() {
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [sellerStatus, setSellerStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await updateProductStatus(orderId, productId, sellerStatus);
      setMessage('Product status updated successfully');
      console.log(response);
    } catch (error) {
      setMessage('Error updating product status');
    }
  };

  return (
    <div>
      <h2 className="card-title">Update Product Status</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <select className="form-control" value={sellerStatus} onChange={(e) => setSellerStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Update Status</button>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default UpdateProductStatus;
