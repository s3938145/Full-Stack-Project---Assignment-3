import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/searchProduct?query=${query}`);
      
      navigate('/customer/productPage', { state: { products: response.data } });
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div className="d-flex justify-content-center my-3">
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
