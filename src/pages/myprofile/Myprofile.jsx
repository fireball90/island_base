import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Myprofile), document.getElementById("root"));
function Myprofile() {
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
            <p>My profile</p>
        </div>
    );
}

export default Myprofile;