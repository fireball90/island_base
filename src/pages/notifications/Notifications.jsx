import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Notifications), document.getElementById("root"));
function Notifications() {
  return <div>
            <div class="d-flex align-items-center justify-content-center">
                <BackgroundComponent>
                    
                </BackgroundComponent>
            </div>
        </div>
     
}

function BackgroundComponent(){
    return (
        <div class="content-bg">
            <p>Notifications</p>
        </div>
    );
}

export default Notifications;