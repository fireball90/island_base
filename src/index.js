import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login';
import Expedition from './pages/expedition/Expedition';
import Management from './pages/management/Management';
import Market from './pages/market/Market';
import Myprofile from './pages/myprofile/Myprofile';
import Notifications from './pages/notifications/Notifications';
import Pwreset from './pages/pwreset/Pwreset';
import Register from './pages/register/Register';
import Shop from './pages/shop/Shop';
import Tutorial from './pages/tutorial/Tutorial';
import War from './pages/war/War';
import Navigation from './components/navbar/Navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<Management />} />
          <Route path="management" element={<Management />} />
          <Route path="war" element={<War />} />
          <Route path="expedition" element={<Expedition />} />
          <Route path="market" element={<Market />} />
          <Route path="shop" element={<Shop />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="login" element={<Login />} />
          <Route path="myprofile" element={<Myprofile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
