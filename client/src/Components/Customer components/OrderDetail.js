// import React, { useState } from "react";
// import { updateProductCustomerStatus } from "../../APIs/customerAPI";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function OrderDetail({ order }) {
//   const [alert, setAlert] = useState(null);
//   const [error, setError] = useState(null); // Add state for error message

//   async function handleStatusChange(productId, newStatus) {
//     try {
//       const response = await updateProductCustomerStatus(order._id, productId, newStatus);
      
//       if(response.status === 200){
//         setAlert({ type: 'success', message: 'Status updated successfully.' });
//       } else {
//         setAlert({ type: 'danger', message: response.data.message });
//       }
      
  
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000); // Adjust the time as necessary
//     } catch (error) {
//       console.error(error);
//       setAlert({ type: 'danger', message: 'Failed to update the status.' });
//     }
//   }
  
  
  

//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         {alert && <div className={`alert alert-${alert.type}`} role="alert">{alert.message}</div>}
        
//         {/* Display the error message if it exists */}
//         {error && <div className="alert alert-danger" role="alert">{error}</div>}
        
//         <p className="card-text">Order ID: {order._id}</p>
//         <p className="card-text">Date Placed: {new Date(order.datePlaced).toLocaleString()}</p>
        
//         {order.product.map((product) => (
//           <div key={product._id} className="mb-3">
//             <p className="card-text">Product Name: {product.productId.name}</p>
//             <p className="card-text">Seller Status: {product.sellerStatus}</p>
//             <p className="card-text">Customer Status: {product.customerStatus}</p>
            
            
//             <button className="btn btn-success me-2" onClick={() => handleStatusChange(product.productId._id, "Accepted")}>Accept</button>
//             <button className="btn btn-danger me-2" onClick={() => handleStatusChange(product.productId._id, "Rejected")}>Reject</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default OrderDetail;
