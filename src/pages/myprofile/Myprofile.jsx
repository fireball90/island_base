import React from 'react';

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
        <div className="content-bg">
            <p>My profile</p>
        </div>
    );
}

export default Myprofile;