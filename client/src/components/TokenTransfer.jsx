import React,{useEffect,useState} from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';
function TokenTransfer() {
  const {isWalletConnected,setWalletConnected,walletAddress,setWalletAddress,provider} = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const tokenAddress = 'YOUR_TOKEN_CONTRACT_ADDRESS';

  const getAccountBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  };  
  const handleTransfer = async () => {
    if (!provider) {
      setStatus('Wallet not connected');
      return;
    }

    try {
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
      const tx = await tokenContract.transfer(recipient, ethers.utils.parseUnits(amount, 18)); // Assuming 18 decimals
      setStatus('Transaction sent, waiting for confirmation...');
      await tx.wait(); // Wait for transaction to be mined
      setStatus('Transfer successful');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Transfer Tokens</h2>
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






//i was above return
// useEffect(() => {
//   const storedWalletAddress = localStorage.getItem('walletAddress');
//   if (storedWalletAddress) {
//     setWalletConnected(true);
//     setWalletAddress(storedWalletAddress);
//   }
//   console.log(storedWalletAddress);
//   // console.log("Hello from TT",provider);
  
        //I am a tester
// }, []);