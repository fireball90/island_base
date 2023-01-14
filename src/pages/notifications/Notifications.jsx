import React from 'react';

function Notifications() {
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
            <p>Notifications</p>
        </div>
    );
}

export default Notifications;