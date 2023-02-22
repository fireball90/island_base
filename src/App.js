import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Pwreset from './pages/pwreset/Pwreset';
import Expedition from './pages/expedition/Expedition';
import Management from './pages/management/Management';
import Market from './pages/market/Market';
import Myprofile from './pages/myprofile/Myprofile';
import Notifications from './pages/notifications/Notifications';
import Shop from './pages/shop/Shop';
import Tutorial from './pages/tutorial/Tutorial';
import War from './pages/war/War';
import Navigation from './components/navbar/Navbar';
import Navigation2 from './components/navbar2/Navbar2';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from './pages/error/Error';
import Sell from './pages/sell/Sell';

function App() {
  return (//ide kell majd egy IF elágazás. Cookie-ből kiolvasni, hogy loggedIn statusz true / false. És annak megfelelően menüt megjeleníteni, vagy 404 errort
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation2/>}>
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
          <Route path="register" element={<Register />} />
          <Route path="pwreset" element={<Pwreset />} />
          <Route path="error" element={<Error />}/>
          <Route path="sell" element={<Sell />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
