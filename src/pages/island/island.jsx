import React, { useContext, useEffect } from 'react';
import { HudContext } from '../../App';
import ManagementIsland from '../../components/management-island/ManagementIsland';
import style from './Island.module.css'

export default function Island() {
  const { setIsHudDisplayed } = useContext(HudContext);
  
  useEffect(() => {
    setIsHudDisplayed(true);
  }, [])

  return (
      <div className={style.container}>
        <ManagementIsland />
      </div>
    ) 
}

