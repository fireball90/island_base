import { Component } from "react";
import GameMap from "./game-map/GameMap.jsx";
import BuildingNotification from "./building-notification/BuildingNotification.jsx";
import { BuiltBuildingModel } from "../../models/BuiltBuildingModel";
import { UnbuiltBuildingModel } from "../../models/UnbuiltBuildingModel";
import { BuildingAreaModel } from "../../models/BuildingAreaModel.js";
import UpdateBuildingDialog from "./update-building-dialog/UpdateBuildingDialog";

import style from "./ManagementIsland.module.css";
import axios from "axios";

export default class ManagementIsland extends Component {
  // static contextType = IslandContext;

  constructor() {
    super();

    this.state = {
      isInitReady: false,
      availableBuildingAreas: [],
      builtBuildings: [],
      unbuiltBuildings: [],
      stats: {
        experiencePoints: 0,
        strength: 0,
        ability: 0,
        intelligence: 0,
      },
      items: {
        woods: 0,
        stones: 0,
        irons: 0,
        coins: 0,
      },
      routeTiles: [],
      waitToBuild: null,
      selectedBuildingToUpdate: null,
      sprites: [],
      islandImagePath: "",
    };

    this.updateItemStartTimers = new Map();
    this.updateItemIntervals = new Map();
  }

  async fetchInitFile() {
    const response = await fetch("/init.json");

    if (!response.ok) {
      // Hibakezelést megcsinálni
      return;
    }
    const initFile = await response.json();

    this.loadIsland(initFile);
  }

  loadIsland(initFile) {
    const availableBuildingAreas = initFile.availableBuildingAreas?.map(
      (b) => new BuildingAreaModel(b.coordX, b.coordY)
    );

    const builtBuildings = initFile.builtBuildings?.map(
      (b) =>
        new BuiltBuildingModel(
          b.coordX,
          b.coordY,
          b.level,
          b.maxLevel,
          b.name,
          new Date(b.buildDate),
          b.description,
          b.imagePath,
          b.coinsForUpdate,
          b.ironsForUpdate,
          b.stonesForUpdate,
          b.woodsForUpdate,
          b.productionInterval,
          new Date(b.lastCollectTime),
          b.produceCoinCount,
          b.produceIronsCount,
          b.produceStonesCount,
          b.produceWoodsCount,
          this.calculateProducedItem(
            new Date(b.lastCollectTime),
            b.produceCoinCount,
            b.productionInterval
          ),
          this.calculateProducedItem(
            new Date(b.lastCollectTime),
            b.produceIronsCount,
            b.productionInterval
          ),
          this.calculateProducedItem(
            new Date(b.lastCollectTime),
            b.produceStonesCount,
            b.productionInterval
          ),
          this.calculateProducedItem(
            new Date(b.lastCollectTime),
            b.produceWoodsCount,
            b.productionInterval
          ),
          this.addMilisecondsToDate(
            this.calculateStartTimeInMiliseconds(
              new Date(b.buildDate),
              b.productionInterval
            )
          )
        )
    );

    const unbuiltBuildings = initFile.unbuiltBuildings?.map(
      (b) =>
        new UnbuiltBuildingModel(
          b.name,
          b.coinsForBuild,
          b.ironsForBuild,
          b.stonesForBuild,
          b.woodsForBuild
        )
    );

    this.setState(
      (state) => ({
        ...state,
        isInitReady: true,
        availableBuildingAreas: availableBuildingAreas,
        builtBuildings: builtBuildings,
        unbuiltBuildings: unbuiltBuildings,
        stats: {
          experiencePoints: initFile.stats.experiencePoints,
          strength: initFile.stats.strength,
          ability: initFile.stats.ability,
          intelligence: initFile.stats.intelligence,
        },
        items: {
          woods: initFile.items.woods,
          stones: initFile.items.stones,
          irons: initFile.items.irons,
          coins: initFile.items.coins,
        },
        routeTiles: initFile.routeTiles,
        sprites: initFile.sprites,
        islandImagePath: initFile.islandImagePath,
      }),
      () => {
        for (let building of this.state.builtBuildings) {
          this.startUpdateItemTimer(building);
        }
      }
    );
  }

  selectWaitToBuild = (name) => {
    this.setState((state) => ({
      ...state,
      waitToBuild: name,
    }));
  };

  cancelWaitToBuild = () => {
    this.setState((state) => ({
      ...state,
      waitToBuild: null,
    }));
  };

  buildBuilding = (chosenCoordX, chosenCoordY) => {
    if (this.state.waitToBuild != null) {
      const chosenBuilding = this.state.unbuiltBuildings.find(
        (u) => u.name === this.state.waitToBuild
      );

      const buildDate = new Date();
      buildDate.setMinutes(buildDate.getMinutes() + 2);

      // Ez majd backendről fog jönni
      const newBuiltBuilding = new BuiltBuildingModel(
        chosenCoordX,
        chosenCoordY,
        1,
        3,
        chosenBuilding.name,
        buildDate,
        "...",
        "/assets/house-lvl-1.png",
        200,
        200,
        200,
        200,
        180000,
        new Date(),
        0,
        30,
        10,
        20,
        0,
        0,
        0,
        0,
        this.addMilisecondsToDate(
          this.calculateStartTimeInMiliseconds(buildDate, 180000)
        )
      );

      this.startUpdateItemTimer(newBuiltBuilding);

      this.setState((state) => ({
        ...state,
        availableBuildingAreas: state.availableBuildingAreas.filter(
          (a) => !(a.coordX === chosenCoordX && a.coordY === chosenCoordY)
        ),
        builtBuildings: [...state.builtBuildings, newBuiltBuilding],
        unbuiltBuildings: state.unbuiltBuildings.filter(
          (u) => u.name !== this.state.waitToBuild
        ),
        items: {
          woods: state.items.woods - chosenBuilding.woodsForBuild,
          stones: state.items.stones - chosenBuilding.stonesForBuild,
          irons: state.items.irons - chosenBuilding.ironsForBuild,
          coins: state.items.coins - chosenBuilding.coinsForBuild,
        },
        stats: {
          experiencePoints: state.stats.experiencePoints + 20,
          strength: state.stats.strength,
          ability: state.stats.ability,
          intelligence: state.stats.intelligence,
        },
        waitToBuild: null,
      }));
    }
  };

  selectBuildingToUpdate = (building) => {
    this.setState((state) => ({
      ...state,
      selectedBuildingToUpdate: building,
    }));
  };

  cancelUpdateBuilding = () => {
    this.setState((state) => ({
      ...state,
      selectedBuildingToUpdate: null,
    }));
  };

  updateBuilding = (building) => {
    // Frissítési logika, ami ki lesz törölve, ha lesz backend
    const buildDate = new Date();
    buildDate.setMinutes(buildDate.getMinutes() + 1);

    building.level =
      building.level < building.maxLevel ? building.level + 1 : 3;
    building.imagePath = `assets/house-lvl-${building.level}.png`;
    building.buildDate = buildDate;
    building.lastCollectTime = buildDate;
    building.alreadyProducedCoin = 0;
    building.alreadyProducedIrons = 0;
    building.alreadyProducedStones = 0;
    building.alreadyProducedWoods = 0;

    this.clearOneUpdateItemStartTimer(building);
    this.clearOneUpdateItemInterval(building);
    this.startUpdateItemTimer(building);

    this.setState((state) => ({
      ...state,
      builtBuildings: state.builtBuildings.map((b) =>
        b.name === building.name ? building : b
      ),
      items: {
        woods: state.items.woods - building.woodsForUpdate,
        stones: state.items.stones - building.stonesForUpdate,
        irons: state.items.irons - building.ironsForUpdate,
        coins: state.items.coins - building.coinsForUpdate,
      },
      stats: {
        experiencePoints: state.stats.experiencePoints + 10 * building.level,
        strength: state.stats.strength,
        ability: state.stats.ability,
        intelligence: state.stats.intelligence,
      },
      selectedBuildingToUpdate: null,
    }));
  };

  calculateStartTimeInMiliseconds(buildDate, productionInterval) {
    const today = new Date();
    const elapsedTimeSinceBuild = today - buildDate;

    let time;

    if (elapsedTimeSinceBuild > 0) {
      time = productionInterval - (elapsedTimeSinceBuild % productionInterval);
    } else {
      time = Math.abs(elapsedTimeSinceBuild) + productionInterval;
    }

    return time;
  }

  handleProducedItemUpdate(building) {
    const tickedBuilding = this.state.builtBuildings.find(
      (b) => b.name === building.name
    );

    tickedBuilding.alreadyProducedCoin += tickedBuilding.produceCoinCount;
    tickedBuilding.alreadyProducedIrons += tickedBuilding.produceIronsCount;
    tickedBuilding.alreadyProducedStones += tickedBuilding.produceStonesCount;
    tickedBuilding.alreadyProducedWoods += tickedBuilding.produceWoodsCount;
    tickedBuilding.nextProductionDate = this.addMilisecondsToDate(
      tickedBuilding.productionInterval
    );

    this.setState((state) => ({
      ...state,
      builtBuildings: state.builtBuildings.map((b) =>
        b.name === tickedBuilding.name ? tickedBuilding : b
      ),
    }));
  }

  calculateProducedItem(lastCollectTime, itemCount, interval) {
    const today = new Date();

    const elapsedTimeFromLastCollection = today - lastCollectTime;
    const multiplier = parseInt(elapsedTimeFromLastCollection / interval);

    return itemCount * multiplier;
  }

  addMilisecondsToDate(miliseconds) {
    const today = new Date();

    today.setTime(today.getTime() + miliseconds);
    return today;
  }

  startUpdateItemTimer(building) {
    let start = this.calculateStartTimeInMiliseconds(
      building.buildDate,
      building.productionInterval
    );
    let timer;
    let interval;

    timer = setTimeout(() => {
      this.handleProducedItemUpdate(building);

      interval = setInterval(() => {
        this.handleProducedItemUpdate(building);
      }, building.productionInterval);
    }, start);

    this.updateItemStartTimers.set(building.name, timer);
    this.updateItemIntervals.set(building.name, interval);
  }

  clearOneUpdateItemStartTimer(building) {
    if (this.updateItemStartTimers.has(building.name)) {
      clearTimeout(this.updateItemStartTimers.get(building.name));
      this.updateItemStartTimers.delete(building.name);
    } else {
      console.log("error timer");
    }
  }

  clearOneUpdateItemInterval(building) {
    if (this.updateItemIntervals.has(building.name)) {
      clearTimeout(this.updateItemIntervals.get(building.name));
      this.updateItemIntervals.delete(building.name);
    } else {
      console.log("error interval");
    }
  }

  clearUpdateItemStartTimers() {
    this.updateItemStartTimers.forEach((timer) => {
      clearTimeout(timer);
    });
  }

  clearUpdateItemIntervals() {
    this.updateItemIntervals.forEach((interval) => {
      clearInterval(interval);
    });
  }

  collectProducedItems = (building) => {
    // Elküldeni a szervernek a frissítás dátumát

    const buildingAfterCollect = new BuiltBuildingModel(
      building.coordX,
      building.coordY,
      building.level,
      building.maxLevel,
      building.name,
      building.buildDate,
      building.description,
      building.imagePath,
      building.coinsForUpdate,
      building.ironsForUpdate,
      building.stonesForUpdate,
      building.woodsForUpdate,
      building.productionInterval,
      new Date(),
      building.produceCoinCount,
      building.produceIronsCount,
      building.produceStonesCount,
      building.produceWoodsCount,
      0,
      0,
      0,
      0,
      this.addMilisecondsToDate(
        this.calculateStartTimeInMiliseconds(
          building.buildDate,
          building.productionInterval
        )
      )
    );

    this.setState((state) => ({
      ...state,
      builtBuildings: state.builtBuildings.map((b) =>
        b.name === buildingAfterCollect.name ? buildingAfterCollect : b
      ),
      items: {
        woods: state.items.woods + building.alreadyProducedWoods,
        stones: state.items.stones + building.alreadyProducedStones,
        irons: state.items.irons + building.alreadyProducedIrons,
        coins: state.items.coins + building.alreadyProducedCoin,
      },
    }));
  };

  componentDidMount() {
    this.fetchInitFile();

    const urls = [
      "https://localhost:7276/api/Building/GetAllBuilding",
      "https://localhost:7276/api/Island/GetIsland",
    ];

    const requests = urls.map((url) => axios.get(url));

    Promise.all(requests)
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.clearUpdateItemStartTimers();
    this.clearUpdateItemIntervals();
  }

  render() {
    let waitToBuildNotification;

    if (this.state.waitToBuild) {
      waitToBuildNotification = (
        <BuildingNotification
          name={this.state.waitToBuild}
          cancelWaitToBuild={this.cancelWaitToBuild}
        />
      );
    }

    return (
      <div className={style.container}>
        {waitToBuildNotification}
        <GameMap
          isInitReady={this.state.isInitReady}
          buildBuilding={this.buildBuilding}
          availableBuildingAreas={this.state.availableBuildingAreas}
          builtBuildings={this.state.builtBuildings}
          waitToBuild={this.state.waitToBuild}
          collectProducedItems={this.collectProducedItems}
          selectBuildingToUpdate={this.selectBuildingToUpdate}
          routeTiles={this.state.routeTiles}
          sprites={this.state.sprites}
          islandImagePath={this.state.islandImagePath}
        />
        <UpdateBuildingDialog
          show={this.state.selectedBuildingToUpdate != null}
          building={this.state.selectedBuildingToUpdate}
          items={this.state.items}
          updateBuilding={this.updateBuilding}
          cancelUpdateBuilding={this.cancelUpdateBuilding}
        />
      </div>
    );
  }
}