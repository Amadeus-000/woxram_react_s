import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA4 from 'react-ga4';
import Login from './routes/login';
import Home from './routes/Home';
import About from './routes/About';
import IosAppInstruction from './routes/IosAppInstruction';
import AndroidAppInstruction from './routes/AndroidAppInstruction';
import Account from './routes/Account';

import { initializeApp } from "firebase/app";

import { Provider } from "react-redux"
import store from './store';


function App() {
  useEffect(() => {
    ReactGA4.initialize('G-12NRKRQWZ4');
    ReactGA4.send('pageview', window.location.pathname + window.location.search);
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyAEkWscBK8zTtQB33rqz4RL_LpMGRxD4b8",
    authDomain: "woxram-af671.firebaseapp.com",
    projectId: "woxram-af671",
    storageBucket: "woxram-af671.appspot.com",
    messagingSenderId: "112206036719",
    appId: "1:112206036719:web:d8d5f7be1a9a91769be51a",
    measurementId: "G-4VVTCGSNG6"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/ios-app-instruction' element={<IosAppInstruction />} />
        <Route path='/android-app-instruction' element={<AndroidAppInstruction />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
