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
    const elapsedTimeFromLastCollection =
      new Date() - new Date(this.props.building.lastCollectDate);
    return (
      item *
      parseInt(
        elapsedTimeFromLastCollection / this.props.building.productionInterval
      )
    );
  }

  calculateFirstProductionDate() {
    const now = new Date();
    const nextProductionDate = new Date(this.props.building.buildDate);
    while (nextProductionDate < now) {
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

  collectItems() {
    axios
      .post(
        `https://localhost:7276/api/Building/CollectItems?type=${this.props.building.buildingType}`
      )
      .then((response) => {
        console.log(response);

        this.setState((state) => ({
          ...state,
          producedCoins: 0,
          producedIrons: 0,
          producedStones: 0,
          producedWoods: 0,
        }));

        this.props.setCollectedItemsToPlayer(response.data);
      })
      .catch((error) => {
        alert('Nem sikerült kapcsolódni a szerverhez!');
      });
  }

  componentDidMount() {
    this.production$.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
      this.setState((state) => ({
        ...state,
        producedCoins: state.producedCoins + this.props.building.producedCoins,
        producedIrons: state.producedIrons + this.props.building.producedIrons,
        producedStones:
          state.producedStones + this.props.building.producedStones,
        producedWoods: state.producedWoods + this.props.building.producedWoods,
      }));
    });

    this.construction$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(() => {
          const now = new Date();
          if (now < new Date(this.props.building.buildDate)) {
            this.setState((state) => ({
              ...state,
              timeLeftToBuildingCompletion: 0,
            }));
          }
        }),
        takeWhile(() => {
          const now = new Date();
          return now < new Date(this.props.building.buildDate);
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
    return !this.state.timeLeftToBuildingCompletion ? (
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
              <div>{this.state.producedCoins}</div>
              <div>{this.state.producedIrons}</div>
              <div>{this.state.producedStones}</div>
              <div>{this.state.producedWoods}</div>
              <button
                onClick={() => this.collectItems()}
                disabled={this.state.isCollectPending}
              >
                Collect
              </button>
            </MovablePopover>
          }
        >
          <div></div>
        </OverlayTrigger>
      </div>
    ) : (
      <div
        className="building-sprite"
        style={{ backgroundImage: "url(/assets/sprites/working.png)" }}
        ref={this.ref}
      >
        <OverlayTrigger
          show={this.hasResourceProduction()}
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