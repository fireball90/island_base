import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import Tile from "../../management-island/tile/Tile";
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
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        const arenaWidth = 5
        const arenaHeight = 3
        const waterWidth = 8
        const waterHeight = 6

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

    calculateCameraDistance(scale, mouseX, mouseY) {
        const cameraWidth = window.innerWidth
        const cameraHeight = window.innerHeight
        const cameraX = 0
        const cameraY = 0

        let resizeOrigoX = mouseX
        let resizeOrigoY = mouseY

        let newWaterWidth = this.state.waterWidth * scale
        let newWaterHeight = this.state.waterHeight * scale
        let newWaterX = resizeOrigoX - (resizeOrigoX - this.state.waterX) * scale
        let newWaterY = resizeOrigoY - (resizeOrigoY - this.state.waterY) * scale

        if (newWaterX + newWaterWidth < cameraWidth) {
            resizeOrigoX = cameraWidth
        }

        if (newWaterY + newWaterHeight < cameraHeight) {
            resizeOrigoY = cameraHeight
        }

        if (newWaterX > cameraX) {
            resizeOrigoX = cameraX
        }

        if (newWaterY > cameraY)
        {
            resizeOrigoY = cameraY
        }

        const zoomMeasure = (scale > 1 ? 1 : -1)
     
        if (this.state.zoom + zoomMeasure >= 0 && this.state.zoom + zoomMeasure <= 5) {
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
                zoom: state.zoom + zoomMeasure
            }))
        }
    }

    preventDragHandler(event) {
        event.preventDefault()
    }

    mouseMoveHandler(event) {
        if (this.state.isLeftButtonHolded) {
            const cameraWidth = window.innerWidth
            const cameraHeight = window.innerHeight
            const cameraX = 0
            const cameraY = 0
            
            let newArenaX = this.state.arenaX + event.movementX
            let newArenaY = this.state.arenaY + event.movementY
            let newWaterX = this.state.waterX + event.movementX
            let newWaterY = this.state.waterY + event.movementY

            let different = 0

            if (newWaterX + this.state.waterWidth < cameraWidth) {
                different = newWaterX + this.state.waterWidth - cameraWidth
                newArenaX -= different
                newWaterX -= different
            }

            if (newWaterY + this.state.waterHeight < cameraHeight) {
                different = newWaterY + this.state.waterHeight - cameraHeight
                newArenaY -= different
                newWaterY -= different
            }

            if (newWaterX > cameraX) {
                different = newWaterX - cameraX
                newArenaX -= different
                newWaterX -= different
            }

            if (newWaterY > cameraY)
            {
                different = newWaterY - cameraY
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

    mouseLeaveHandler() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: false
        }))
    }

    mouseDownHandler() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: true
        }))
    }

    mouseUpHandler() {
        this.setState(state => ({
            ...state,
            isLeftButtonHolded: false
        }))
    }

    wheelHandler(event) {
        if (event.deltaY > 0) {
            this.calculateCameraDistance(0.8, event.pageX, event.pageY)
        } else {
            this.calculateCameraDistance(1.25, event.pageX, event.pageY)
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
            <div className="vw-100 d-flex justify-content-center align-items-center">
                <Spinner animation="grow" />
            </div>
        ) : (
            <div 
                className={style.camera}
                    onMouseMove={ e => this.mouseMoveHandler(e) }
                    onMouseLeave={ () => this.mouseLeaveHandler() }
                    onMouseDown={ () => this.mouseDownHandler() }
                    onMouseUp={ () => this.mouseUpHandler() }
                    onWheel={ e => this.wheelHandler(e) }
                >
                <div 
                    className={style.water}
                    onDragStart={event => this.preventDragHandler(event)}
                    style={{
                        width: this.state.waterWidth,
                        height: this.state.waterHeight,
                        top: this.state.waterY,
                        left: this.state.waterX, 
                    }}>
                </div>
                <div 
                    className={style.arena}
                    onDragStart={event => this.preventDragHandler(event)}
                    style={{
                        width: this.state.arenaWidth,
                        height: this.state.arenaHeight,
                        top: this.state.arenaY,
                        left: this.state.arenaX,
                    }}>
                    {
                        this.props.battleAvailable ? (
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

                                        openPVPConfirmDialog={this.props.openPVPConfirmDialog}
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