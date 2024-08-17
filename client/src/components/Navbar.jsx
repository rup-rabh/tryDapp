import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import logo from '../assets/logo.png'
function Navbar() {
  const {isWalletConnected} = useWallet();
  return (
    <>
    <nav className='w-full flex justify-around items-center text-white p-4 bg-gradient-to-r from-black to-blue-900'>
      <div className=''>
        <img src={logo} alt="logo" className='w-40' />
      </div>
      <ul className='flex'>
        <li className='mx-4 cursor-pointer'><Link to="/">Home</Link></li>
        <li className='mx-4 cursor-pointer'><Link to="/watchlist">Watch List</Link></li>
        <li className='mx-4 cursor-pointer'><Link to="/transfer">Token Transfer</Link></li>
        <li className='mx-4 cursor-pointer'><Link to="/allowance">Token Allowance</Link></li>
      </ul>
    </nav>
    
    
    </>
  );
}

export default Navbar;
    