import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';
import Layout from './Layout';

function Home() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,setProvider,provider} = useWallet();

  const [errorMessage, setErrorMessage] = useState('');
  const [balance,setBalance] = useState("Click above");
  const getAccountBalance = async (provider, address) => {
    const bal = await provider.getBalance(address);
    return ethers.formatEther(bal);
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
          <Layout>
            <h1>Welcome to Crypto-Portfolio App</h1>
            <p>Connected to: {walletAddress}</p>
            <button onClick={()=>getAccountBalance(provider,walletAddress).then((bal)=>setBalance(bal))}>Check Balance</button> 
              <p>Balance : {balance}</p>
            <br /> 
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
          </Layout>

        </div>
      )

      
      }
    </div>
  );
}

export default Home;
