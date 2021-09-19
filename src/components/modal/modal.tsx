import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals")!;

interface IModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: IModal) => {
  return ReactDOM.createPortal(
    <ModalOverlay {...props}>
      <div className={styles.root}>
        <button className={styles.closeButton} onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
