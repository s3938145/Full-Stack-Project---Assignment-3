import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from local storage when the component mounts
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
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
    }
  };

  const createOrder = () => {
    // Make a POST request to create an order based on the cart
    axios.post("/placeOrder", { cart })
      .then((response) => {
        // Handle the successful creation of the order here
        console.log("Order created:", response.data);
        // Optionally, you can clear the cart and local storage here
        setCart([]);
        localStorage.removeItem("cart");
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
          <button className="btn btn-primary mt-3" onClick={createOrder}>
            Create Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;  
