import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Pwreset from './pages/pwreset/Pwreset';
import Expedition from './pages/expedition/Expedition';
import Management from './pages/management/Management';
import Market from './pages/market/Market';
import Myprofile from './pages/myprofile/Myprofile';
import Notifications from './pages/notifications/Notifications';
import Tutorial from './pages/tutorial/Tutorial';
import War from './pages/war/War';
import { createContext, Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Error from './pages/error/Error';
import Sell from './pages/sell/Sell';
import SelectIsland from './pages/select-island/SelectIsland';
import Guard from './models/Guard';
import Hud from './components/hud/Hud';

export const UserContext = createContext()
export const PlayerContext = createContext()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogined: false,
      isEmailValidated: false,
      isIslandSelected: false,
      user: {
        username: '',
        email: ''
      },
      player: {
        id: 0,
        experience: 0,
        coins: 0,
        woods: 0,
        stones: 0,
        irons: 0,
        selectedIsland: '',
        lastExpeditionDate: null,
        lastBattleDate: null,
        strength: 0,
        intelligence: 0,
        agility: 0
      }
    }

    this.setUser = (username, email) => {
      this.setState(state => ({
        ...state,
        user: {
          username: username,
          email: email
        }
      }))
    }

    this.setIsLogined = (isLogined) => {
      this.setState(state => ({
        ...state,
        isLogined: isLogined
      }))
    }

    this.setPlayer = (player) => {
      this.setState(state => ({
        ...state,
        player: {
          id: player.id,
          experience: player.experience,
          coins: player.coins,
          woods: player.woods,
          stones: player.stones,
          irons: player.irons,
          selectedIsland: player.selectedIsland,
          lastExpeditionDate: new Date(player.lastExpeditionDate),
          lastBattleDate: new Date(player.lastBattleDate),
          strength: player.strength,
          intelligence: player.intelligence,
          agility: player.agility
        }
      }));
    }
  }

  render() {
    return (
      <UserContext.Provider value={{
        isLogined: this.state.isLogined,
        isEmailValidated: this.state.isEmailValidated,
        user: this.state.user,

        setIsLogined: this.setIsLogined,
        setUser: this.setUser
      }}>
        <PlayerContext.Provider value={{
          player: this.state.player,
          
          setPlayer: this.setPlayer
        }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Hud />}>
                <Route index element={<Login />} />
                <Route
                  path="war"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <War />
                    </ProtectedRoute>
                  } />
                <Route
                  path='management'
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Management />
                    </ProtectedRoute>
                  } />
                <Route
                  path="expedition"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Expedition />
                    </ProtectedRoute>
                  } />
                <Route
                  path='market'
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Market />
                    </ProtectedRoute>
                  } />
                <Route
                  path='select-island'
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <SelectIsland />
                    </ProtectedRoute>
                  } />
                <Route
                  path="tutorial"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Tutorial />
                    </ProtectedRoute>
                  } />
                <Route
                  path="notifications"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                <Route
                  path="myprofile"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Myprofile />
                    </ProtectedRoute>
                  } />
                <Route
                  path="register"
                  element={<Register />} />
                <Route
                  path="pwreset"
                  element={<Pwreset />} />
                <Route
                  path="error"
                  element={<Error />} />
                <Route
                  path="sell"
                  element={
                    <ProtectedRoute guards={[
                      new Guard(this.state.isLogined, '/'),
                    ]}>
                      <Sell />
                    </ProtectedRoute>
                  } />
              </Route>
            </Routes>
          </BrowserRouter>
        </PlayerContext.Provider>
      </UserContext.Provider>
    )
  }
}

function ProtectedRoute({ children, guards }) {
  for (const guard of guards) {
    if (!guard.condition) {
      return <Navigate to={guard.redirect}></Navigate>
    }
  }

  return children
}