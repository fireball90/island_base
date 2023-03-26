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
import { timer, expand, of, Subject, takeUntil, skip } from "rxjs";

export default function TestPage() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return <Test />;
}

class Test extends Component {
  static contextType = IslandContext;

  constructor(props) {
    super(props);

    this.state = {
      buildings: [],
      buildableLocations: [],
      isModalShowed: false,
      openedBuilding: null,
      openedBuildingRemainingTime: 0,
      currentlyRunningAnimations: [],
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
            experience:
              this.context.player.experience +
              this.context.buildingToBeBuild.experienceReward,
          });
          this.context.setBuildings([...this.context.buildings, response.data]);
          this.context.interruptBuildingRequest();
        })
        .catch(() => {
          alert("Nem sikerült kapcsolódni a szerverhez!");
        });
    };

    this.componentDestroyed$ = new Subject();
    this.scheduledAnimations$ = of(undefined)
    
    // of(undefined).pipe(
    //   expand(() => timer(Math.floor(Math.random() * 5000) + 5000)),
    //   skip(1)
    // )
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

  // Animations

  startNPCAnimation() {
    const routeTilesMap = this.convertRoutesToMap(this.context.island.npcRoutes);
    console.log(this.context.island)
    // console.log(routeTilesMap)
    

    // const startCoordinatesMap = this.searchStartCoordinates(routeTilesMap);
    // const startCoordinate = this.chooseRandomCoordinate(startCoordinatesMap);
    // const routeCoordinates = this.createRouteForNPC(
    //   startCoordinate,
    //   routeTilesMap
    // );
    // const movements = this.convertRouteCoordinatesToMovements(routeCoordinates);
    // const sprite = this.chooseRandomSprite(this.props.sprites);
    // const npcAnimation = this.createNPCAnimation(
    //   startCoordinate,
    //   movements,
    //   sprite
    // );

    // const extendedNPCAnimations = this.state.npcAnimations.slice();
    // extendedNPCAnimations.push(npcAnimation);

    // let npcAnimations = this.state.npcAnimations;
    // npcAnimations = this.animationGarbageCollect(npcAnimations);

    // if (npcAnimations.length < 6) {
    //   this.setState((state) => ({
    //     ...state,
    //     npcAnimations: extendedNPCAnimations,
    //   }));
    // }
  }

  animationGarbageCollect(animations) {
    const runningAnimations = [];
    const now = new Date();

    for (const animation of animations) {
      if (animation.endTime > now) {
        runningAnimations.push(animation);
      }
    }

    return runningAnimations;
  }

  convertRoutesToMap(routes) {
    const map = new Map();

    for (const route of routes) {
      map.set(`${route.coordX}${route.coordY}`, route);
    }

    return map;
  }

  searchStartCoordinates(routeTilesMap) {
    const startCoordinates = [];

    for (const routeTileMap of routeTilesMap) {
      const topNeighbourRouteKey = `${routeTileMap[1].coordX}${
        routeTileMap[1].coordY + 1
      }`;
      const rightNeighbourRouteKey = `${routeTileMap[1].coordX + 1}${
        routeTileMap[1].coordY
      }`;
      const bottomNeighbourRouteKey = `${routeTileMap[1].coordX}${
        routeTileMap[1].coordY - 1
      }`;
      const leftNeighbourRouteKey = `${routeTileMap[1].coordX - 1}${
        routeTileMap[1].coordY
      }`;

      let numberOfNeighbors = 0;

      if (routeTilesMap.get(topNeighbourRouteKey)) {
        numberOfNeighbors++;
      }

      if (routeTilesMap.get(rightNeighbourRouteKey)) {
        numberOfNeighbors++;
      }

      if (routeTilesMap.get(bottomNeighbourRouteKey)) {
        numberOfNeighbors++;
      }

      if (routeTilesMap.get(leftNeighbourRouteKey)) {
        numberOfNeighbors++;
      }

      if (numberOfNeighbors === 1) {
        startCoordinates.push(routeTileMap);
      }
    }

    return startCoordinates;
  }

  chooseRandomCoordinate(coordinates) {
    const randomIndex = Math.floor(Math.random() * coordinates.length);

    return coordinates[randomIndex][1];
  }

  createRouteForNPC(startingCoordinate, routeTilesMap) {
    const touchedRouteTiles = new Map();
    const npcRouteCoordinates = [startingCoordinate];

    let currentStep = startingCoordinate;
    let isReachedEndOfRoute = false;

    while (!isReachedEndOfRoute) {
      const possibleSteps = [];

      const keyOfTopStep = `${currentStep.coordX}${currentStep.coordY + 1}`;
      const keyOfRightStep = `${currentStep.coordX + 1}${currentStep.coordY}`;
      const keyOfBottomStep = `${currentStep.coordX}${currentStep.coordY - 1}`;
      const keyOfLeftStep = `${currentStep.coordX - 1}${currentStep.coordY}`;

      if (
        routeTilesMap.get(keyOfTopStep) &&
        !touchedRouteTiles.get(keyOfTopStep)
      ) {
        possibleSteps.push(routeTilesMap.get(keyOfTopStep));
      }

      if (
        routeTilesMap.get(keyOfRightStep) &&
        !touchedRouteTiles.get(keyOfRightStep)
      ) {
        possibleSteps.push(routeTilesMap.get(keyOfRightStep));
      }

      if (
        routeTilesMap.get(keyOfBottomStep) &&
        !touchedRouteTiles.get(keyOfBottomStep)
      ) {
        possibleSteps.push(routeTilesMap.get(keyOfBottomStep));
      }

      if (
        routeTilesMap.get(keyOfLeftStep) &&
        !touchedRouteTiles.get(keyOfLeftStep)
      ) {
        possibleSteps.push(routeTilesMap.get(keyOfLeftStep));
      }

      if (possibleSteps.length === 1) {
        npcRouteCoordinates.push(possibleSteps[0]);
        touchedRouteTiles.set(
          `${currentStep.coordX}${currentStep.coordY}`,
          currentStep
        );

        currentStep = possibleSteps[0];
      } else if (possibleSteps.length > 1) {
        const randomIndex = Math.floor(Math.random() * possibleSteps.length);

        npcRouteCoordinates.push(possibleSteps[randomIndex]);
        touchedRouteTiles.set(
          `${currentStep.coordX}${currentStep.coordY}`,
          currentStep
        );

        currentStep = possibleSteps[randomIndex];
      } else {
        isReachedEndOfRoute = true;
      }
    }

    return npcRouteCoordinates;
  }

  Directions = {
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
  };

  convertRouteCoordinatesToMovements(routeCoordinates) {
    const movements = [];

    let currentMovementDirection = null;
    let currentMovementIndex = -1;

    for (let i = 1; i < routeCoordinates.length; i++) {
      let newMovementDirection;

      if (routeCoordinates[i - 1].coordX > routeCoordinates[i].coordX) {
        newMovementDirection = this.Directions.left;
      }

      if (routeCoordinates[i - 1].coordY > routeCoordinates[i].coordY) {
        newMovementDirection = this.Directions.top;
      }

      if (routeCoordinates[i - 1].coordX < routeCoordinates[i].coordX) {
        newMovementDirection = this.Directions.right;
      }

      if (routeCoordinates[i - 1].coordY < routeCoordinates[i].coordY) {
        newMovementDirection = this.Directions.bottom;
      }

      if (newMovementDirection !== currentMovementDirection) {
        currentMovementIndex++;
        currentMovementDirection = newMovementDirection;

        movements.push({ direction: currentMovementDirection, steps: 1 });
      } else {
        movements[currentMovementIndex].steps++;
      }
    }

    return movements;
  }

  chooseRandomSprite(sprites) {
    const randomIndex = Math.floor(Math.random() * sprites.length);

    return sprites[randomIndex];
  }

  createNPCAnimation(startCoordinate, movements, sprite) {
    const keyframes = [];
    const islandWidthCoordinatesOnePercent = 0.3;
    const islandHeightCoordinatesOnePercent = 0.2;
    const stepTime = 3.5;

    const allSteps = movements.reduce((r, a) => r + a.steps, 0);
    let currentTranslateX =
      startCoordinate.coordX / islandWidthCoordinatesOnePercent;
    let currentTranslateY =
      startCoordinate.coordY / islandHeightCoordinatesOnePercent;
    let animationKeyframePercent = 0;

    keyframes.push({
      0: `transform: translateX(${currentTranslateX}%) translateY(${currentTranslateY}%);`,
    });

    for (const movement of movements) {
      let keyframe = {};

      animationKeyframePercent += movement.steps / (allSteps / 100);
      if (animationKeyframePercent > 100) animationKeyframePercent = 100;

      switch (movement.direction) {
        case this.Directions.top:
          currentTranslateY -=
            movement.steps / islandHeightCoordinatesOnePercent;
          keyframe[
            animationKeyframePercent
          ] = `transform: translateX(${currentTranslateX}%) translateY(${currentTranslateY}%);`;

          keyframes.push(keyframe);

          break;
        case this.Directions.right:
          currentTranslateX +=
            movement.steps / islandWidthCoordinatesOnePercent;
          keyframe[
            animationKeyframePercent
          ] = `transform: translateX(${currentTranslateX}%) translateY(${currentTranslateY}%);`;

          keyframes.push(keyframe);

          break;
        case this.Directions.bottom:
          currentTranslateY +=
            movement.steps / islandHeightCoordinatesOnePercent;
          keyframe[
            animationKeyframePercent
          ] = `transform: translateX(${currentTranslateX}%) translateY(${currentTranslateY}%);`;

          keyframes.push(keyframe);

          break;
        case this.Directions.left:
          currentTranslateX -=
            movement.steps / islandWidthCoordinatesOnePercent;
          keyframe[
            animationKeyframePercent
          ] = `transform: translateX(${currentTranslateX}%) translateY(${currentTranslateY}%)`;

          keyframes.push(keyframe);

          break;
        default:
          console.log("Error while generate animation");
      }
    }

    const animationFrequency = 8;
    const walkingKeyframes = [];
    const walkingAnimationKeyframePercent =
      100 / (allSteps * animationFrequency);

    let spritePosition = 0;
    let currentWalkingAnimationKeyframePercent = 0;

    for (const movement of movements) {
      for (let step = 0; step < movement.steps; step++) {
        for (let keyframes = 0; keyframes < animationFrequency; keyframes++) {
          const walkingKeyframe = {};

          switch (movement.direction) {
            case this.Directions.top:
              walkingKeyframe[
                currentWalkingAnimationKeyframePercent
              ] = `background-image: url(${sprite}); background-position: ${
                (100 / 3) * spritePosition
              }% ${(100 / 3) * 2}%`;
              walkingKeyframes.push(walkingKeyframe);

              break;
            case this.Directions.right:
              walkingKeyframe[
                currentWalkingAnimationKeyframePercent
              ] = `background-image: url(${sprite}); background-position: ${
                (100 / 3) * spritePosition
              }% ${100 / 3}%`;
              walkingKeyframes.push(walkingKeyframe);

              break;
            case this.Directions.bottom:
              walkingKeyframe[
                currentWalkingAnimationKeyframePercent
              ] = `background-image: url(${sprite}); background-position: ${
                (100 / 3) * spritePosition
              }% ${0}%`;
              walkingKeyframes.push(walkingKeyframe);

              break;
            case this.Directions.left:
              walkingKeyframe[
                currentWalkingAnimationKeyframePercent
              ] = `background-image: url(/assets/sprites/sprite-0001.png); background-position: ${
                (100 / 3) * spritePosition
              }% ${100}%`;
              walkingKeyframes.push(walkingKeyframe);

              break;
            default:
              console.log("Error while generate animation");
          }

          spritePosition < 3 ? spritePosition++ : (spritePosition = 0);

          currentWalkingAnimationKeyframePercent +=
            walkingAnimationKeyframePercent;
          if (currentWalkingAnimationKeyframePercent > 100)
            currentWalkingAnimationKeyframePercent = 100;
        }
      }
    }

    const createTime = Date.now();
    const duration = allSteps * stepTime;

    return {
      duration: duration,
      keyframes: keyframes,
      walkingKeyframes: walkingKeyframes,
      createTime: new Date(),
      endTime: new Date(createTime + duration * 1000),
    };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    // console.log(this.context.island.npcRoutes)
    console.log(prevContext)
    if (prevContext !== this.context.island.npcRoutes) {
      console.log('Hello')
    }
  }

  componentDidMount() {
    if (!this.context.isIslandInitialized) {
      this.context.initializeIslandFromHttp();
    }

    this.scheduledAnimations$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.startNPCAnimation()
      });
  }

  componentWillUnmount() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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