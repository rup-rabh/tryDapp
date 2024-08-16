import React,{useEffect} from 'react';
import { useWallet } from '../contexts/WalletContext';

function HistoricalData() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress} = useWallet();

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    console.log(storedWalletAddress);
    
  }, []);
  return (
    <div>
      <h1>Historical Data</h1>
      <p>View historical balances of your tokens.</p>
      {/* Add your historical data logic here */}
    </div>
  );
}

export default HistoricalData;
