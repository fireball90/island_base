import { Component } from "react";
import { Spinner } from "react-bootstrap";
import Tile from "../../island-management/tile/Tile"
import { EnemyIsland } from "../enemy-island/EnemyIsland";


import style from "./PVPMap.module.css"

export default class PVPMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tileSize: 0,
            waterWidth: 0,
            waterHeight: 0,
            waterX: 0,
            waterY: 0,
            arenaWidth: 0,
            arenaHeight: 0,
            arenaX: 0,
            arenaY: 0,
            isLeftButtonHolded: false,
            zoom: 0
        }
    }

    calculateCameraPosition() {
        const headerHeight = 90
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight - headerHeight

        const arenaWidth = 5
        const arenaHeight = 3
        const waterWidth = 7
        const waterHeight = 5

        let tileSize = screenWidth / arenaWidth
        if (screenHeight > tileSize * arenaHeight) {  
            this.setState(state => ({
                ...state,
                tileSize: tileSize,
                waterWidth: screenWidth / (arenaWidth / 10) * (waterWidth / 10),
                waterHeight: tileSize * waterHeight,
                waterX: (screenWidth - screenWidth / (arenaWidth / 10) * (waterWidth / 10)) / 2,
                waterY: (screenHeight - tileSize * waterHeight) / 2,
                arenaWidth: screenWidth, 
                arenaHeight: tileSize * arenaHeight, 
                arenaX: (screenWidth - screenWidth) / 2,
                arenaY: (screenHeight - tileSize * arenaHeight) / 2
            }))
        } else {
            tileSize = screenHeight / arenaHeight
            this.setState(state => ({
                ...state,
                tileSize: tileSize,
                waterWidth: tileSize * waterWidth,
                waterHeight: screenHeight / (arenaHeight / 10) * (waterHeight / 10),
                waterX: (screenWidth - tileSize * waterWidth) / 2,
                waterY: (screenHeight - screenHeight / (arenaHeight / 10) * (waterHeight / 10)) / 2,
                arenaWidth: tileSize * arenaWidth, 
                arenaHeight: screenHeight,
                arenaX: ((screenWidth- tileSize * arenaWidth) / 2),
                arenaY: ((screenHeight - screenHeight) / 2)
            }))
        }
    }

    resize(scale, mouseX, mouseY) {
        const screenCenterX = window.innerWidth / 2
        const screenCenterY = window.innerHeight / 2

        let resizeOrigoX = mouseX
        let resizeOrigoY = mouseY

        let newArenaWidth = this.state.arenaWidth * scale
        let newArenaHeight = this.state.arenaHeight * scale
        let newArenaX = resizeOrigoX - (resizeOrigoX - this.state.arenaX) * scale
        let newArenaY = resizeOrigoY - (resizeOrigoY - this.state.arenaY) * scale

        if (newArenaX > screenCenterX || newArenaX + newArenaWidth < screenCenterX) {
            resizeOrigoX = screenCenterX
        }

        if (newArenaY > screenCenterY || newArenaY + newArenaHeight < screenCenterY) {
            resizeOrigoY = screenCenterY
        }

        this.setState(state => ({
            ...state,
            tileSize: state.tileSize * scale,
            waterWidth: state.waterWidth * scale,
            waterHeight: state.waterHeight * scale,
            waterX: resizeOrigoX - (resizeOrigoX - state.waterX) * scale,
            waterY: resizeOrigoY - (resizeOrigoY - state.waterY) * scale,
            arenaWidth: state.arenaWidth * scale,
            arenaHeight: state.arenaHeight * scale,
            arenaX: resizeOrigoX - (resizeOrigoX - state.arenaX) * scale,
            arenaY: resizeOrigoY - (resizeOrigoY - state.arenaY) * scale,
            zoom: state.zoom + scale
        }))
    }

    handlePreventDrag(event) {
        event.preventDefault()
    }

    handleMouseMove(event) {
        if (this.state.isLeftButtonHolded) {
            const screenCenterX = window.innerWidth / 2
            const screenCenterY = window.innerHeight / 2
            
            let newArenaX = this.state.arenaX + event.movementX
            let newArenaY = this.state.arenaY + event.movementY
            let newWaterX = this.state.waterX + event.movementX
            let newWaterY = this.state.waterY + event.movementY

            let different = 0

            if (newArenaX > screenCenterX ) {
                different = newArenaX - screenCenterX
                newArenaX -= different
                newWaterX -= different
            }

            if (newArenaX + this.state.arenaWidth < screenCenterX) {
                different = newArenaX + this.state.arenaWidth - screenCenterX
                newArenaX -= different
                newWaterX -= different
            }

            if (newArenaY > screenCenterY ) {              
                different = newArenaY - screenCenterY
                newArenaY -= different
                newWaterY -= different
            }

            if (newArenaY + this.state.arenaHeight < screenCenterY) {
                different = newArenaY + this.state.arenaHeight - screenCenterY
                newArenaY -= different
                newWaterY -= different
            }

            this.setState(state => ({
                ...state, 
                arenaX: newArenaX,
                arenaY: newArenaY,
                waterX: newWaterX,
                waterY: newWaterY
            }))
        }
    }

    handleMouseLeave() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: false
        }))
    }

    handleMouseDown() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: true
        }))
    }

    handleMouseUp() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: false
        }))
    }

    handleWheel(event) {
        if (event.deltaY > 0) {
            this.resize(0.9, event.pageX, event.pageY)
        } else {
            this.resize(1.1, event.pageX, event.pageY)
        }
    }

    componentDidMount() {
        this.calculateCameraPosition()

        window.addEventListener('resize', () => {
            this.calculateCameraPosition()
        })
    }

    render() {
        return !this.props.isInitReady ? (
            <div className="vw-100 d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 90px)' }}>
                <Spinner animation="grow" />
            </div>
        ) : (
            <div 
                className={style.camera}
                    onMouseMove={ e => this.handleMouseMove(e) }
                    onMouseLeave={ () => this.handleMouseLeave() }
                    onMouseDown={ () => this.handleMouseDown() }
                    onMouseUp={ () => this.handleMouseUp() }
                    onWheel={ e => this.handleWheel(e) }
                >
                <div 
                    className={style.water}
                    onDragStart={event => this.handlePreventDrag(event)}
                    style={{
                        width: this.state.waterWidth,
                        height: this.state.waterHeight,
                        top: this.state.waterY,
                        left: this.state.waterX, 
                    }}>
                </div>
                <div 
                    className={style.arena}
                    onDragStart={event => this.handlePreventDrag(event)}
                    style={{
                        width: this.state.arenaWidth,
                        height: this.state.arenaHeight,
                        top: this.state.arenaY,
                        left: this.state.arenaX,
                    }}>
                    {
                        this.props.pvpAvailable ? (
                            this.props.enemyIslands.map((island, index) => (
                                <Tile
                                    key={index}
                                    width={this.state.tileSize}
                                    height={this.state.tileSize}
                                    left={island.xPosition * this.state.tileSize}
                                    top={island.yPosition * this.state.tileSize}    
                                >
                                    <EnemyIsland 
                                        playerId={island.playerId}
                                        username={island.username}
                                        sprite={island.sprite}
                                        experiencePoints={island.experiencePoints}
                                        zoom={this.state.zoom}
                                    />
                                </Tile>
                            ))
                        ) : null
                    }
                </div>
            </div>
        )
    }
}