import axios from "axios";

export async function getCustomerOrders(customerId) {
  try {
    const res = await axios.get(`/customerOrders/${customerId}`);
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
    const res = await axios.patch(`/updateProductCustomerStatus/${orderId}/${productId}/${customerStatus}`);
    return res.data;
  } catch (error) {
    console.error('Error updating product customer status:', error);
    // Handle error appropriately in your UI
  }
}

export async function getCustomerDetails(customerId) {
  try {
    const res = await axios.get(`/customer/${customerId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching customer details:', error);
    // Handle error appropriately in your UI
  }
}
