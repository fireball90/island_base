import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Pwreset from "./pages/pwreset/Pwreset";
import Expedition from "./pages/expedition/Expedition";
import Island from "./pages/island/island";
import Market from "./pages/market/Market";
import Myprofile from "./pages/myprofile/Myprofile";
import Notifications from "./pages/notifications/Notifications";
import Tutorial from "./pages/tutorial/Tutorial";
import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Error from "./pages/error/Error";
import Sell from "./pages/sell/Sell";
import SelectIsland from "./pages/select-island/SelectIsland";
import Guard from "./models/Guard";
import Hud from "./components/hud/Hud";
import IslandContext from "./contexts/IslandContext";
import UserContext from "./contexts/UserContext";
import HudContext from "./contexts/HudContext";
import Management from "./pages/management/Management";
import axios from "axios";
import { forkJoin, from } from "rxjs";
import Battle from "./pages/battle/Battle";
import EmailVerification from "./pages/email-verification/EmailVerification";
import { Cookies } from "react-cookie";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHudDisplayed: false,
      isLogined: false,
      isEmailVerified: false,
      isIslandSelected: false,
      isIslandInitialized: false,
      user: {
        username: "",
        email: "",
      },
      player: {
        id: 0,
        experience: 0,
        coins: 0,
        woods: 0,
        stones: 0,
        irons: 0,
        selectedIsland: "",
        lastExpeditionDate: null,
        lastBattleDate: null,
        strength: 0,
        intelligence: 0,
        agility: 0,
      },
      buildings: [],
      unbuiltBuildings: [],
      island: {
        spritePath: "",
        buildableLocations: [],
        npcRoutes: [],
        npcSprites: [],
      },
      buildingToBeBuilt: null,
    };

    this.setUserLogined = (username, email) => {
      this.setState((state) => ({
        ...state,
        isLogined: true,
        user: {
          username: username,
          email: email,
        },
      }));
    };

    this.setUserLoggedOut = () => {
      const cookies = new Cookies();
      cookies.remove('token', { path: '/' });

      this.setState((state) => ({
        ...state,
        isLogined: false,
        isIslandSelected: false,
        isIslandInitialized: false,
        user: {
          username: "",
          email: "",
        },
        player: {
          id: 0,
          experience: 0,
          coins: 0,
          woods: 0,
          stones: 0,
          irons: 0,
          selectedIsland: "",
          lastExpeditionDate: null,
          lastBattleDate: null,
          strength: 0,
          intelligence: 0,
          agility: 0,
        },
        buildingToBeBuilt: null,
        buildings: [],
        unbuiltBuildings: [],
        island: {
          spritePath: "",
          buildableLocations: [],
          npcRoutes: [],
          npcSprites: [],
        },
      }));
    };

    this.setPlayer = (player) => {
      this.setState((state) => ({
        ...state,
        isIslandSelected: true,
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
          agility: player.agility,
        },
      }));
    };

    this.setIsIslandSelected = (isIslandSelected) => {
      this.state((state) => ({
        ...state,
        isIslandSelected: isIslandSelected,
      }));
    };

    this.setIsHudDisplyed = (isHudDisplayed) => {
      this.setState((state) => ({
        ...state,
        isHudDisplayed: isHudDisplayed,
      }));
    };

    this.setBuildings = (buildings) => {
      this.setState((state) => ({
        ...state,
        buildings: buildings,
      }));
    };

    this.setUnbuiltBuildings = (unbuiltBuildings) => {
      this.state.setState((state) => ({
        ...state,
        unbuiltBuildings: unbuiltBuildings,
      }));
    };

    this.setBuildingToBeBuilt = (buildingToBeBuild) => {
      this.setState((state) => ({
        ...state,
        buildingToBeBuilt: buildingToBeBuild,
      }));
    };

    this.interruptBuildingRequest = () => {
      this.setState((state) => ({
        ...state,
        buildingToBeBuilt: null,
      }));
    };

    this.initializeIslandFromHttp = () => {
      const urls = [
        "https://localhost:7276/api/Island/GetIsland",
        "https://localhost:7276/api/Building/GetAllBuildings",
        "https://localhost:7276/api/Building/GetAllUnbuiltBuildings",
      ];

      const requests$ = urls.map((url) => from(axios.get(url)));

      forkJoin(requests$).subscribe({
        next: (response) => {
          const island = response[0].data;
          const buildings = response[1].data;
          const unbuiltBuildings = response[2].data;

          this.setState((state) => ({
            ...state,
            isIslandInitialized: true,
            buildings: buildings,
            unbuiltBuildings: unbuiltBuildings,
            island: {
              spritePath: island.spritePath,
              buildableLocations: island.buildableLocations,
              npcRoutes: island.npcRoutes,
              npcSprites: island.npcSprites,
            },
          }));
        },
        error: (error) => {
          console.log(error);
        },
      });
    };
  }

  render() {
    return (
      <HudContext.Provider
        value={{
          isHudDisplayed: this.state.isHudDisplayed,

          setIsHudDisplayed: this.setIsHudDisplyed,
        }}
      >
        <UserContext.Provider
          value={{
            isLogined: this.state.isLogined,
            user: this.state.user,

            setUserLogined: this.setUserLogined,
            setUserLoggedOut: this.setUserLoggedOut,
          }}
        >
          <IslandContext.Provider
            value={{
              isIslandInitialized: this.state.isIslandInitialized,
              player: this.state.player,
              buildings: this.state.buildings,
              buildableLocations: this.state.island.buildableLocations,
              unbuiltBuildings: this.state.unbuiltBuildings,
              island: this.state.island,
              buildingToBeBuild: this.state.buildingToBeBuilt,

              setPlayer: this.setPlayer,
              setIsIslandSelected: this.setIsIslandSelected,
              setBuildings: this.setBuildings,
              setUnbuiltBuildings: this.setUnbuiltBuildings,
              initializeIslandFromHttp: this.initializeIslandFromHttp,
              setBuildingToBeBuilt: this.setBuildingToBeBuilt,
              interruptBuildingRequest: this.interruptBuildingRequest,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Hud />}>
                  <Route index element={<Login />} />
                  <Route
                    path="management"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Management />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="battle"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Battle />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="island"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Island />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="expedition"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Expedition />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="market"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Market />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="select-island"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <SelectIsland />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="tutorial"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Tutorial />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="notifications"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="myprofile"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Myprofile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="sell"
                    element={
                      <ProtectedRoute
                        guards={[new Guard(this.state.isLogined, "/")]}
                      >
                        <Sell />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="register" element={<Register />} />
                <Route
                  path="email-verification/:token"
                  element={<EmailVerification />}
                />
                <Route path="pwreset" element={<Pwreset />} />
                <Route path="error" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </IslandContext.Provider>
        </UserContext.Provider>
      </HudContext.Provider>
    );
  }
}

function ProtectedRoute({ children, guards }) {
  for (const guard of guards) {
    if (!guard.condition) {
      return <Navigate to={guard.redirect}></Navigate>;
    }
  }

  return children;
}