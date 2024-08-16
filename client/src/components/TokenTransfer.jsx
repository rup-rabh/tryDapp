import React,{useEffect} from 'react';
import { useWallet } from '../contexts/WalletContext';

function TokenTransfer() {
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
      <h1>Token Transfer</h1>
      <p>Transfer your tokens to another address.</p>
      {/* Add your token transfer logic here */}
    </div>
  );
}

export default TokenTransfer;
