import { Component } from "react";
import style from './IslandsPVP.module.css'
import PartPlayerStatistic from "./part-player-statistic/PartPlayerStatistic";

export default class IslandsPVP extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div className={style.container}>
                <PartPlayerStatistic/>
            </div>
        )
    }
}