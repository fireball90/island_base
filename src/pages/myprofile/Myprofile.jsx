import React from 'react';
import '../myprofile/myprofile.css';

function Myprofile() {
  return <div>
            <div className="d-flex align-items-center justify-content-center">
                <BackgroundComponent>
                    
                </BackgroundComponent>
            </div>
        </div>
     
}

function BackgroundComponent(){
    return (
        <div class="container text-center">
            <div class="col-5 offset-md-1 ">
                <div className="content-bg">
                    <img className='profile-viking' alt='Viking' src='../images/profile_pictures/viking_profile.png'></img>
                    <p>Felhasználónév: </p>
                    <p>Email cím: </p>
                    <p>Jelszó módósítása:</p>
                    <p>Új jelszó:</p>
                    <p>Új jelszó ismétlése:</p>
                    <button type="button" class="btn btn-outline-success">Módosít</button>
                </div>       
            </div>
        </div>
    );
}

export default Myprofile;