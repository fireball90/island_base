import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import useSound from "use-sound";
import musicEu from "../../sounds/musicEu.mp3";
import musicInd from "../../sounds/musicInd.ogg";
import musicVik from "../../sounds/musicVik.ogg";
import musicJap from "../../sounds/musicJap.ogg";
import click from "../../sounds/click2.wav";

import style from "./Hud.module.css";
import ExperienceBar from "../experience-bar/ExperienceBar";
import ProfileImage from "../profile-image/ProfileImage";
import HudContext from "../../contexts/HudContext";
import UserContext from "../../contexts/UserContext";
import IslandContext from "../../contexts/IslandContext";

export default function Hud() {
  const { setUserLoggedOut } = useContext(UserContext);
  const { player } = useContext(IslandContext);
  const { isHudDisplayed } = useContext(HudContext);

  const navigate = useNavigate();

  const [play1] = useSound(click, {
    volume: 0.2,
  });

  const handleClick = () => {
    play1();
  };


  function musicChange1 (island) {
    if (island==="Indian"){
      return musicInd;
    }else if (island==="Europian"){
      return musicEu;
    }else if (island==="Viking"){
      return musicVik;
    }else {
      return musicJap;
    }
  }

  const [play, { stop }] = useSound(musicChange1(player.selectedIsland), {
    volume: 0.1,
    loop:true
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const handleMusic = () => {
    if (isPlaying === false) {
      play();
    } else {
      stop();
    }
    setIsPlaying(!isPlaying);
  };

  function handleLogout() {
    setUserLoggedOut();
    navigate("");
  }

  return isHudDisplayed ? (
    <div className={style.layout}>
      <div className={style.hudTop}>
        <div className={style.items}>
          <img alt="Érme" title="Érme" src="../images/ui/coin_ui_2.png"></img>
          <div className={style.itemsText}>
            <h4>{player.coins}</h4>
          </div>
        </div>
        <div className={style.items}>
          <img alt="Vas" title="Vas" src="../images/ui/steel_ui_2.png"></img>
          <div className={style.itemsText}>
            <h4>{player.irons}</h4>
          </div>
        </div>
        <div className={style.items}>
          <img alt="Kő" title="Kő" src="../images/ui/stone_ui_2.png"></img>
          <div className={style.itemsText}>
            <h4>{player.stones}</h4>
          </div>
        </div>
        <div className={style.items}>
          <img alt="Fa" title="Fa" src="../images/ui/wood_ui_2.png"></img>
          <div className={style.itemsText}>
            <h4>{player.woods}</h4>
          </div>
        </div>
      </div>
      <div className={style.hudLeft}>
        <div className={style.playerInformation}>
          <div onClick={() => handleClick()}>
            <ProfileImage />
          </div>
          <ExperienceBar experiencePoints={player.experience} />
        </div>
        <nav>
          <Link to="/island" onClick={() => handleClick()}>
            <img alt="Sziget" title="Sziget" src="../images/ui/build.png"></img>
          </Link>
          <Link to="/management" onClick={() => handleClick()}>
            <img
              alt="Management"
              title="Management"
              src="../images/ui/management.png"
            ></img>
          </Link>
          <Link to="/battle">
            <img alt="Csata" title="Csata" src="../images/ui/war.png"></img>
          </Link>
          <Link to="/expedition" onClick={() => handleClick()}>
            <img
              alt="Expedíció"
              title="Expedíció"
              src="../images/ui/expedition.png"
            ></img>
          </Link>
          <Link to="/market" onClick={() => handleClick()}>
            <img alt="Piac" title="Piac" src="../images/ui/market.png"></img>
          </Link>
          <Link to="/tutorial" onClick={() => handleClick()}>
            <img
              alt="Útmutató"
              title="Útmutató"
              src="../images/ui/tutorial.png"
            ></img>
          </Link>
          <Link to="/notifications" onClick={() => handleClick()}>
            <img
              alt="Értesítések"
              title="Értesítések"
              src="../images/ui/notification.png"
            ></img>
          </Link>
          <button onClick={() => handleLogout()}>
            <img
              alt="Kijelentkezés"
              title="Kijelentkezés"
              src="../images/ui/logout.png"
            ></img>
          </button>
          <div className={style.musicContent}>
            {isPlaying ? (
              <button
                className={style.musicOn}
                onClick={() => handleMusic()}
              ></button>
            ) : (
              <button
                className={style.musicOff}
                onClick={() => handleMusic()}
              ></button>
            )}
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  ) : (
    <Outlet />
  );
}