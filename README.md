# tryDapp
tryingDapp

Tried making a dapp wallet
with React ,ethersJs
#######################################################
**Installation:**
  -Clone it
  -get Your etherscan api , put it in 
  scr/HistoricalData.jsx , line 15 , replace it with your key (this key wont work)
  -cd client
  -npm install
  -npm run dev
  **Hosted**
  
**Some notes:**
  Server folder is empty
  tried tailwind css
  used certain frameworks and libraries mentioned in package.json
  completed: 
    WatchList.jsx
    HistoricalData.jsx
    TokenTransfer.jsx
  incomplete:
    TokenAllowance
**Project structure**
  src/
    components/
      Home.jsx
      WatchList.jsx
      HistoricalData.jsx
      TokenTransfer.jsx
      TokenAllowance.jsx
      Navbar.jsx
      Layout.jsx
    contexts/
      WalletContexts.js
    App.jsx
    index.jsx

-Defined routes at App.jsx
-defined Layout component to have similar structure for all route pages
    Layout = Navbar + content(children)
-default route at Home.jsx where wallet connection takes places
-used etherscan api to fetch Historical Data



