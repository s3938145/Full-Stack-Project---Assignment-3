import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerHeader from "../../../Components/Header/CustomerHeader";

const ProductList = () => {
  const [productCustomer, setProductCustomer] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    axios.get("/productCustomer", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data); // To check the structure of the data
      if (Array.isArray(response.data)) {
        setProductCustomer(response.data); // Adjust according to the actual structure of your data
      } else {
        setProductCustomer([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);
  
  

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    // Declare 'updatedCart' at the top level
    let updatedCart;

    // Check if the product is already in the cart
    const productIndex = cart.findIndex((item) => item._id === product._id);

    if (productIndex !== -1) {
      // Product is already in the cart, update the quantity
      updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Product is not in the cart, add it
      updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Products</h2>
      <ul className="list-group">
      {productCustomer.map((product) => (
          <li key={product._id} className="list-group-item">
            <strong>Name:</strong> {product.name}<br />
            <strong>Price:</strong> ${product.price}<br />
            <strong>Seller:</strong> {product.seller ? product.seller.businessName : "Seller Name Not Available"}<br />
            {/* Add to Cart button */}
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
