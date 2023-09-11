import React from 'react';
import SalesStatistics from '../../Components/Seller/SaleStatistics';
import SellerOrders from '../../Components/Seller/SellerOrder';
import UpdateProductStatus from '../../Components/Seller/UpdateProductStatus';
import SellerHeader from '../../Components/Header/SellerHeader';


function SellerDashboard() {
  return (
    <>
      <SellerHeader />
      <div className="container mt-4">
        <h1 className="text-center mb-5">Seller Dashboard</h1>
        
        <div className="row gx-5"> {/* This row contains your first three components */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <SalesStatistics />
                <div className="mt-auto"> {/* Optional content area */}
                  {/* Optional: Add content here */}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <UpdateProductStatus />
                <div className="mt-auto"> {/* Optional content area */}
                  {/* Optional: Add content here */}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                {/* This space is available for any additional component or content */}
                <div className="mt-auto"> {/* Optional content area */}
                  {/* Optional: Add content here */}
                </div>
              </div>
            </div>
          </div>
        </div> {/* End of the row containing the first three components */}

        {/* New row for the SellerOrders component to take full width */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <SellerOrders />
                <div className="mt-auto"> {/* Optional content area */}
                  {/* Optional: Add content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerDashboard;
