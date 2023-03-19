import { useState } from "react";
import GameField from "../../components/GameField/GameField";
import BuildableLocation from "../../components/management-island/buildable-location/BuildableLocation";
import Building from "../../components/management-island/building/Building";
import style from "./Test.module.css";

export default function Test() {
  const [buildings, setBuildings] = useState([
    {
      id: 1,
      buildingType: "LumberYard",
      name: "Fatelep",
      xCoordinate: 1,
      yCoordinate: 1,
      level: 1,
      maxLevel: 0,
      description: "Leírás",
      spritePath: "",
      coinsForUpdate: 0,
      ironsForUpdate: 0,
      stonesForUpdate: 0,
      woodsForUpdate: 0,
      productionInterval: 1000,
      producedCoins: 0,
      producedIrons: 0,
      producedStones: 0,
      producedWoods: 0,
      experienceReward: 0,
      buildDate: new Date("2023-03-04T16:01:26.421924"),
      lastCollectDate: new Date("2023-03-04T16:01:26.422024"),
    },
  ]);

  const [buildableLocations, setBuildableLocations] = useState([
    {
      xCoordinate: 0,
      yCoordinate: 0,
    },
    {
      xCoordinate: 1,
      yCoordinate: 1,
    },
    {
      xCoordinate: 2,
      yCoordinate: 2,
    },
    {
      xCoordinate: 3,
      yCoordinate: 3,
    },
    {
      xCoordinate: 4,
      yCoordinate: 4,
    },
  ]);

  return (
    <div className={style.container}>
      <GameField
        mapTilesWide={50}
        mapTilesHigh={30}
        backgroundTilesWide={80}
        backgroundTilesHigh={60}
      >
        {buildings.map((building, index) => (
          <Building key={index} building={building} />
        ))}
        {buildableLocations.map((buildableLocation, index) => (
          <BuildableLocation
            key={index}
            xCoordinate={buildableLocation.xCoordinate}
            yCoordinate={buildableLocation.yCoordinate}
          />
        ))}
      </GameField>
    </div>
  );
}
