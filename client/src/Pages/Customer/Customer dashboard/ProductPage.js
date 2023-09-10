import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerHeader from "../../../Components/Header/CustomerHeader";

function ProductPage() {
  const location = useLocation();
  const products = location.state?.products || [];
  
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let updatedCart;

    const productIndex = cart.findIndex((item) => item._id === product._id);

    if (productIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <CustomerHeader />
      {products.length > 0 ? (
        <div className="container mt-5">
          <h2>Search Results:</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li key={product._id} className="list-group-item">
                <strong>Name:</strong> {product.name}<br />
                <strong>Price:</strong> ${product.price}<br />
                <strong>Seller:</strong> {product.seller ? product.seller.businessName : "Seller Name Not Available"}<br />
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>No products found</h2>
      )}
    </div>
  );
}

export default ProductPage;
