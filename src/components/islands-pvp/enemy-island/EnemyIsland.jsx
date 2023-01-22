import React, { Component } from 'react';
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover } from "bootstrap";
import MovablePopover from "../../island-management/movable-popover/MovablePopover"

import style from "./EnemyIsland.module.css"


export class EnemyIsland extends Component {
    constructor(props) {
        super(props)

        this.ref = React.createRef()
    }

    render() {
        return (
            <div 
                className={style.island} 
                style={{backgroundImage: `url(${this.props.sprite})`}}
            >
                <div className={style.position} ref={this.ref}>
                    <OverlayTrigger
                        show={true}
                        container={this.ref}
                        trigger={null}
                        overlay={
                            <MovablePopover
                                zoom={this.props.zoom} 
                            >
                                <div>
                                    {this.props.username}
                                        
                                    {this.props.experiencePoints}
                                </div>
                                <Button>Támad</Button>
                            </MovablePopover>
                        }
                    >
                        <div></div>
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}