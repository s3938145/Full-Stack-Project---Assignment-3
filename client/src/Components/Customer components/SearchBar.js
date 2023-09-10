import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/searchProduct?query=${query}`);
  
      if(response.data.length > 0) {
        navigate('/customer/productPage', { state: { products: response.data } });
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setShowAlert(true);  // Show alert on error
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    }
  };
  

  return (
    <div className="d-flex justify-content-center my-3">
      {showAlert && (
        <div className="alert alert-warning" role="alert">
          No matches found for your search.
        </div>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a product..."
        className="form-control w-50"
      />
      <button onClick={handleSearch} className="btn btn-primary ms-2">Search</button>
    </div>
  );
}

export default SearchBar;
