import GameField from "../../components/GameField/GameField";
import BuildableLocation from "../../components/management-island/buildable-location/BuildableLocation";
import Building from "../../components/management-island/building/Building";
import Tile from "../../components/management-island/tile/Tile";
import style from "./Test.module.css";
import React, { Component, useContext, useEffect } from "react";
import IslandContext from "../../contexts/IslandContext";
import HudContext from "../../contexts/HudContext";
import BuildingModal from "../../components/building-modal/BuildingModal";
import BuildingNotification from "../../components/management-island/building-request-notification/BuildingRequestNotification";
import axios from "axios";

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
      openedBuildingRemainingTime: 0,
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

    this.setOpenedBuildingRemainingTime = (
      currentRemainingTime,
      buildingType
    ) => {
      if (
        this.state.openedBuilding &&
        this.state.openedBuilding.buildingType === buildingType
      ) {
        this.setState((state) => ({
          ...state,
          openedBuildingRemainingTime: currentRemainingTime,
        }));
      }
    };

    this.buildBuilding = (xCoordinate, yCoordinate) => {
      axios
        .post("https://localhost:7276/api/Building/CreateBuilding", {
          buildingType: this.context.buildingToBeBuild.buildingType,
          xCoordinate: xCoordinate,
          yCoordinate: yCoordinate,
        })
        .then((response) => {
          this.context.setPlayer({
            ...this.context.player,
            coins:
              this.context.player.coins -
              this.context.buildingToBeBuild.coinsForBuild,
            woods:
              this.context.player.woods -
              this.context.buildingToBeBuild.woodsForBuild,
            stones:
              this.context.player.stones -
              this.context.buildingToBeBuild.stonesForBuild,
            irons:
              this.context.player.irons -
              this.context.buildingToBeBuild.ironsForBuild,
          });
          this.context.setBuildings([...this.context.buildings, response.data]);
          this.context.interruptBuildingRequest();
        })
        .catch(() => {
          alert("Nem sikerült kapcsolódni a szerverhez!");
        });
    };
  }

  freeBuildingLocations() {
    return this.context.buildableLocations.filter(
      (buildableLocation) =>
        this.context.buildings.filter(
          (building) =>
            building.xCoordinate === buildableLocation.xCoordinate &&
            building.yCoordinate === buildableLocation.yCoordinate
        ).length === 0
    );
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
                  setOpenedBuildingRemainingTime={
                    this.setOpenedBuildingRemainingTime
                  }
                />
              </Tile>
            )),
            this.freeBuildingLocations().map((buildableLocation, index) => (
              <Tile
                key={index}
                xCoordinate={buildableLocation.xCoordinate}
                yCoordinate={buildableLocation.yCoordinate}
                scale={2}
              >
                <BuildableLocation
                  xCoordinate={buildableLocation.xCoordinate}
                  yCoordinate={buildableLocation.yCoordinate}
                  buildBuilding={this.buildBuilding}
                />
              </Tile>
            )),
          ]}
          animations={[]}
        />
        {this.state.isModalShowed ? (
          <BuildingModal
            openedBuilding={this.state.openedBuilding}
            closeBuildingModal={this.closeBuildingModal}
            openedBuildingRemainingTime={this.state.openedBuildingRemainingTime}
          />
        ) : null}
        {this.context.buildingToBeBuild ? <BuildingNotification /> : null}
      </div>
    ) : (
      <div>betöltés...</div>
    );
  }
}