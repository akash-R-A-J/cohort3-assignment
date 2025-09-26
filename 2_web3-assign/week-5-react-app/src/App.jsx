import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

import { Airdrop } from "./Airdrop";

function App() {
  return (
    // below is just the html code which will appear on the webpage
    /* endpoints => rpc url => use alchemy for your own rpc url or use the default devnet provided by the solana */
    // by default rpc url : https://api.devnet.solana.com
    <div id="container">
      <ConnectionProvider
        endpoint={
          // change to devnet if building
          "https://solana-mainnet.g.alchemy.com/v2/kWmBAEH1C7Nbe5LWMf09iNWBWogbREw2"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div id="connect">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <Airdrop />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;

// some more things to add :
// 0. Connect to user wallet and airdrop some sol : DONE
// 1. show balance to the user : DONE
// 2. Ask the user to sign a message
// 3. Sending a txn (transaction)
// 4. Show user token balances
// 5. Let user transfer tokens
