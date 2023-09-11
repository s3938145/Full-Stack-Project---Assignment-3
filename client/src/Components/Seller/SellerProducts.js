import React, { useEffect, useState } from 'react';
import { getProductsSeller } from '../../APIs/productAPI';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the seller's products when the component mounts
    async function fetchProducts() {
      try {
        const data = await getProductsSeller();
        setProducts(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <div className="alert alert-danger" role="alert">Error fetching products: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Your Products</h2>
      <div className="list-group overflow-x-auto">
        {products.map((product) => (
          <div key={product._id} className="list-group-item">
            <dl className="row">
              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{product.name}</dd>
              
              <dt className="col-sm-3">ID</dt>
              <dd className="col-sm-9">{product._id}</dd>

              {product.category && (
                <>
                  <dt className="col-sm-3">Category</dt>
                  <dd className="col-sm-9">{product.category.name}</dd>
                </>
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerProducts;
