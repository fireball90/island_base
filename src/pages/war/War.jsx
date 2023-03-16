import React, { useContext, useEffect } from "react";
import IslandsPVP from "../../components/islands-pvp/IslandsPVP";
import HudContext from "../../contexts/HudContext";
import style from "./War.module.css";

export default function War() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <div className={style.container}>
      <IslandsPVP />
    </div>
  );
}