import "./Lock.css";

export default function Lock({ children }) {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="lock-modal">
        <div><h4>A csata nem elérhető jelenleg!</h4></div>
        <div>{children}</div>
      </div>
    </div>
  );
}