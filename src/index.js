import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider appId="2J0ZcuMBOfzPkvE8bJK04YMxUTLW5hRouhkkdI4o"
      serverUrl="https://hebew8zipy7g.usemoralis.com:2053/server">
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
