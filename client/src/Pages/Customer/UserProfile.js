import React from 'react';
import CustomerProfile from '../../Components/Customer components/CustomerProfile';
import OrderList from '../../Components/Customer components/CustomerOrders';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerHeader from '../../Components/Header/CustomerHeader';

export default function UserProfile() {
  console.log("UserProfile component loaded");

  return (
    <>
      <CustomerHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <CustomerProfile />
          </div>
          <div className="col-md-6">
            <OrderList />
          </div>
        </div>
      </div>
    </>
  );
}
