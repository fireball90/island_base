import { Component } from "react";
import { EnemyIslandModel } from "../../models/EnemyIslandModel";
import FloatAlert from "../float-alert/FloatAlert";
import BattleReportDialog from "./battle-report-dialog/BattleReportDialog";
import BlockMessage from "./block-message/BlockMessage";
import style from './IslandsPVP.module.css'
import PartPlayerStatistic from "./part-player-statistic/PartPlayerStatistic";
import PVPConfirmDialog from "./pvp-confirm-dialog/PVPConfirmDialog";
import PVPMap from "./pvp-map/PVPMap"
import { GameMath } from "../../game-math/GameMath";

export default class IslandsPVP extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isInitReady: false,
            player: {
                experiencePoints: 0,
                availableTalentPoints: 0,
                strength: 0,
                ability: 0,
                intelligence: 0,
                churchLevel: 0,
                pvpAvailable: false
            },
            enemyIslands: [],
            attackedEnemyIsland: null,
            alertMessage: null,
            alertVariant: null,
            battleResult: null 
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
                availableTalentPoints: pvpInitFile.player.availableTalentPoints,
                strength: pvpInitFile.player.strength,
                ability: pvpInitFile.player.ability,
                intelligence: pvpInitFile.player.intelligence,
                churchLevel: pvpInitFile.player.churchLevel,
                pvpAvailable: pvpInitFile.player.pvpAvailable
            },
            enemyIslands: enemyIslands
        }))
    }

    openPVPConfirmDialog = (playerId) => {
        const attackedEnemyIsland = this.state.enemyIslands.find(e => e.playerId == playerId)
        if (attackedEnemyIsland) {
            this.setState(state => ({
                ...state,
                attackedEnemyIsland: attackedEnemyIsland
            }))
        }
    }

    closePVPConfirmDialog = () => {
        this.setState(state => ({
            ...state,
            attackedEnemyIsland: null 
        }))
    }   

    attackEnemyIsland = (playerId) => {
        this.setState(state => ({
            ...state,
            attackedEnemyIsland: null,
        }))

        this.sendBattleRequest()
    }

    async sendBattleRequest() {
        const response = await fetch('/pvpResult.json')
        
        if (!response.ok) {
            // Hibakezelést megcsinálni
        }

        const battleResult = await response.json()

        this.setState(state => ({
            ...state,
            battleResult: battleResult,
            player: {
                experiencePoints: GameMath.LimitXP(state.player.experiencePoints + battleResult.winnedItems.experiencePoints),
                availableTalentPoints: state.player.availableTalentPoints,
                strength: state.player.strength,
                ability: state.player.ability,
                intelligence: state.player.intelligence,
                churchLevel: state.player.churchLevel,
                pvpAvailable: state.player.pvpAvailable
            }
        }))
    }

    resetBattleReport = () => {
        this.setState(state => ({
            ...state,
            battleResult: null 
        }))
    }

    increaseStrengthPoints = () => {
        if (this.state.player.availableTalentPoints > 0 && this.state.player.strength < 10) {
            this.setState(state => ({
                ...state,
                player: {
                    experiencePoints: state.player.experiencePoints,
                    availableTalentPoints: state.player.availableTalentPoints - 1,
                    strength: state.player.strength + 1,
                    ability: state.player.ability,
                    intelligence: state.player.intelligence,
                    churchLevel: state.player.churchLevel,
                    pvpAvailable: state.player.pvpAvailable
                }
            }))
        }
    }

    increateAbilityPoints = () => {
        if (this.state.player.availableTalentPoints > 0 && this.state.player.ability < 10) {
            this.setState(state => ({
                ...state,
                player: {
                    experiencePoints: state.player.experiencePoints,
                    availableTalentPoints: state.player.availableTalentPoints - 1,
                    strength: state.player.strength,
                    ability: state.player.ability + 1,
                    intelligence: state.player.intelligence,
                    churchLevel: state.player.churchLevel,
                    pvpAvailable: state.player.pvpAvailable
                }
            }))
        }
    }

    increaseIntelligencePoints = () => {
        if (this.state.player.availableTalentPoints > 0 && this.state.player.intelligence < 10) {
            this.setState(state => ({
                ...state,
                player: {
                    experiencePoints: state.player.experiencePoints,
                    availableTalentPoints: state.player.availableTalentPoints - 1,
                    strength: state.player.strength,
                    ability: state.player.ability,
                    intelligence: state.player.intelligence + 1,
                    churchLevel: state.player.churchLevel,
                    pvpAvailable: state.player.pvpAvailable
                }
            }))
        }
    }

    closeAlertCallback = () => {
        this.setState(state => ({
            ...state,
            alertMessage: null,
            alertVariant: null
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

                    openPVPConfirmDialog={this.openPVPConfirmDialog}
                />
                <PartPlayerStatistic
                    experiencePoints={this.state.player.experiencePoints}
                    availableTalentPoints={this.state.player.availableTalentPoints}
                    strength={this.state.player.strength}
                    ability={this.state.player.ability}
                    intelligence={this.state.player.intelligence}
                    churchLevel={this.state.player.churchLevel}

                    increaseStrengthPoints={this.increaseStrengthPoints}
                    increateAbilityPoints={this.increateAbilityPoints}
                    increaseIntelligencePoints={this.increaseIntelligencePoints}
                />
                <BlockMessage
                    show={this.state.isInitReady && !this.state.player.pvpAvailable}
                    title={"Csata nem elérhető!"}
                    message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida vel quam ut porttitor. Donec nec metus augue."}
                />
                <PVPConfirmDialog 
                    attackedEnemyIsland={this.state.attackedEnemyIsland}
                    availableTalentPoints={this.state.player.availableTalentPoints}

                    closePVPConfirmDialog={this.closePVPConfirmDialog}
                    attackEnemyIsland={this.attackEnemyIsland}
                />
                <BattleReportDialog
                    battleResult={this.state.battleResult}

                    resetBattleReport={this.resetBattleReport}
                />
                <FloatAlert 
                    variant={this.state.alertVariant}
                    message={this.state.alertMessage}
                    
                    closeCallback={this.closeAlertCallback}
                />
            </div>
        )
    }
}