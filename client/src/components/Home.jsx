import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import Navbar from './Navbar';
import { ethers } from 'ethers';

function Home() {
  // const [walletConnected, setWalletConnected] = useState(false);
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress} = useWallet();
  
  // const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if wallet is already connected (from localStorage)
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    console.log(storedWalletAddress);
    
  }, []);

  // Connect to MetaMask wallet and save to localStorage
  const connectWallet = async () => {
    
    try {
      
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum); // Changed according to the latest ethers.js version
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletConnected(true);
        setWalletAddress(address);
        console.log("iswalConntect",isWalletConnected);
        localStorage.setItem('walletAddress', address); // Persist wallet connection
      } else {
        setErrorMessage('MetaMask is not installed!');
      }
    } catch (error) {
      setErrorMessage('An error occurred while connecting to wallet.');
    }
  };

  // Disconnect Wallet and clear localStorage
  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    localStorage.removeItem('walletAddress');
  };

  return (
    <div>
      
      {!isWalletConnected ? (
        <div>
          <h1>Welcome to Crypto-Portfolio App</h1>
          <p>Connect your MetaMask wallet to continue.</p>
          <button onClick={connectWallet}>Connect Wallet</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <Navbar/>
          <h1>Welcome to Crypto-Portfolio App</h1>
          <p>Connected to: {walletAddress}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>

        </div>
      )

      
      }
    </div>
  );
}

export default Home;
