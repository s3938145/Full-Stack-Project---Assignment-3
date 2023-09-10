import React from 'react';
import CustomerProfile from '../../Components/Customer components/CustomerProfile';
import OrderList from '../../Components/Customer components/CustomerOrders';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerHeader from '../../Components/Header/CustomerHeader';

export default function UserProfile() {
  const { customerId } = useParams();
  console.log("MainComponent customerId:", customerId); 

  return (
    <>
    <CustomerHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <CustomerProfile customerId={customerId} />
          </div>
          <div className="col-md-6">
            <OrderList customerId={customerId} />
          </div>
        </div>
      </div>
    </>
  );
}

