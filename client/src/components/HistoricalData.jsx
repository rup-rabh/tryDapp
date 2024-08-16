import React,{useEffect} from 'react';
import { useWallet } from '../contexts/WalletContext';

function HistoricalData() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,provider} = useWallet();
  console.log(walletAddress);
  
  return (
    <div>
      <h1>Historical Data</h1>
      <p>View historical balances of your tokens.</p>
      {/* Add your historical data logic here */}
    </div>
  );
}

export default HistoricalData;
