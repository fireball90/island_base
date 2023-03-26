import { Component } from "react";
import React from "react";
import { Spinner } from "react-bootstrap";
import { AnimateKeyframes } from "react-simple-animate";
import NPC from "../npc/NPC";
import Tile from "../tile/Tile";
import BuildingArea from "../buildable-location/BuildableLocation";
import Building from "../building/Building";

import style from "./GameMap.module.css";
import BuildableLocation from "../buildable-location/BuildableLocation";

export default class GameMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tileSize: 0,
      waterWidth: 0,
      waterHeight: 0,
      waterX: 0,
      waterY: 0,
      islandWidth: 0,
      islandHeight: 0,
      islandX: 0,
      islandY: 0,
      isLeftButtonHolded: false,
      zoom: 0,
      npcAnimations: [],
    };

    this.animationTimeout = null;
  }

  calculateCameraPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const islandWidth = 50;
    const islandHeight = 30;
    const waterWidth = 80;
    const waterHeight = 60;

    let tileSize = screenWidth / islandWidth;
    if (screenHeight > tileSize * islandHeight) {
      this.setState((state) => ({
        ...state,
        tileSize: tileSize,
        waterWidth: (screenWidth / (islandWidth / 10)) * (waterWidth / 10),
        waterHeight: tileSize * waterHeight,
        waterX:
          (screenWidth -
            (screenWidth / (islandWidth / 10)) * (waterWidth / 10)) /
          2,
        waterY: (screenHeight - tileSize * waterHeight) / 2,
        islandWidth: screenWidth,
        islandHeight: tileSize * islandHeight,
        islandX: (screenWidth - screenWidth) / 2,
        islandY: (screenHeight - tileSize * islandHeight) / 2,
      }));
    } else {
      tileSize = screenHeight / islandHeight;
      this.setState((state) => ({
        ...state,
        tileSize: tileSize,
        waterWidth: tileSize * waterWidth,
        waterHeight: (screenHeight / (islandHeight / 10)) * (waterHeight / 10),
        waterX: (screenWidth - tileSize * waterWidth) / 2,
        waterY:
          (screenHeight -
            (screenHeight / (islandHeight / 10)) * (waterHeight / 10)) /
          2,
        islandWidth: tileSize * islandWidth,
        islandHeight: screenHeight,
        islandX: (screenWidth - tileSize * islandWidth) / 2,
        islandY: (screenHeight - screenHeight) / 2,
      }));
    }
  }

  calculateCameraDistance(scale, mouseX, mouseY) {
    const cameraWidth = window.innerWidth;
    const cameraHeight = window.innerHeight;
    const cameraX = 0;
    const cameraY = 0;

    let resizeOrigoX = mouseX;
    let resizeOrigoY = mouseY;

    let newWaterWidth = this.state.waterWidth * scale;
    let newWaterHeight = this.state.waterHeight * scale;
    let newWaterX = resizeOrigoX - (resizeOrigoX - this.state.waterX) * scale;
    let newWaterY = resizeOrigoY - (resizeOrigoY - this.state.waterY) * scale;

    if (newWaterX + newWaterWidth < cameraWidth) {
      resizeOrigoX = cameraWidth;
    }

    if (newWaterY + newWaterHeight < cameraHeight) {
      resizeOrigoY = cameraHeight;
    }

    if (newWaterX > cameraX) {
      resizeOrigoX = cameraX;
    }

    if (newWaterY > cameraY) {
      resizeOrigoY = cameraY;
    }

    const zoomMeasure = scale > 1 ? 1 : -1;

    if (
      this.state.zoom + zoomMeasure >= 0 &&
      this.state.zoom + zoomMeasure <= 5
    ) {
      this.setState((state) => ({
        ...state,
        tileSize: state.tileSize * scale,
        waterWidth: state.waterWidth * scale,
        waterHeight: state.waterHeight * scale,
        waterX: resizeOrigoX - (resizeOrigoX - state.waterX) * scale,
        waterY: resizeOrigoY - (resizeOrigoY - state.waterY) * scale,
        islandWidth: state.islandWidth * scale,
        islandHeight: state.islandHeight * scale,
        islandX: resizeOrigoX - (resizeOrigoX - state.islandX) * scale,
        islandY: resizeOrigoY - (resizeOrigoY - state.islandY) * scale,
        zoom: state.zoom + zoomMeasure,
      }));
    }
  }

  preventDragHandler(event) {
    event.preventDefault();
  }

  mouseMoveHandler(event) {
    if (this.state.isLeftButtonHolded) {
      const cameraWidth = window.innerWidth;
      const cameraHeight = window.innerHeight;
      const cameraX = 0;
      const cameraY = 0;

      let newIslandX = this.state.islandX + event.movementX;
      let newIslandY = this.state.islandY + event.movementY;
      let newWaterX = this.state.waterX + event.movementX;
      let newWaterY = this.state.waterY + event.movementY;

      let different = 0;
      if (newWaterX + this.state.waterWidth < cameraWidth) {
        different = newWaterX + this.state.waterWidth - cameraWidth;
        newIslandX -= different;
        newWaterX -= different;
      }

      if (newWaterY + this.state.waterHeight < cameraHeight) {
        different = newWaterY + this.state.waterHeight - cameraHeight;
        newIslandY -= different;
        newWaterY -= different;
      }

      if (newWaterX > cameraX) {
        different = newWaterX - cameraX;
        newIslandX -= different;
        newWaterX -= different;
      }

      if (newWaterY > cameraY) {
        different = newWaterY - cameraY;
        newIslandY -= different;
        newWaterY -= different;
      }

      this.setState((state) => ({
        ...state,
        islandX: newIslandX,
        islandY: newIslandY,
        waterX: newWaterX,
        waterY: newWaterY,
      }));
    }
  }

  mouseLeaveHandler() {
    this.setState((state) => ({
      ...state,
      isLeftButtonHolded: false,
    }));
  }

  mouseDownHandler() {
    this.setState((state) => ({
      ...state,
      isLeftButtonHolded: true,
    }));
  }

  mouseUpHandler() {
    this.setState((state) => ({
      ...state,
      isLeftButtonHolded: false,
    }));
  }

  wheelHandler(event) {
    if (event.deltaY > 0) {
      this.calculateCameraDistance(0.8, event.pageX, event.pageY);
    } else {
      this.calculateCameraDistance(1.25, event.pageX, event.pageY);
    }
  }

  scheduleNextNPCAnimations() {
    const nextScheduleTime = Math.floor(Math.random() * 5000) + 5000;

    this.animationTimeout = setTimeout(() => {
      this.startNPCAnimation();
      this.scheduleNextNPCAnimations();
    }, nextScheduleTime);
  }

  startNPCAnimation() {
    const routeTilesMap = this.convertRoutesToMap(this.props.routeTiles);
    const startCoordinatesMap = this.searchStartCoordinates(routeTilesMap);
    const startCoordinate = this.chooseRandomCoordinate(startCoordinatesMap);
    const routeCoordinates = this.createRouteForNPC(
      startCoordinate,
      routeTilesMap
    );
    const movements = this.convertRouteCoordinatesToMovements(routeCoordinates);
    const sprite = this.chooseRandomSprite(this.props.sprites);
    const npcAnimation = this.createNPCAnimation(
      startCoordinate,
      movements,
      sprite
    );

    const extendedNPCAnimations = this.state.npcAnimations.slice();
    extendedNPCAnimations.push(npcAnimation);

    let npcAnimations = this.state.npcAnimations;
    npcAnimations = this.animationGarbageCollect(npcAnimations);

    if (npcAnimations.length < 6) {
      this.setState((state) => ({
        ...state,
        npcAnimations: extendedNPCAnimations,
      }));
    }
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
              ] = `background-image: url(${sprite}); background-position: ${
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

  componentDidMount() {    
    this.calculateCameraPosition();
    this.scheduleNextNPCAnimations();

    window.addEventListener("resize", () => {
      this.calculateCameraPosition();
    });
  }

  componentWillUnmount() {
    if (this.animationTimeout != null) {
      clearTimeout(this.animationTimeout);
    }
  }

  render() {
    return !this.props.isInitReady ? (
      <div className="vw-100 d-flex justify-content-center align-items-center">
        <Spinner animation="grow" />
      </div>
    ) : (
      <div
        className={style.camera}
        onMouseMove={(e) => this.mouseMoveHandler(e)}
        onMouseLeave={() => this.mouseLeaveHandler()}
        onMouseDown={() => this.mouseDownHandler()}
        onMouseUp={() => this.mouseUpHandler()}
        onWheel={(e) => this.wheelHandler(e)}
      >
        <div
          className={style.water}
          onDragStart={(event) => this.preventDragHandler(event)}
          style={{
            width: this.state.waterWidth,
            height: this.state.waterHeight,
            top: this.state.waterY,
            left: this.state.waterX,
          }}
        ></div>
        <div
          className={style.island}
          onDragStart={(event) => this.preventDragHandler(event)}
          style={{
            width: this.state.islandWidth,
            height: this.state.islandHeight,
            top: this.state.islandY,
            left: this.state.islandX,
            backgroundImage: `url(${this.props.islandImagePath})`,
          }}
        >
          <div className={style.animations}>
            {this.state.npcAnimations.map((animation, index) => (
              <AnimateKeyframes
                play
                duration={animation.duration}
                direction="normal"
                keyframes={animation.keyframes}
                key={index}
              >
                <NPC
                  width={this.state.tileSize}
                  height={this.state.tileSize}
                  walkingKeyframes={animation.walkingKeyframes}
                  duration={animation.duration}
                />
              </AnimateKeyframes>
            ))}
          </div>

          {this.props.availableBuildingAreas.map((area, index) => (
            <Tile
              key={index}
              width={this.state.tileSize * 2}
              height={this.state.tileSize * 2}
              top={area.coordY * this.state.tileSize * 2}
              left={area.coordX * this.state.tileSize * 2}
            >
              <BuildableLocation
                active={this.props.waitToBuild != null}
                xCoordinate={area.coordX}
                yCoordinate={area.coordY}
                buildBuilding={this.props.buildBuilding}
              />
            </Tile>
          ))}

          {this.props.builtBuildings.map((building, index) => (
            <Tile
              key={index}
              width={this.state.tileSize * 2}
              height={this.state.tileSize * 2}
              top={building.coordY * this.state.tileSize * 2}
              left={building.coordX * this.state.tileSize * 2}
            >
              <Building
                building={building}
                zoom={this.state.zoom}
                collectProducedItems={this.props.collectProducedItems}
                selectBuildingToUpdate={this.props.selectBuildingToUpdate}
              />
            </Tile>
          ))}
        </div>
      </div>
    );
  }
}