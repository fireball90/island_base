import axios from "axios";
import React, { Component } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { Subject, takeUntil, takeWhile, tap, timer } from "rxjs";
import GameFieldContext from "../../../contexts/GameFieldContext";
import MovablePopover from "../movable-popover/MovablePopover";

import "./Building.css";

export default class Building extends Component {
  static contextType = GameFieldContext;

  constructor(props) {
    super(props);

    this.state = {
      isUnderConstruction: false,
      producedCoins: this.calculateProducedItemsSinceLastCollection(
        this.props.building.producedCoins
      ),
      producedIrons: this.calculateProducedItemsSinceLastCollection(
        this.props.building.producedIrons
      ),
      producedStones: this.calculateProducedItemsSinceLastCollection(
        this.props.building.producedStones
      ),
      producedWoods: this.calculateProducedItemsSinceLastCollection(
        this.props.building.producedWoods
      ),
      timeLeftToBuildingCompletion: 0,
      isCollectPending: false,
    };

    this.construction$ = timer(0, 1000);
    this.production$ = timer(
      this.calculateFirstProductionDate(),
      this.props.building.productionInterval
    );
    this.componentDestroyed$ = new Subject();
    this.ref = React.createRef();
  }

  calculateProducedItemsSinceLastCollection(item) {
    const now = new Date();
    const buildDate = new Date(this.props.building.buildDate);
    const lastCollectDate = new Date(this.props.building.lastCollectDate);

    const ticksFromBuild = Math.floor(
      (now.getTime() - buildDate.getTime()) /
        this.props.building.productionInterval
    );
    const ticksBetweenBuildAndLastCollection = Math.floor(
      (lastCollectDate.getTime() - buildDate.getTime()) /
        this.props.building.productionInterval
    );

    const elapsedTicksFromLastCollection =
      ticksFromBuild - ticksBetweenBuildAndLastCollection;

    return this.calculateProducedItem(item * elapsedTicksFromLastCollection);
  }

  calculateFirstProductionDate() {
    const now = new Date();
    const nextProductionDate = new Date(this.props.building.buildDate);
    while (nextProductionDate.getTime() <= now.getTime()) {
      nextProductionDate.setTime(
        nextProductionDate.getTime() + this.props.building.productionInterval
      );
    }

    return nextProductionDate;
  }

  hasResourceProduction() {
    return (
      this.state.producedCoins +
        this.state.producedIrons +
        this.state.producedStones +
        this.state.producedWoods >
      0
    );
  }

  notNullProducedItems() {
    const notNullProducedItems = [];

    if (this.state.producedCoins > 0) {
      notNullProducedItems.push({
        name: "Érmék",
        num: 0,
        quantity: this.state.producedCoins,
      });
    }
    if (this.state.producedIrons) {
      notNullProducedItems.push({
        name: "Vas",
        num: 3,
        quantity: this.state.producedIrons,
      });
    }
    if (this.state.producedStones) {
      notNullProducedItems.push({
        name: "Kő",
        num: 2,
        quantity: this.state.producedStones,
      });
    }
    if (this.state.producedWoods) {
      notNullProducedItems.push({
        name: "Fa",
        num: 1,
        quantity: this.state.producedWoods,
      });
    }

    return notNullProducedItems;
  }
  

  collectItems() {
    axios
      .post(
        `https://localhost:7276/api/Building/CollectItems?type=${this.props.building.buildingType}`
      )
      .then((response) => {
        this.setState((state) => ({
          ...state,
          producedCoins: 0,
          producedIrons: 0,
          producedStones: 0,
          producedWoods: 0,
        }));

        this.props.setCollectedItemsToPlayer(response.data);
      })
      .catch(() => {
        alert("Nem sikerült kapcsolódni a szerverhez!");
      });
  }

  componentDidMount() {
    this.production$.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
      this.setState((state) => ({
        ...state,
        producedCoins: this.calculateProducedItem(
          state.producedCoins + this.props.building.producedCoins
        ),
        producedIrons: this.calculateProducedItem(
          state.producedIrons + this.props.building.producedIrons
        ),
        producedStones: this.calculateProducedItem(
          state.producedStones + this.props.building.producedStones
        ),
        producedWoods: this.calculateProducedItem(
          state.producedWoods + this.props.building.producedWoods
        ),
      }));
    });

    this.construction$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(() => {
          const now = new Date();
          const buildDate = new Date(this.props.building.buildDate);

          if (now.getTime() >= buildDate.getTime()) {
            this.setState((state) => ({
              ...state,
              timeLeftToBuildingCompletion: 0,
            }));
          }
        }),
        takeWhile(() => {
          const now = new Date();
          const buildDate = new Date(this.props.building.buildDate);
          return now.getTime() < buildDate.getTime();
        })
      )
      .subscribe(() => {
        const now = new Date();
        const buildDate = new Date(this.props.building.buildDate);

        this.setState((state) => ({
          ...state,
          timeLeftToBuildingCompletion: buildDate.getTime() - now.getTime(),
        }));
      });
  }

  calculateProducedItem(amount) {
    return amount > this.props.building.maximumProductionCount
      ? this.props.building.maximumProductionCount
      : amount;
  }

  timestampToFormattedDate() {
    const time = new Date(this.state.timeLeftToBuildingCompletion);
    return `${
      time.getHours() - 1
    }h ${time.getMinutes()}m ${time.getSeconds()}s`;
  }

  componentWillUnmount() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  render() {
    const iconPaths  = [
      "../images/icons/coin.png",
      "../images/icons/wood.png",
      "../images/icons/stone.png",
      "../images/icons/steel.png"
    ]

    return this.state.timeLeftToBuildingCompletion === 0 ? (
      <div
        className="building-sprite"
        style={{ backgroundImage: `url(${this.props.building.spritePath})` }}
        ref={this.ref}
      >
        <OverlayTrigger
          show={this.hasResourceProduction()}
          container={this.ref}
          trigger={null}
          overlay={
            <MovablePopover zoom={this.context.zoom}>
              {this.notNullProducedItems().map((item, index) => (
                <div key={index}>
                    <img src={iconPaths[item.num]} alt={item.name} title={item.name} className="collect-icon"></img>
                    <span className="collect-number">{item.quantity+100}</span>
                </div>
              ))}
              <button
                onClick={() => this.collectItems()}
                disabled={this.state.isCollectPending}
                className="collect-btn"
              >
                Collect
              </button>
            </MovablePopover>
          }
        >
          <div
            className="w-100 h-100"
            onClick={() => this.props.openBuildingModal(this.props.building)}
          ></div>
        </OverlayTrigger>
      </div>
    ) : (
      <div
        className="building-sprite"
        style={{ backgroundImage: "url(/assets/sprites/working.png)" }}
        ref={this.ref}
      >
        <OverlayTrigger
          show={true}
          container={this.ref}
          trigger={null}
          overlay={
            <MovablePopover zoom={this.context.zoom}>
              {this.timestampToFormattedDate()}
            </MovablePopover>
          }
        >
          <div></div>
        </OverlayTrigger>
      </div>
    );
  }
  
}