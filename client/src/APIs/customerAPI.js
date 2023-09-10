import axios from "axios";
import jwt_decode from "jwt-decode";

export async function getCustomerOrders() {
  try {
    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token not found');
    const { id: customerId } = jwt_decode(token);
    const res = await axios.get(`/customerOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    // Handle error appropriately in your UI
  }
}

export async function placeOrder(authToken, cart) {
  try {
    const res = await axios.post('/placeOrder', cart, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error placing order:', error);
    // Handle error appropriately in your UI
  }
}

export async function updateProductCustomerStatus(orderId, productId, customerStatus) {
  try {
    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token not found');
    const res = await axios.patch(`/updateProductCustomerStatus/${orderId}/${productId}/${customerStatus}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating product customer status:', error);
    console.error('Error details:', error.response.data);
    // Handle error appropriately in your UI
}

}

export async function getCustomerDetails() {
  try {
    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token not found');
    const { id: customerId } = jwt_decode(token);
    const res = await axios.get(`/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching customer details:', error);
    // Handle error appropriately in your UI
  }
}
