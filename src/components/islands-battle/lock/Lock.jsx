import Modal from "react-bootstrap/Modal";
import style from "./Lock.module.css";

export default function Lock({ children }) {
  return (
    <div className={style.container}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Csata nem elérhető!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}