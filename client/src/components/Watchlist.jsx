import React,{useEffect} from 'react';
import { useWallet } from '../contexts/WalletContext';
function WatchList() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,provider} = useWallet();

  return (
    <div>
      <h1>Watch List</h1>
      <p>Add and track your favorite tokens here.</p>
      {/* Add your watch list logic here */}
    </div>
  );
}

export default WatchList;
