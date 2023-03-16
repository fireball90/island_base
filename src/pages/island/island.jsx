import React, { useContext, useEffect } from 'react';
import ManagementIsland from '../../components/management-island/ManagementIsland';
import HudContext from '../../contexts/HudContext';
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

