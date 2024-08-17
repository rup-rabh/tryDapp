import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import Navbar from './Navbar';
import { ethers } from 'ethers';
//https://mainnet.infura.io/v3/3f65525bb69e48ee9ac83ceadfb58c69
//3f65525bb69e48ee9ac83ceadfb58c69
const network = "sepolia";
const key = "3f65525bb69e48ee9ac83ceadfb58c69";
const infLink = `https://${network}.infura.io/v3/${key}`;
function Home() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,setProvider,provider} = useWallet();

  const [errorMessage, setErrorMessage] = useState('');

  const getAccountBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  };
  
  // Check if wallet is already connected (from localStorage)
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    console.log(storedWalletAddress);
    //I run at t = 0
  }, []);

  // Connect to MetaMask wallet and save to localStorage
  const connectWallet = async () => {
      
      try {
        
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum); //providers changed since last time
          const accounts = await provider.send('eth_requestAccounts', []);
          const address = accounts[0];

          setWalletConnected(true);
          setWalletAddress(address);
          setProvider(provider);
          
          console.log("iswalConntect?",isWalletConnected);
          localStorage.setItem('walletAddress', address); // Persist wallet connection
        } else {
          setErrorMessage('MetaMask is not installed!');
        }
    } catch (error) {
      console.log(error);
      
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

          <button onClick={()=>getAccountBalance(provider,walletAddress).then((bal)=>console.log(bal))}>Check Balance in logs</button> 
          <br /> 
          <button onClick={disconnectWallet}>Disconnect Wallet</button>

        </div>
      )

      
      }
    </div>
  );
}

export default Home;
