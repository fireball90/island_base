import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Tutorial), document.getElementById("root"));
function Tutorial() {
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
            <p>Tutorial</p>
        </div>
    );
}

export default Tutorial;