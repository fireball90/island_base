import { Component } from "react";
import { EnemyIslandModel } from "../../models/EnemyIslandModel";
import style from './IslandsPVP.module.css'
import PartPlayerStatistic from "./part-player-statistic/PartPlayerStatistic";
import PVPMap from "./pvp-map/PVPMap"

export default class IslandsPVP extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitReady: false,
            player: {
                experiencePoints: 0,
                strength: 0,
                ability: 0,
                intelligence: 0,
                churchLevel: 0
            },
            enemyIslands: []
        }
    }

    async fetchPVPInitFile() {
        const response = await fetch('/pvpInit.json')
        
        if (!response.ok) {
            // Hibakezelést megcsinálni
        }

        const pvpInitFile = await response.json()
        
        this.processPVPInitFile(pvpInitFile)
    }

    processPVPInitFile(pvpInitFile) {
        const enemyIslands = pvpInitFile.enemies.map(e => new EnemyIslandModel(
            e.playerId, 
            e.username, 
            e.sprite,
            e.experiencePoints, 
            e.xPosition,
            e.yPosition
        ))

        this.setState(state => ({
            ...state,
            isInitReady: true,
            player: {
                experiencePoints: pvpInitFile.player.experiencePoints,
                strength: pvpInitFile.player.strength,
                ability: pvpInitFile.player.ability,
                intelligence: pvpInitFile.player.intelligence,
                churchLevel: pvpInitFile.player.churchLevel
            },
            enemyIslands: enemyIslands
        }))
    }

    componentDidMount() {
        this.fetchPVPInitFile()
    }

    render() {
        return (
            <div className={style.container}>
                <PVPMap
                    isInitReady={this.state.isInitReady}
                    enemyIslands={this.state.enemyIslands}
                />
                <PartPlayerStatistic
                    experiencePoints={this.state.player.experiencePoints}
                    strength={this.state.player.strength}
                    ability={this.state.player.ability}
                    intelligence={this.state.player.intelligence}
                    churchLevel={this.state.player.churchLevel}
                />
            </div>
        )
    }
}