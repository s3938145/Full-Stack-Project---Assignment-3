// import React from "react";

// const OrderSummaryPage = ({ order, customer }) => {
//   return (
//     <div className="container mt-5">
//       <h2>Order Summary</h2>
//       <p>Order ID: {order._id.$oid}</p>
//       <p>Customer Name: {customer.name}</p>
//       <p>Customer Address: {customer.address}</p>
//       <p>Customer Phone: {customer.phone}</p>
//       <p>Date Placed: {new Date(order.datePlaced.$date).toLocaleString()}</p>

//       <h3>Order Details:</h3>
//       <ul className="list-group">
//         {order.product.map((product) => (
//           <li key={product._id.$oid} className="list-group-item">
//             <strong>Quantity:</strong> {product.quantity}<br />
//             <strong>Customer Status:</strong> {product.customerStatus}<br />
//             <strong>Seller Status:</strong> {product.sellerStatus}<br />
//             {/* Add other product details as needed */}
//           </li>
//         ))}
//       </ul>

//       <p>
//         <strong>Total Price:</strong> ${order.totalPrice || 0}
//       </p>
//     </div>
//   );
// };

// export default OrderSummaryPage;
