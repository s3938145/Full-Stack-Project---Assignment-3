// import React, { useEffect, useState } from "react";
// import { getCustomerDetails } from "../../APIs/customerAPI";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CustomerProfile({ customerId }) {
//   const [customerDetails, setCustomerDetails] = useState(null);

//   useEffect(() => {
//   async function fetchCustomerDetails() {
//     if (!customerId) {
//       console.error('customerId is undefined');
//       return;
//     }

//     try {
//       const data = await getCustomerDetails(customerId);
//       setCustomerDetails(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   fetchCustomerDetails();
// }, [customerId]);


//   return (
//     <div className="card">
//       <div className="card-body">
//         {customerDetails ? (
//           <>
//             <p className="card-text">Email: {customerDetails.email}</p>
//             <p className="card-text">Phone: {customerDetails.phone}</p>
//             {/* Add other fields as necessary */}
//           </>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomerProfile;
