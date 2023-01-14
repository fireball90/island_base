import React from 'react';

function Pwreset() {
  return <div id="islandbg"><form id="form" class="d-flex align-items-center">
      <InputComponent InputId={"email"} LabelText={"Adja meg a regisztrálásnál használt email címét:"} InputType={"email"}></InputComponent>
      <ButtonComponent></ButtonComponent>
      </form></div>
     
}
function InputComponent({InputId, LabelText, InputType}) {
    return <div>
    <label for={InputId} className="col-sm-2 form-label">{LabelText}</label>
    <div class="col-sm-10">
      <input type={InputType} readonly className="form-control" id={InputId}/>
    </div>
  </div>
}
function ButtonComponent() {
    return  <div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <button type="button" onClick={() =>{
                         var emailInput = document.getElementById("email");
                         var emailVal = emailInput.value;

                         //CheckEmail();
                    }}>
                    Küldés
                </button></div>
            </div>
}
export default Pwreset;
