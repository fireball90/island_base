import React from 'react';

function Market() {
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
            <p>Market</p>
        </div>
    );
}

export default Market;