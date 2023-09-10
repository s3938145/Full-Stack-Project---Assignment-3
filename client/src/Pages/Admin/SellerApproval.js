import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSellers, updateSeller } from '../../APIs/sellerAPI';
import { Table, Button, Alert } from 'react-bootstrap';
import AdminHeader from '../../Components/Header/AdminHeader';


function SellerApproval() {
  const [sellers, setSellers] = useState([]);
  const [updatedSellers, setUpdatedSellers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await getSellers();
        setSellers(data);
      } catch (error) {
        console.error('There was an error fetching the sellers!', error);
        setError('There was an error fetching the sellers!');
      }
    };
    
    fetchSellers();
  }, []);

  const updateStatus = (email, status) => {
    setUpdatedSellers((prev) => [...prev.filter((seller) => seller.email !== email), { email, status }]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      for (let seller of updatedSellers) {
        await updateSeller({ status: seller.status }, seller.email);
      }
      setSuccess('All changes saved successfully');
      const refreshedSellers = await getSellers();
      setSellers(refreshedSellers);
      setUpdatedSellers([]);
    } catch (error) {
      console.error('There was an error saving the changes!', error);
      setError('There was an error saving the changes!');
    }
  };

  return (
    <>
    <AdminHeader />
    <div className="container">
      <h1 className="my-4">Seller Approval</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Current Status</th>
            <th>Pending Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => {
            const updatedSeller = updatedSellers.find((uSeller) => uSeller.email === seller.email);
            return (
              <tr key={seller._id}>
                <td>{seller.businessName}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>{seller.status}</td>
                <td>{updatedSeller ? updatedSeller.status : '-'}</td>
                <td>
                  <Button variant="success" onClick={() => updateStatus(seller.email, 'Approved')}>
                    Approve
                  </Button>
                  <Button variant="danger" className="ms-2" onClick={() => updateStatus(seller.email, 'Rejected')}>
                    Reject
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSave}>
        Save All Changes
      </Button>
    </div>
    </>
  );
}



export default SellerApproval;
