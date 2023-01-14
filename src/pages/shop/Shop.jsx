import React from 'react';

function Shop() {
  return <div>
            <div class="d-flex align-items-center justify-content-center">
                <BackgroundComponent>
                    
                </BackgroundComponent>
            </div>
        </div>
     
}

function BackgroundComponent(){
    return (
        <div className="content-bg">
            <p>Shop</p>
        </div>
    );
}

export default Shop;