import React from 'react';
import IslandsPVP from '../../components/islands-pvp/IslandsPVP';
import style from './War.module.css'

export default function War() {
    return (
        <div className={style.container}>
            <IslandsPVP />
        </div>
    ) 
}