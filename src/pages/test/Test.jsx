import GameField from "../../components/GameField/GameField";
import BuildableLocation from "../../components/management-island/buildable-location/BuildableLocation";
import Building from "../../components/management-island/building/Building";
import Tile from "../../components/management-island/tile/Tile";
import style from "./Test.module.css";
import React, { Component, useContext, useEffect } from "react";
import IslandContext from "../../contexts/IslandContext";
import HudContext from "../../contexts/HudContext";
import BuildingModal from "../../components/building-modal/BuildingModal";

export default function TestPage() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return <Test></Test>;
}

class Test extends Component {
  static contextType = IslandContext;

  constructor() {
    super();

    this.state = {
      buildings: [],
      buildableLocations: [],
      isModalShowed: false,
      openedBuilding: null,
    };

    this.openBuildingModal = (openedBuilding) => {
      this.setState((state) => ({
        ...state,
        isModalShowed: true,
        openedBuilding: openedBuilding,
      }));
    };

    this.closeBuildingModal = () => {
      this.setState((state) => ({
        ...state,
        isModalShowed: false,
        openedBuilding: null,
      }));
    };

    this.setCollectedItemsToPlayer = (collectedItems) => {
      this.context.setPlayer({
        ...this.context.player,
        coins: this.context.player.coins + collectedItems.coins,
        woods: this.context.player.woods + collectedItems.woods,
        stones: this.context.player.stones + collectedItems.stones,
        irons: this.context.player.irons + collectedItems.irons,
      });
    };
  }

  componentDidMount() {
    if (!this.context.isIslandInitialized) {
      this.context.initializeIslandFromHttp();
    }
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
            this.context.buildings.map((building) => (
              <Tile
                key={`${building.id}${building.level}`}
                xCoordinate={building.xCoordinate}
                yCoordinate={building.yCoordinate}
                scale={2}
              >
                <Building
                  building={building}
                  setCollectedItemsToPlayer={this.setCollectedItemsToPlayer}
                  openBuildingModal={this.openBuildingModal}
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
        {this.state.isModalShowed ? (
          <BuildingModal
            openedBuilding={this.state.openedBuilding}
            closeBuildingModal={this.closeBuildingModal}
          />
        ) : null}
      </div>
    ) : (
      <div>betöltés...</div>
    );
  }
}