import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Expedition), document.getElementById("root"));
function Expedition() {
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
            <p>Expedition</p>
        </div>
    );
}

export default Expedition;