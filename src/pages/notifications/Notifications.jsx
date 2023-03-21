import React, { useContext, useEffect, useState } from "react";
import "../notifications/notifications.css";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";

export default function Notifications() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [notifications,setNotification] = useState([]);

  useEffect(() => {
    setIsHudDisplayed(true);
    
    axios
    .get("https://localhost:7276/api/Notification/GetAllNotifications")
    .then((response) => {
      const allNotification = response.data;

      setNotification(allNotification)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {

    });
  }, []);

  function deleteNotification(id){
    console.log(id);
    axios
    .delete(`https://localhost:7276/api/Notification/DeleteNotification?id=${id}`)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      //window.location.reload(false)
    });
  }


  return (
    <Layout navigations={[]} title="Értesítések">
      <div className="container-fluid">
        <div className="" style={{ height: "100%", width: "100%" }}>
          <div className="col-12 align-items-center d-flex justify-content-center">
            <div className="container">
              <div className="row">
              {notifications.map((notification)=>(
                <div className="not-list-container container" key={notification.id}>
                  <div
                    className="row d-flex align-items-center justify-content-center"
                    style={{ height: "200px" }}
                  >               
                    <div className="col-3 text-center">
                      <h4>{notification.title}</h4>
                    </div>
                    <div className="col-3 text-center">
                      <p>
                        <img src="../images/icons/wood.png" alt="wood"></img>Fa
                        - {notification.woods} db
                      </p>
                      <p>
                        <img src="../images/icons/stone.png" alt="stone"></img>
                        Kő - {notification.stones} db
                      </p>
                      <p>
                        <img src="../images/icons/steel.png" alt="steel"></img>
                        Vas- {notification.irons} db
                      </p>
                      <p>
                        <img src="../images/icons/coin.png" alt="coin"></img>
                        Coin - {notification.coins} db
                      </p>
                      <p>
                        <img src="../images/icons/coin.png" alt="xp"></img>XP -
                        {notification.experience} pont
                      </p>
                    </div>
                    <div className="col-3 text-center">
                      <h4>Időpont:</h4>
                      <p>{notification.createDate}</p>
                    </div>
                    <div className="col-3 text-center">
                      <button className="not-btn2" onClick={() => deleteNotification(notification.id)}>Törlés</button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}