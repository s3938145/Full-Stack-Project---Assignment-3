import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerHeader from "../../../Components/Header/CustomerHeader";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); 

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      if (typeof item.price === 'number' && typeof item.quantity === 'number') {
        total += item.price * item.quantity;
      }
    });
    return total;
  };

  useEffect(() => {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
    }
    setCart(savedCart);
    
    const fetchSellerNames = async () => {
      const uniqueSellerIds = new Set(savedCart.map(item => item.seller));
      const sellerIds = Array.from(uniqueSellerIds);
      const sellerNames = await Promise.all(
        sellerIds.map(async (sellerId) => {
          try {
            const response = await axios.get(`/getSellerName/${sellerId}`);
            return response.data.name;
          } catch (error) {
            console.error("Error fetching seller name:", error);
            return "Unknown Seller"; 
          }
        })
      );

      const sellerNameMap = Object.fromEntries(sellerIds.map((id, index) => [id, sellerNames[index]]));
      const cartWithSellerNames = savedCart.map((item) => ({
        ...item,
        sellerName: sellerNameMap[item.seller],
      }));
      
      setCart(cartWithSellerNames);
    };

    fetchSellerNames();
  }, []);

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const removeFromCart = (productId) => {
    const indexToRemove = cart.findIndex((item) => item.productId === productId);
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const createOrder = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  
    const orderDetails = {
      cart,
      totalPrice,  // Including the totalPrice in the request body
    };
  
    axios
      .post("/placeOrder", orderDetails, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        alert('Order created successfully!');
        setCart([]); 
        localStorage.removeItem('cart'); 
        setTotalPrice(0);  // Resetting the totalPrice to 0 after the order is placed
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  
  
  return (
    <>
    <CustomerHeader />
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
    </>
  );
};

export default CartPage;
