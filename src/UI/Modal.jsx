import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";

const Backdrop = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const portalElement = document.getElementById("overlays");

const ModalOverlay = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onclose={onClose} />, portalElement)}

      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
