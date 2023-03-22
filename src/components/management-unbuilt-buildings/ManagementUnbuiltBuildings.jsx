import { useContext, useEffect } from "react";
import IslandContext from "../../contexts/IslandContext";
import UnbuiltBuilding from "../unbuilt-building/UnbuiltBuilding";

export default function ManagementUnbuiltBuildings() {
  const {
    isIslandInitialized,
    buildings,
    unbuiltBuildings,
    initializeIslandFromHttp,
  } = useContext(IslandContext);

  useEffect(() => {
    if (!isIslandInitialized) {
      initializeIslandFromHttp();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIslandInitialized, buildings, unbuiltBuildings]);

  return (
    <div className="w-100 h-100 d-flex flex-wrap gap-3 align-content-start">
      {unbuiltBuildings.map((building, index) => (
        <UnbuiltBuilding key={index} isLocked={true} building={building} />
      ))}
    </div>
  );
}
