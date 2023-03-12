import React from 'react';
import IslandManagement from '../../components/island-management/IslandManagement';
import style from './Island.module.css'



export default function Island() {
  return (
      <div className={style.container}>
        <IslandManagement/>
      </div>
    ) 
}

