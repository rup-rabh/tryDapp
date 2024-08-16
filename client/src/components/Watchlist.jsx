import React,{useEffect} from 'react';
import { useWallet } from '../contexts/WalletContext';
function WatchList() {
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
      <h1>Watch List</h1>
      <p>Add and track your favorite tokens here.</p>
      {/* Add your watch list logic here */}
    </div>
  );
}

export default WatchList;
