// src/contexts/WalletContext.jsx
import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading , setLoading] = useState(true);
  const toHost ={
    isWalletConnected:isWalletConnected,
    setWalletConnected:setWalletConnected,
    walletAddress:walletAddress,
    setWalletAddress:setWalletAddress,
    loading:loading,
    setLoading:setLoading,
  }

  return (
    <WalletContext.Provider value={toHost}>
      {children}
    </WalletContext.Provider>
  );
};
