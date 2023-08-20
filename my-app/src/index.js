import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Contract from "./pages/Contract.js"
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout.js"


export default function Main() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <React.StrictMode>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={< Layout/>}>
                  <Route index element={<App />} />
                  <Route path='/contract' element={<Contract />} />
                </Route>
              </Routes>
            </BrowserRouter>
        </React.StrictMode>
      </NotificationProvider>
    </MoralisProvider>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
