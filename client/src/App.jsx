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

function App() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,loading,setLoading} = useWallet();



  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
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
          <Route path="/" element={<Home />} />
          {
              isWalletConnected &&(
                <>
                  <Route path="/watchlist" element={<Layout ><WatchList/></Layout>} />
                  <Route path="/historical-data" element={<Layout ><HistoricalData/></Layout> } />
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
