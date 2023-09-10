import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    // Load cart from local storage when the component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // Calculate the initial total price
    const initialTotalPrice = calculateTotalPrice();
    setTotalPrice(initialTotalPrice);

    // Create a set to store unique seller IDs from the cart
    const uniqueSellerIds = new Set();

    // Extract unique seller IDs from the cart items
    savedCart.forEach((item) => {
      uniqueSellerIds.add(item.seller);
    });

    // Convert the set of seller IDs back to an array
    const sellerIds = Array.from(uniqueSellerIds);

    // Fetch seller names for the retrieved seller IDs
    const fetchSellerNames = async () => {
      const sellerNames = await Promise.all(
        sellerIds.map(async (sellerId) => {
          try {
            const response = await axios.get(`/getSellerName/${sellerId}`);
            return response.data.name; // Assuming the seller name is in the response
          } catch (error) {
            console.error("Error fetching seller name:", error);
            return "Unknown Seller"; // Default to "Unknown Seller" if there's an error
          }
        })
      );

      // Create a mapping of seller IDs to seller names
      const sellerNameMap = {};
      sellerIds.forEach((id, index) => {
        sellerNameMap[id] = sellerNames[index];
      });

      // Update the cart items with seller names
      const cartWithSellerNames = savedCart.map((item) => ({
        ...item,
        sellerName: sellerNameMap[item.seller],
      }));

      // Set the updated cart state
      setCart(cartWithSellerNames);
    };

    // Call the function to fetch seller names
    fetchSellerNames();
  }, []);

  const removeFromCart = (productId) => {
    // Find the index of the item to remove based on the productId
    const indexToRemove = cart.findIndex((item) => item.productId === productId);

    if (indexToRemove !== -1) {
      // Use splice() to remove the item from the cart
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);

      // Update local storage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Recalculate and update the total price
      const updatedTotalPrice = calculateTotalPrice();
      setTotalPrice(updatedTotalPrice);
    }
  };

  const createOrder = () => {
    // Log the token for debugging
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  
    // Make a POST request to create an order based on the cart
    axios
      .post("/placeOrder", { cart }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // ...
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  
  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.productId} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Name:</strong> {item.name}<br />
                    <strong>Price:</strong> ${item.price}<br />
                    <strong>Quantity:</strong> {item.quantity}<br />
                    {/* Display the seller's name */}
                    <strong>Seller:</strong> {item.sellerName}<br />
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
            <button className="btn btn-primary mt-3" onClick={createOrder}>
              Create Order
            </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
