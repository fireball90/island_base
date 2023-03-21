import GameField from "../../components/GameField/GameField";
import BuildableLocation from "../../components/management-island/buildable-location/BuildableLocation";
import Building from "../../components/management-island/building/Building";
import Tile from "../../components/management-island/tile/Tile";
import style from "./Test.module.css";
import React, { Component } from "react";
import IslandContext from "../../contexts/IslandContext";
import axios from "axios";
import { forkJoin, from } from "rxjs";

export default class Test extends Component {
  static contextType = IslandContext;

  constructor() {
    super();

    this.state = {
      buildings: [],
      buildableLocations: [],
    };

    this.buildBuilding = () => {};

    this.upgradeBuilding = () => {};

    this.setCollectedItemsToPlayer = (collectedItems) => {
      console.log(collectedItems);
    };
  }

  componentDidMount() {
    const urls = [
      "https://localhost:7276/api/Building/GetAllBuildings",
      "https://localhost:7276/api/Island/GetIsland",
    ];
    const requests$ = urls.map((url) => from(axios.get(url)));

    forkJoin(requests$).subscribe({
      next: (response) => {
        const buildings = response[0].data;
        const island = response[1].data;

        this.context.setBuildings(buildings);
        this.context.setIsland(island);
      },
      error: () => alert("Nem sikerült lekérdezni az adatokat!"),
    });
  }

  render() {
    return this.context.isIslandInitialized ? (
      <div className={style.container}>
        <GameField
          mapTilesWide={50}
          mapTilesHigh={30}
          backgroundTilesWide={80}
          backgroundTilesHigh={60}
          mapSpritePath={this.context.island.spritePath}
          staticObjects={[
            this.context.buildings.map((building, index) => (
              <Tile
                key={index}
                xCoordinate={building.xCoordinate}
                yCoordinate={building.yCoordinate}
                scale={2}
              >
                <Building
                  building={building}
                  setCollectedItemsToPlayer={this.setCollectedItemsToPlayer}
                />
              </Tile>
            )),
            this.state.buildableLocations.map((buildableLocation, index) => (
              <Tile
                key={index}
                xCoordinate={buildableLocation.xCoordinate}
                yCoordinate={buildableLocation.yCoordinate}
                scale={2}
              >
                <BuildableLocation />
              </Tile>
            )),
          ]}
          animations={[]}
        />
      </div>
    ) : (
      <div>betöltés...</div>
    );
  }
}