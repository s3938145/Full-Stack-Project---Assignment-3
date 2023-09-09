import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [productCustomer, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to manage the shopping cart

  useEffect(() => {
    // Make a GET request to fetch all products for the customer
    axios.get("/productCustomer")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Load cart from local storage when the component mounts
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
