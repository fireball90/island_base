import React, { useContext, useEffect } from "react";
import "../myprofile/myprofile.css";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import HudContext from "../../contexts/HudContext";
import Layout from "../../components/layout/Layout";
import ProfileImage from "../../components/profile-image/ProfileImage";

export default function Myprofile() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Saját profil">
      <div className="myprofile-data flex-column">
        <div className="myprofile d-flex justify-content-center">
          <ProfileImage />
        </div>
        <div className="Profile d-flex justify-content-center">
          <form id="myprofile-form" className="row">
            <div className="User justify-content-center">
              <h1>{user.username}</h1>
              <h2>{user.email}</h2>
              <div className="reset-password justify-content-center bg-bleur">
                <p>Jelszó módosítása:</p>
                <label className="col-sm-12 col-form-label text-center">
                  Új jelszó:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="new-password"
                  aria-label="new-password"
                ></input>
                <label className="col-sm-12 col-form-label text-center">
                  Új jelszó ismétlése:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="repeat-new-password"
                  aria-label="repeat-new-password"
                ></input>
              </div>
              <div className="modifies d-flex justify-content-center">
                <Link to="/island">
                  <button className="modifies-btn">Módosít</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
