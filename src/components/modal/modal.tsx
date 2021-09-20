import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals")!;

interface IModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: IModal) => {
  const onEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => document.removeEventListener("keydown", onEscKeydown);
  }, [onEscKeydown]);

  return ReactDOM.createPortal(
    <>
      <div className={cn(styles.root, { [styles.root_open]: props.open })}>
        <ModalOverlay onClose={props.onClose} />
        <div className={styles.content}>
          <button className={styles.closeButton} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </button>
          {props.children}
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
