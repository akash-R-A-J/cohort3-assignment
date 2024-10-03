// components in react are very similar to creating your own HTML tags

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import "./Airdrop.css";

// The useWallet `Hook` `provides` the wallet variable inside the Airdrop `Component`.
// because I wrapped the Airdrop component inside the WalletProvider
export function Airdrop() {
  // hooks in react
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setSolBalance] = useState(0);
  const [amount, setAmount] = useState(""); // State for input amount

  // define the function `sendAirdropToUser` inside the component body
  async function sendAirdropToUser() {
    
    if (!wallet.publicKey) { // wallet must be connected
      alert("Wallet not connected.");
      return;
    }

    const amountInLamports = parseFloat(amount); // input should be valid
    if (isNaN(amountInLamports) || amountInLamports <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    await connection.requestAirdrop(wallet.publicKey, amount * 1e9); // parameters: publicKey, lamports
    alert("Airdropped sol : " + amount);
    const newBalance = await connection.getBalance(wallet.publicKey);
    setSolBalance(newBalance / 1e9); // Update the balance in SOL
  }

  // used to display the balance of the user
  useEffect(() => {
    async function fetchBalance() {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setSolBalance(balance / 1e9); // Convert lamports to SOL
      } else {
        console.log("Wallet not connected.");
        setSolBalance(0); // Reset balance if the wallet is disconnected
      }
    }

    fetchBalance();
  }, [wallet.publicKey, connection]); // This will re-run if the wallet changes

  return (
    <div id="container">
      <div id="amount">
        <input
          type="text"
          id="airdrop"
          className="common"
          placeholder="Amount"
          value={amount} // *Bind input value to state
          onChange={(e) => setAmount(e.target.value)} // *Update state on input change
        />
        <button id="button" className="common" onClick={sendAirdropToUser}>
          Send Airdrop
        </button>
      </div>

      <div id="publickey" className="common">
        Balance: {balance} SOL
        <br /> <br />
        Public Key:{" "}
        {wallet.publicKey ? wallet.publicKey.toBase58() : "Not connected."}
      </div>
    </div>
  );
}
