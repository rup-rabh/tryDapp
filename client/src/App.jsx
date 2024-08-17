import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WatchList from './components/Watchlist';
import HistoricalData from './components/HistoricalData';
import TokenTransfer from './components/TokenTransfer';
import TokenAllowance from './components/TokenAllowance';
import Layout from './components/Layout';
// import Navbar from './components/Navbar';
import { useWallet } from './contexts/WalletContext';
import { ethers } from 'ethers';

function App() {
  //wallet context
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,loading,setLoading,setProvider} = useWallet();
  
  useEffect(() => { //wallet connection at every reload
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      console.log("I ran first");
      
      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(tempProvider);
      setWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    setLoading(false); // Indicate that the wallet connection check is complete
  }, []);
  if(loading){
    return <div>
      Loading....
    </div>
  }

  return (
    <>
        
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} /> {/* Entry at home */}
          {
              isWalletConnected &&(  
                <>
                  <Route path="/watchlist" element={<Layout ><WatchList/></Layout>} />
                  <Route path="/transfer" element={<Layout ><TokenTransfer/></Layout>} />
                  <Route path="/allowance" element={<Layout ><TokenAllowance/></Layout>} />
                </>
              )
          }
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
