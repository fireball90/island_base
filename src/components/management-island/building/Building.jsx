import React, { Component } from "react";
import { OverlayTrigger, Button } from "react-bootstrap";
import MovablePopover from "../movable-popover/MovablePopover";

import "./Building.css";

export default class Building extends Component {
  interval;

//   constructor(props) {
//     super(props);

//     this.ref = React.createRef();

//     this.state = {
//       remainingTime: null,
//     };

//     this.interval = null;
//     this.ref = React.createRef();
//   }

//   handleClick() {
//     this.props.collectProducedItems(this.props.building);
//   }

//   checkAlreadyBuilded() {
//     const today = new Date();

//     return this.props.building.buildDate > today ? false : true;
//   }

//   startReaminingTimeTimer() {
//     this.handleTimeChange();

//     this.interval = setInterval(() => this.handleTimeChange(), 1000);
//   }

//   handleTimeChange() {
//     const today = new Date();
//     const time = this.props.building.buildDate - today;

//     if (time > 0) {
//       this.setState((state) => ({
//         ...state,
//         remainingTime: new Date(time),
//       }));
//     } else {
//       this.setState((state) => ({
//         ...state,
//         remainingTime: null,
//       }));

//       this.clearRemainingTime();
//     }
//   }

//   clearRemainingTime() {
//     clearInterval(this.interval);
//   }

//   componentDidMount() {
//     if (!this.checkAlreadyBuilded()) {
//       this.startReaminingTimeTimer();
//     }
//   }

//   componentDidUpdate() {
//     if (!this.checkAlreadyBuilded() && !this.state.remainingTime) {
//       this.startReaminingTimeTimer();
//     }
//   }

//   componentWillUnmount() {
//     this.clearRemainingTime();
//   }

  render() {
    // const itemsPopupIsDisplayed = (
    //     this.props.building.alreadyProducedCoin +
    //     this.props.building.alreadyProducedIrons +
    //     this.props.building.alreadyProducedStones +
    //     this.props.building.alreadyProducedWoods > 0)

    // return this.state.remainingTime != null ?
    //     (
    //         <div className="w-100 h-100 bg-white" ref={this.ref}>
    //             <OverlayTrigger
    //                 show={true}
    //                 container={this.ref}
    //                 trigger={null}
    //                 overlay={
    //                     <MovablePopover>
    //                         <div className="text-center">
    //                             <i className="bi bi-clock fs-1"></i>
    //                             <div className="fw-bold timer">{this.state.remainingTime.getHours() - 1}h {this.state.remainingTime.getMinutes()}m {this.state.remainingTime.getSeconds()}s</div>
    //                         </div>
    //                     </MovablePopover>
    //                 }>
    //                 <div></div>
    //             </OverlayTrigger>
    //         </div>
    //     ) :
    //     (

    //         <div className="w-100 h-100">
    //             <div className="overlay-container" ref={this.ref}></div>
    //             <OverlayTrigger
    //                 show={itemsPopupIsDisplayed}
    //                 container={this.ref}
    //                 trigger={null}
    //                 overlay={
    //                     <MovablePopover
    //                         zoom={this.props.zoom}
    //                         building={this.props.building}
    //                     >
    //                         <div className="d-flex flex-column justify-content-center">
    //                             <ul className="list-unstyled">
    //                                 {
    //                                     this.props.building.alreadyProducedCoin > 0 ?
    //                                         <li>{this.props.building.alreadyProducedCoin} termelt érme</li> :
    //                                         null
    //                                 }
    //                                 {
    //                                     this.props.building.alreadyProducedIrons > 0 ?
    //                                         <li>{this.props.building.alreadyProducedIrons} termelt vas</li> :
    //                                         null
    //                                 }
    //                                 {
    //                                     this.props.building.alreadyProducedStones > 0 ?
    //                                         <li>{this.props.building.alreadyProducedStones} termelt kő</li> :
    //                                         null
    //                                 }
    //                                 {
    //                                     this.props.building.alreadyProducedWoods > 0 ?
    //                                         <li>{this.props.building.alreadyProducedWoods} termelt fa</li> :
    //                                         null
    //                                 }
    //                             </ul>
    //                             <div className='text-center'>
    //                                 <Button
    //                                     onClick={() => this.handleClick()}
    //                                     variant="primary">
    //                                     <i className="bi bi-cart-check-fill"></i>
    //                                 </Button>
    //                             </div>
    //                         </div>
    //                     </MovablePopover>
    //                 }
    //             >
    //                 <div
    //                     onClick={() => this.props.selectBuildingToUpdate(this.props.building)}
    //                     className="w-100 h-100 sprite-image"
    //                     style={{
    //                         backgroundImage: `url(${this.props.building.imagePath})`
    //                     }}>
    //                 </div>
    //             </OverlayTrigger>
    //         </div>
    //     )

    return <div>Hello World From Building!</div>;
  }
}
