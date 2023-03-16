import React, { useContext, useEffect } from "react";
import { HudContext } from "../../App";
import IslandsPVP from "../../components/islands-pvp/IslandsPVP";
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