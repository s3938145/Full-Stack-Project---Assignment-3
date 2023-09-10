import { getSaleStatistics } from '../../../APIs/sellerAPI';
import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export async function loadStatistics() {
  const statistics = await getSaleStatistics();
  return statistics;
}

export default function SellerDashboard() {
  const [data, setData] = useState(null);
  const stats = useLoaderData();

  useEffect(() => {
    setData(stats);  // Assuming stats is already an object, not a JSON string
  }, [stats]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>New: {data.statistics.new}</div>
      <div>Shipped: {data.statistics.shipped}</div>
      <div>Canceled: {data.statistics.canceled}</div>
      <div>Accepted: {data.statistics.accepted}</div>
      <div>Rejected: {data.statistics.rejected}</div>
    </div>
  );
}

