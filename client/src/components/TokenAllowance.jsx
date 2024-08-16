import React ,{useEffect}from 'react';
import { useWallet } from '../contexts/WalletContext';

function TokenAllowance() {
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
      <h1>Token Allowance</h1>
      <p>Check your token allowances for different smart contracts.</p>
      {/* Add your token allowance logic here */}
      
    </div>
  );
}

export default TokenAllowance;
