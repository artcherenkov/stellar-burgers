import React, { SyntheticEvent, useEffect, useRef } from "react";
import styles from "./modal-overlay.module.css";
import cn from "classnames";

interface IModalOverlay {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const ModalOverlay = (props: IModalOverlay) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const onEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => document.removeEventListener("keydown", onEscKeydown);
  }, []);

  const handleClick = (evt: SyntheticEvent) => {
    if (evt.target === overlayRef.current) {
      props.onClose();
    }
  };

  return (
    <div
      className={cn(styles.root, { [styles.root_open]: props.open })}
      onClick={handleClick}
      ref={overlayRef}
    >
      {props.children}
    </div>
  );
};

export default ModalOverlay;
