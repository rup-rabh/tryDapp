import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WatchList from './components/Watchlist';
import HistoricalData from './components/HistoricalData';
import TokenTransfer from './components/TokenTransfer';
import TokenAllowance from './components/TokenAllowance';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/historical-data" element={<HistoricalData />} />
          <Route path="/transfer" element={<TokenTransfer />} />
          <Route path="/allowance" element={<TokenAllowance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
