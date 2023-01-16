import React from 'react';
import IslandManagement from '../../components/island-management/IslandManagement';
import style from './Management.module.css'

export default function Management() {
  return (
      <div className={style.container}>
        <IslandManagement/>
      </div>
    ) 
}