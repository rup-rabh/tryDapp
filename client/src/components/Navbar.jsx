import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
function Navbar() {
  const {isWalletConnected} = useWallet();
  return (
    <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist">Watch List</Link></li>
        <li><Link to="/transfer">Token Transfer</Link></li>
        <li><Link to="/allowance">Token Allowance</Link></li>
      </ul>
    </nav>
    
    
    </>
  );
}

export default Navbar;
    