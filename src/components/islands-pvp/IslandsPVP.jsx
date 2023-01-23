import { Component } from "react";
import { EnemyIslandModel } from "../../models/EnemyIslandModel";
import BlockMessage from "./block-message/BlockMessage";
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
                churchLevel: 0,
                pvpAvailable: false
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
                churchLevel: pvpInitFile.player.churchLevel,
                pvpAvailable: pvpInitFile.player.pvpAvailable
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
                    pvpAvailable={this.state.player.pvpAvailable}
                />
                <PartPlayerStatistic
                    experiencePoints={this.state.player.experiencePoints}
                    strength={this.state.player.strength}
                    ability={this.state.player.ability}
                    intelligence={this.state.player.intelligence}
                    churchLevel={this.state.player.churchLevel}
                />
                <BlockMessage
                    show={this.state.isInitReady && !this.state.player.pvpAvailable}
                    title={"Csata nem elérhető!"}
                    message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida vel quam ut porttitor. Donec nec metus augue."}
                />
            </div>
        )
    }
}