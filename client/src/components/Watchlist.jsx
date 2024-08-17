import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import Modal from 'react-modal';
import HistoricalData from './HistoricalData';

const ERC20_ABI = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)"
];

function Watchlist() {
  const { provider, walletAddress } = useWallet();
  const [watchlist, setWatchlist] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState(null); // Track selected token for modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const openModal = (token) => {
    setSelectedToken(token); // Set the selected token details
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addTokenToWatchlist = async () => {
    if (provider && tokenAddress) {
      try {
        if (watchlist.findIndex((el) => el.address === tokenAddress) !== -1) {
          console.log("Already added");
          return;
        }
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const symbol = await tokenContract.symbol();
        const balance = await tokenContract.balanceOf(tokenAddress); // Corrected to fetch balance for walletAddress
        const formattedDecimals = 18;
        const formattedBalance = ethers.formatUnits(balance, formattedDecimals);
        console.log(balance);
        
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

  const removeTokenFromWatchlist = (address) => {
    const updatedWatchlist = watchlist.filter((token) => token.address !== address);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className='flex flex-col justify-around items-center'>
      <h1>Watchlist</h1>
      Please provide Standard ERC-20 tokens
      <br />
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter token contract address"
      />
      <button onClick={addTokenToWatchlist}>Add Token</button>

      <ul>
        {watchlist.map((token) => (
          
          
          <li key={token.address} className='m-5 p-5'>
            <p>Token: {token.symbol}</p>
            <p>Balance: {token.balance}</p>
            <button onClick={() => openModal(token)}>View Details</button>
            <button onClick={() => removeTokenFromWatchlist(token.address)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Modal for showing token details */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedToken && selectedToken.address && (
          <div className='text-black bg-black h-full'>
            <h1>{selectedToken.symbol} Details</h1>
            <p>Balance: {selectedToken.balance}</p>
            <p>Decimals: {selectedToken.decimals}</p>
            {/* Render HistoricalData only when selectedToken.address is valid */}
            <div className='bg-black'>
            <HistoricalData tokenAddress={selectedToken.address} />
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Watchlist;
