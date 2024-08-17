import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)"
];

function Watchlist() {
  const { provider, walletAddress } = useWallet();
  const [watchlist, setWatchlist] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');

  useEffect(() => {
    // Load watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (storedWatchlist) {
      setWatchlist(storedWatchlist);
    }
  }, []);

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    // Poll every 60 seconds to refresh balances
    const intervalId = setInterval(refreshBalances, 60000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [watchlist]);

  const addTokenToWatchlist = async () => {
    if (provider && tokenAddress) {
      try {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        
        const symbol = await tokenContract.symbol();
        // const decimals = await tokenContract.decimals();
        const balance = await tokenContract.balanceOf(tokenAddress);
        // const formattedDecimals = ethers.formatUnits(decimals);
        const formattedDecimals = 18;
        

        const formattedBalance = ethers.formatUnits(balance, formattedDecimals);
        console.log(formattedBalance);
        
        const tokenData = {
          address: tokenAddress,
          symbol: symbol,
          decimals: formattedDecimals,
          balance: formattedBalance,
        };

        setWatchlist([...watchlist, tokenData]);
        setTokenAddress('');
      } catch (error) {
        console.error('Error adding token:', error);
      }
    }
  };

  const refreshBalances = async () => {
    if (provider && walletAddress) {
      // console.log(watchlist.length);
      
      const updatedWatchlist = await Promise.all(
        
        watchlist.map(async (token) => {
          const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
          const balance = await tokenContract.balanceOf(token.address);
          // console.log(balance);
          const formattedBalance = ethers.formatUnits(balance, token.decimals);
          return {
            ...token,
            balance: formattedBalance,
          };
        })
      );
      setWatchlist(updatedWatchlist);
    }
  };

  const removeTokenFromWatchlist = (address) => {
    const updatedWatchlist = watchlist.filter((token) => token.address !== address);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div>
      <h1>Watchlist</h1>
      
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter token contract address"
      />
      <button onClick={addTokenToWatchlist}>Add Token</button>
      <button onClick={refreshBalances}>Refresh Balances</button>

      <ul>
        {watchlist.map((token) => (
          <li key={token.address}>
            <p>Token: {token.symbol}</p>
            <p>Balance: {token.balance}</p>
            <button onClick={() => removeTokenFromWatchlist(token.address)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;
