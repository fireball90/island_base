import Modal from "react-bootstrap/Modal";
import style from "./Lock.module.css";

export default function Lock({ children }) {
  return (
    <div className={style.container}>
      <Modal.Dialog className="p-3">
        <Modal.Header>
          <Modal.Title><span>Csata nem elérhető!</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{children}</span>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}