import "../base-modal/BaseModal.css";
import { Link } from "react-router-dom";

export default function BaseModal({ title, children }) {

    return (
        <div>
            <div className="d-flex justify-content-center  align-items-center">
                <div className="base-modal-container modal-animation">
                    <div className="base-modal-popup">
                        <div className="base-modal-header">
                            <div className="base-modal-title">
                                <h3 className="text-white">{title}</h3>
                            </div>
                        </div>
                        <div className="base-modal-body mb-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>  
        </div>
      );
}

