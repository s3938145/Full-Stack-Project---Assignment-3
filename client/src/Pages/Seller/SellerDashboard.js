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
      <div className="row gx-5"> {/* Added gutter to give space between the columns */}
        <div className="col-md-4 mb-4">
          <div className="card h-100"> {/* h-100 to make the card height 100% */}
            <div className="card-body d-flex flex-column"> {/* d-flex and flex-column to enable flex properties */}
              <SalesStatistics />
              <div className="mt-auto"> {/* mt-auto to push the content to the top */}
                {/* Optional: Add content here */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <SellerOrders />
              <div className="mt-auto">
                {/* Optional: Add content here */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <UpdateProductStatus />
              <div className="mt-auto">
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
