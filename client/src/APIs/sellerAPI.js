import axios from "axios"

// Get All Sellers
export async function getSellers() {
  try {
    const res = await axios.get('/sellers');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching sellers:', error);
  }
}

// Update the status of a seller
export async function updateSeller(newData, email) {
  try {
    const res = await axios.patch(`/sellers/${email}`, newData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating seller:', error);
  }
}

// Get Sales Statistics by Seller ID
export async function getSaleStatistics() {
  try {
    const res = await axios.get('/sales-statistics');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching sales statistics:', error);
  }
}

// Get orders related to the seller
export async function getSellerOrders() {
  try {
    const res = await axios.get('/sellerOrders');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching seller orders:', error);
  }
}

// Update the product status by order ID and product ID
export async function updateProductStatus(orderId, productId, sellerStatus) {
  try {
    const res = await axios.patch(`/updateProductStatus/${orderId}/${productId}`, { sellerStatus });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating product status:', error);
  }
}
