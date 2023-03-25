import { useContext, useEffect } from "react";
import IslandContext from "../../contexts/IslandContext";
import UnbuiltBuilding from "../unbuilt-building/UnbuiltBuilding";

export default function ManagementUnbuiltBuildings() {
  const {
    player,
    isIslandInitialized,
    buildings,
    unbuiltBuildings,
    initializeIslandFromHttp,
  } = useContext(IslandContext);

  function checkIsBuilt(buildingType) {
    return (
      buildings.filter((building) => building.buildingType === buildingType)
        .length > 0
    );
  }

  function checkHasEnoughMaterialsToBuild(building) {
    return (
      player.coins >= building.coinsForBuild &&
      player.woods >= building.woodsForBuild &&
      player.stones >= building.stonesForBuild &&
      player.irons >= building.ironsForBuild
    );
  }

  useEffect(() => {
    if (!isIslandInitialized) {
      initializeIslandFromHttp();
    }
  }, []);

  return (
    <div className="w-100 h-100 d-flex flex-wrap gap-3 align-content-start">
      {unbuiltBuildings.map((building, index) => (
        <UnbuiltBuilding
          key={index}
          isBuilt={checkIsBuilt(building.buildingType)}
          hasEnoughMaterials={checkHasEnoughMaterialsToBuild(building)}
          building={building}
        />
      ))}
    </div>
  );
}