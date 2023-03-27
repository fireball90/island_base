import { Component } from "react";
import style from "./IslandsBattle.module.css";
import GameField from "../GameField/GameField";
import moment from "moment";
import Lock from "./lock/Lock";
import {
  Subject,
  scan,
  map,
  mergeMap,
  takeWhile,
  timer,
  takeUntil,
} from "rxjs";
import PlayerContext from "../../contexts/PlayerContext";
import { GameHelper } from "../../game-helper/GameHelper";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default class IslandsBattle extends Component {
  static contextType = PlayerContext;

  constructor(props) {
    super(props);

    this.LOCK_MINUTES_AFTER_BATTLE = 10;

    this.state = {
      isInitReady: true,
      tempoparyLockCounter: 0,
    };

    this.battle$ = new Subject().pipe(
      map((earliestBattleDate) => {
        const now = new Date();
        return earliestBattleDate.getTime() - now.getTime();
      }),
      mergeMap((earliestBattleTime) => {
        this.setTempopraryLockCounter(earliestBattleTime);

        const timerStartTime = earliestBattleTime % 1000;
        const counterTime = earliestBattleTime - timerStartTime;

        return timer(timerStartTime, 1000).pipe(
          scan((counter) => counter - 1000, counterTime),
          takeWhile((counter) => counter >= 0)
        );
      })
    );
    this.componentDestroyed$ = new Subject();
  }

  setTempopraryLockCounter(counter) {
    this.setState((state) => ({
      ...state,
      tempoparyLockCounter: counter,
    }));
  }

  searchEnemies() {
    console.log('ok')
  }

  componentDidMount() {
    this.battle$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((counter) => {
        this.setTempopraryLockCounter(counter);
      });

    const now = new Date();
    const earliestBattleDate = new Date(this.context.player.lastBattleDate);
    earliestBattleDate.setMinutes(
      earliestBattleDate.getMinutes() + this.LOCK_MINUTES_AFTER_BATTLE
    );

    if (now < earliestBattleDate) {
      this.battle$.next(earliestBattleDate);
    }
  }

  componentWillUnmount() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  render() {
    return GameHelper.CalculateLevel(this.context.player.experience) < 5 ? (
      <Lock>Csak 5. szint felett érhető el a csata!</Lock>
    ) : this.state.tempoparyLockCounter !== 0 ? (
      <Lock>
        {moment(this.state.tempoparyLockCounter - 60 * 60 * 1000).format("LTS")}
      </Lock>
    ) : (
      <div className={style.container}>
        <GameField
          mapTilesWide={50}
          mapTilesHigh={30}
          backgroundTilesWide={80}
          backgroundTilesHigh={60}
          mapSpritePath={""}
          staticObjects={[]}
          animations={[]}
        />
      </div>
    );
  }
}