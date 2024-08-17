import React,{useEffect,useState} from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';

const erc20Abi = [
  "function transfer(address to, uint256 amount) returns (bool)"
];

function TokenTransfer() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,provider} = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  
  const getAccountBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  };  

  const handleTransfer = async () => {
    if (!provider || !walletAddress) {
      setStatus('Please connect your wallet');
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      // const signer = await provider.getSigner(accounts[0]);
      const signer = await provider.getSigner(walletAddress);
      const tokenContract = new ethers.Contract(walletAddress, erc20Abi, signer);
      const tx = await tokenContract.transfer(recipient, ethers.parseUnits(amount, 18)); 
      setStatus('Transaction sent, waiting for confirmation...');
      await tx.wait(); 
      setStatus('Transfer successful');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className=''>
      <h1>Transfer Tokens</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
      
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
      <p>{status}</p>
    </div>
  );
}

export default TokenTransfer;



