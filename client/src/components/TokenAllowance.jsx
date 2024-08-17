import React ,{useEffect}from 'react';
import { useWallet } from '../contexts/WalletContext';

function TokenAllowance() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,provider} = useWallet();

  
  return (
    <div>
      <h1>Token Allowance</h1>
      <p>Check your token allowances for different smart contracts.</p>
      {/* Add your token allowance logic here */}
      no working :P
    </div>
  );
}

export default TokenAllowance;
