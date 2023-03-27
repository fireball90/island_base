import React, { Component } from "react";
import { Image, ProgressBar } from "react-bootstrap";
import GameFieldContext from "../../../contexts/GameFieldContext";

import style from "./EnemyIsland.module.css";

export class EnemyIsland extends Component {
  static contextType = GameFieldContext;

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  health() {
    return this.props.enemy.health / 5.5;
  }

  render() {
    return (
      <div
        onClick={() => this.props.setAttackedEnemy(this.props.enemy)}
        className={style.island}
        style={{ backgroundImage: `url(${this.props.enemy.spritePath})` }}
      >
        <div className="w-75 h-25 bg-white d-flex">
          <div className="w-25 h-75">
            <Image className="w-100 h-100" src={this.props.enemy.profileImage}></Image>
          </div>
          <div className="w-75 h-100">
            <div className="bg-primary text-white h-50">{this.props.enemy.username} - {this.props.enemy.level}</div>
            <div className="d-flex align-items-center h-50"><ProgressBar className="w-100" now={this.health()} label={this.props.enemy.health}/></div>
          </div>
        </div>
      </div>
    );
  }
}