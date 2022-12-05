import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(React.createElement(Management), document.getElementById("root"));
function Management() {
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
            <p>Management</p>
        </div>
    );
}

export default Management;