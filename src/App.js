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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from './pages/error/Error';

function App() {
  return (
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
          <Route path="register" element={<Register />} />
          <Route path="pwreset" element={<Pwreset />} />
          <Route path="error" element={<Error />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
