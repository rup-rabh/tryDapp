import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ethers } from 'ethers';

function HistoricalData({ tokenAddress }) {
  const { provider } = useWallet();
  const [historicalData, setHistoricalData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  
  // const API_KEY = 'Your-Etherscan-API-Key';
  const API_KEY = 'H7NX5RBB3KW87BR2N5NSPDRWNWH16F7PPE';

  useEffect(() => {
    if (tokenAddress) {
      fetchHistoricalData();
    }
  }, [tokenAddress, startDate, endDate]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log(startTimestamp+"  "+endTimestamp);
      
      
      if (data.status === '1') {
        const filteredData = data.result.filter(tx => {
          const timestamp = parseInt(tx.timeStamp);
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
        setHistoricalData(filteredData);
      } else {
        setHistoricalData([]);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Historical Data for {tokenAddress}</h2>
      <div>
        <label>Select Date Range:</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {historicalData.length > 0 ? (
            <ul>
              {historicalData.map((tx, index) => (
                <li key={index}>
                  <p>Transaction Hash: {tx.hash}</p>
                  <p>From: {tx.from}</p>
                  <p>To: {tx.to}</p>
                  <p>Value: {ethers.formatUnits(tx.value, 18)}</p>
                  <p>Date: {new Date(tx.timeStamp * 1000).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data found for the selected date range.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HistoricalData;
