import Layout from "../../components/layout/Layout";
import ManagementUnbuiltBuildings from "../../components/management-unbuilt-buildings/ManagementUnbuiltBuildings";
import ManagementAbilities from "../../components/management-abilities/ManagementAbilities";
import { useContext, useEffect } from "react";
import { HudContext } from "../../App";

import style from "./Management.module.css";


export default function Management() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout title={"Sziget menedzselés"} navigations={[]}>
      <div className={style.container}>
        <div className={style.abilityPoints}>
          <ManagementAbilities />
        </div>
        <div className={style.buildings}>
          <ManagementUnbuiltBuildings />
        </div>
      </div>
    </Layout>
  );
}