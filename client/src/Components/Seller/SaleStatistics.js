import React, { useState, useEffect } from 'react';
import { getSaleStatistics } from '../../APIs/sellerAPI';

function SalesStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getSaleStatistics();
        setStatistics(stats);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error loading sales statistics.</div>;
  }

  if (!statistics) {
    return <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>;
  }

  return (
    <div>
      <h2 className="card-title">Sales Statistics</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(statistics.statistics).map(([key, value], index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          };  

export default SalesStatistics;
