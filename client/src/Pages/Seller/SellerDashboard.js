import { getSaleStatistics } from '../../APIs/sellerAPI';
import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

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
      <Table>
        <thead>
          <tr>
            <th> New Order(s) </th>
            <th> Shipped Order(s) </th>
            <th> Canceled Order(s) </th>
            <th> Accepted Order(s) </th>
            <th> Rejected Order(s) </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {data.statistics.new} </td>
            <td> {data.statistics.shipped} </td>
            <td> {data.statistics.canceled} </td>
            <td> {data.statistics.accepted} </td>
            <td> {data.statistics.rejected} </td>
          </tr>
        </tbody>
      </Table>
  );
}

