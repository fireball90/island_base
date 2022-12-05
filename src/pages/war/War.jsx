import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(War), document.getElementById("root"));
function War() {
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
            <p>War</p>
        </div>
    );
}

export default War;