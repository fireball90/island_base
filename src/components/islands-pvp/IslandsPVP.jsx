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
            battleAvailable: true,
            blockBattleDialogIsShow: false,
            blockBattleMessage: "",
            blockBattleTimeStamp: null,
            player: {
                experiencePoints: 0,
                availableTalentPoints: 0,
                strength: 0,
                ability: 0,
                intelligence: 0,
                churchLevel: 0,
            },
            talentPointsIsEditing: false,
            editedTalentPoints: {
                strength: 0,
                ability: 0,
                intelligence: 0
            },
            enemyIslands: [],
            attackedEnemyIsland: null,
            alertMessage: null,
            alertVariant: null,
            battleResult: null 
        }

        this.blockBattleInterval = null
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

        let battleAvailable = true
        let blockBattleDialogIsShow = false
        let blockBattleMessage = ""

        // if (GameMath.CalculateLevel(pvpInitFile.player.experiencePoints) < 5) {
        //     battleAvailable = false
        //     blockBattleDialogIsShow = true
        //     blockBattleMessage = "Nem érted el az 5. szintet, ezért nem elérhető még a csata neked." 
        // } else if (!pvpInitFile.player.battleAvailableDate != null && (new Date(pvpInitFile.player.battleAvailableDate) > new Date())) {

        //     battleAvailable = false
        //     blockBattleDialogIsShow = true
        //     blockBattleMessage = "Csata zárolva. Nem indíthatsz közvetlenül csatát az előző után."

        //     this.startBlockBattleTimer(new Date(pvpInitFile.player.battleAvailableDate))
        // }

        this.setState(state => ({
            ...state,
            isInitReady: true,
            battleAvailable: battleAvailable,
            blockBattleDialogIsShow: blockBattleDialogIsShow,
            blockBattleMessage: blockBattleMessage,
            player: {
                experiencePoints: pvpInitFile.player.experiencePoints,
                availableTalentPoints: pvpInitFile.player.availableTalentPoints,
                strength: pvpInitFile.player.strength,
                ability: pvpInitFile.player.ability,
                intelligence: pvpInitFile.player.intelligence,
                churchLevel: pvpInitFile.player.churchLevel,
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
            battleAvailable: false,
            blockBattleDialogIsShow: true,
            blockBattleMessage: "Csata zárolva. Nem indíthatsz közvetlenül csatát az előző után.",
            player: {
                experiencePoints: GameMath.LimitXP(state.player.experiencePoints + battleResult.loot.experiencePoints),
                availableTalentPoints: state.player.availableTalentPoints,
                strength: state.player.strength,
                ability: state.player.ability,
                intelligence: state.player.intelligence,
                churchLevel: state.player.churchLevel,
            }
        }))

        const battleAvailableDate = new Date(new Date().getTime() + 600000)
        this.startBlockBattleTimer(battleAvailableDate)
    }

    resetBattleReport = () => {
        this.setState(state => ({
            ...state,
            battleResult: null 
        }))
    }

    increaseEditedStrengthPoints = () => {
        if (
            (this.state.player.availableTalentPoints - 
                (
                    this.state.editedTalentPoints.strength + 
                    this.state.editedTalentPoints.ability + 
                    this.state.editedTalentPoints.intelligence
                )) > 0 &&
            this.state.player.strength + this.state.editedTalentPoints.strength < 10
        ) {
            this.setState(state => ({
                ...state,
                talentPointsIsEditing: true,
                editedTalentPoints: {
                    strength: state.editedTalentPoints.strength + 1,
                    ability: state.editedTalentPoints.ability,
                    intelligence: state.editedTalentPoints.intelligence
                },
            }))
        }
    }

    increaseEditedAbilityPoints = () => {
        if (
            (this.state.player.availableTalentPoints - 
                (
                    this.state.editedTalentPoints.strength + 
                    this.state.editedTalentPoints.ability + 
                    this.state.editedTalentPoints.intelligence
                )) > 0 &&
            this.state.player.ability + this.state.editedTalentPoints.ability < 10   
        ) {
            this.setState(state => ({
                ...state,
                talentPointsIsEditing: true,
                editedTalentPoints: {
                    strength: state.editedTalentPoints.strength,
                    ability: state.editedTalentPoints.ability + 1,
                    intelligence: state.editedTalentPoints.intelligence
                },
            }))
        }
    }

    increaseEditedIntelligencePoints = () => {
        if (
            (this.state.player.availableTalentPoints - 
                (
                    this.state.editedTalentPoints.strength + 
                    this.state.editedTalentPoints.ability + 
                    this.state.editedTalentPoints.intelligence
                )) > 0 &&
            this.state.player.intelligence + this.state.editedTalentPoints.intelligence < 10   
        ) {
            this.setState(state => ({
                ...state,
                talentPointsIsEditing: true,
                editedTalentPoints: {
                    strength: state.editedTalentPoints.strength,
                    ability: state.editedTalentPoints.ability,
                    intelligence: state.editedTalentPoints.intelligence + 1
                },
            }))
        }
    }

    saveEditedTalentPoints = () => {
        // szerver hívás

        this.setState(state => ({
            ...state,
            talentPointsIsEditing: false,
            editedTalentPoints: {
                strength: 0,
                ability: 0,
                intelligence: 0
            },
            player: {
                experiencePoints: state.player.experiencePoints,
                availableTalentPoints: state.player.availableTalentPoints - (
                    state.editedTalentPoints.strength + state.editedTalentPoints.ability + state.editedTalentPoints.intelligence
                ),
                strength: state.player.strength + state.editedTalentPoints.strength,
                ability: state.player.ability + state.editedTalentPoints.ability,
                intelligence: state.player.intelligence + state.editedTalentPoints.intelligence,
                churchLevel: state.player.churchLevel,
            }
        }))
    }

    dropEditedTalentPoints = () => {
        this.setState(state => ({
            ...state,
            talentPointsIsEditing: false,
            editedTalentPoints: {
                strength: 0,
                ability: 0,
                intelligence: 0
            }
        }))
    }

    closeAlertCallback = () => {
        this.setState(state => ({
            ...state,
            alertMessage: null,
            alertVariant: null
        }))
    }

    startBlockBattleTimer(battleAvailableDate) {
        const differenceDateInMilliseconds = Math.abs(new Date() - battleAvailableDate)
        const differenceDate = new Date(differenceDateInMilliseconds);

        this.setState(state => ({
            ...state,
            blockBattleTimeStamp: differenceDate
        }), () => {
            this.blockBattleInterval = setInterval(() => {
                if (this.state.blockBattleTimeStamp.getTime() >= 1000) {
                    this.updateBlockBattleTimer()
                } else {
                    this.setBattleAvailable()
                    this.stopBlockBattleTimer()
                    this.closeBlockBattleDialog()
                }
            }, 1000)
        })
    }

    updateBlockBattleTimer() {
        const dateMinusOneMinuteInMilliseconds = Math.abs(this.state.blockBattleTimeStamp - 1000)
        const dateMinusOneMinute = new Date(dateMinusOneMinuteInMilliseconds);
        
        this.setState(state => ({
            ...state,
            blockBattleTimeStamp: dateMinusOneMinute
        }))
    }

    stopBlockBattleTimer() {
        clearInterval(this.blockBattleInterval)
        this.blockBattleInterval = null

        this.setState(state => ({
            state,
            blockBattleTimeStamp: null
        }))
    }

    openBlockBattleDialog = () => {
        this.setState(state => ({
            ...state,
            blockBattleDialogIsShow: true
        }))
    }

    closeBlockBattleDialog = () => {
        this.setState(state => ({
            ...state,
            blockBattleDialogIsShow: false
        }))
    }

    setBattleAvailable() {
        this.setState(state => ({
            ...state,
            battleAvailable: true
        }))
    }

    componentDidMount() {
        if (this.blockBattleInterval) {
            this.stopBlockBattleTimer()
        }

        this.fetchPVPInitFile()
    }

    render() {
        return (
            <div className={style.container}>
                <PVPMap
                    isInitReady={this.state.isInitReady}
                    enemyIslands={this.state.enemyIslands}
                    battleAvailable={this.state.battleAvailable}

                    openPVPConfirmDialog={this.openPVPConfirmDialog}
                />
                {/* <PartPlayerStatistic
                    experiencePoints={this.state.player.experiencePoints}
                    availableTalentPoints={this.state.player.availableTalentPoints}
                    strength={this.state.player.strength}
                    ability={this.state.player.ability}
                    intelligence={this.state.player.intelligence}
                    churchLevel={this.state.player.churchLevel}
                    editedStrength={this.state.editedTalentPoints.strength}
                    editedAbility={this.state.editedTalentPoints.ability}
                    editedIntelligence={this.state.editedTalentPoints.intelligence}
                    talentPointsIsEditing={this.state.talentPointsIsEditing}
                    blockBattleTimeStamp={this.state.blockBattleTimeStamp}

                    increaseEditedStrengthPoints={this.increaseEditedStrengthPoints}
                    increaseEditedAbilityPoints={this.increaseEditedAbilityPoints}
                    increaseEditedIntelligencePoints={this.increaseEditedIntelligencePoints}
                    saveEditedTalentPoints={this.saveEditedTalentPoints}
                    dropEditedTalentPoints={this.dropEditedTalentPoints}
                /> */}
                <BlockMessage
                    show={this.state.isInitReady && this.state.blockBattleDialogIsShow}
                    title={"A csata nem elérhető"}
                    message={this.state.blockBattleMessage}
                    blockBattleTimeStamp={this.state.blockBattleTimeStamp}

                    closeBlockBattleDialog={this.closeBlockBattleDialog}
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