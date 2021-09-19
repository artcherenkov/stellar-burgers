import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

const modalRoot = document.getElementById("react-modals")!;

interface IModal {
  open: boolean;
  onClose: () => void;
}

const Modal = (props: IModal) => {
  return ReactDOM.createPortal(
    <ModalOverlay {...props}>
      <div className={styles.root}>
        <button className={styles.closeButton} onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        <h1 className={cn("text text_type_main-large pt-3 pb-3")}>
          Детали ингредиента
        </h1>
        <img
          className={styles.image}
          src="https://code.s3.yandex.net/react/code/meat-02-large.png"
          alt=""
        />
        <h2
          className={cn("text text_type_main-medium pt-2 pb-8", styles.title)}
        >
          Мясо бессмертных моллюсков Protostomia
        </h2>
        <ul className={styles.nutritionFacts}>
          <li className={cn(styles.nutritionFact, styles.nutritionFact_size_l)}>
            <p
              className={cn(
                "text text_type_main-default text_color_inactive",
                styles.nutritionText
              )}
            >
              Калории, ккал
            </p>
            <p
              className={cn(
                "text text_type_digits-default text_color_inactive",
                styles.nutritionText
              )}
            >
              244,4
            </p>
          </li>
          <li className={styles.nutritionFact}>
            <p
              className={cn(
                "text text_type_main-default text_color_inactive",
                styles.nutritionText
              )}
            >
              Белки, г
            </p>
            <p
              className={cn(
                "text text_type_digits-default text_color_inactive",
                styles.nutritionText
              )}
            >
              12,2
            </p>
          </li>
          <li className={styles.nutritionFact}>
            <p
              className={cn(
                "text text_type_main-default text_color_inactive",
                styles.nutritionText
              )}
            >
              Жиры, г
            </p>
            <p
              className={cn(
                "text text_type_digits-default text_color_inactive",
                styles.nutritionText
              )}
            >
              17,2
            </p>
          </li>
          <li className={styles.nutritionFact}>
            <p
              className={cn(
                "text text_type_main-default text_color_inactive",
                styles.nutritionText
              )}
            >
              Углеводы, г
            </p>
            <p
              className={cn(
                "text text_type_digits-default text_color_inactive",
                styles.nutritionText
              )}
            >
              10,2
            </p>
          </li>
        </ul>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
