import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Market), document.getElementById("root"));
function Market() {
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
            <p>Market</p>
        </div>
    );
}

export default Market;