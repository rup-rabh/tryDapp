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
  const [tokenDetails, setTokenDetails] = useState({});

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
//0x6B175474E89094C44Da98b954EedeAC495271d0F
  const addTokenToWatchlist = async () => {
    if (provider && tokenAddress) {
      try {


        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        
        const symbol = await tokenContract.symbol();
        
        const decimals = await tokenContract.decimals();
        const balance = await tokenContract.balanceOf(tokenAddress);
        console.log(typeof decimals);
        
        const tokenData = {
          address: tokenAddress,
          symbol: symbol,
          decimals: ethers.formatUnits(decimals),
          balance: ethers.formatUnits(balance),
        };
        
        console.log(balance);
        setWatchlist([...watchlist, tokenData]);
        setTokenAddress('');
      } catch (error) {
        console.error('Error adding token:', error);
      }
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
