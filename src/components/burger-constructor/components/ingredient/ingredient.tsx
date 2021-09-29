import { SyntheticEvent, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../burger-constructor.module.css";
import { TIngredientWithCount } from "../../../app/app.typed";

const DELETE_BUTTON_SELECTOR = ".constructor-element__action";

interface IIngredient extends TIngredientWithCount {
  onClick: () => void;
  onDeleteClick: () => void;
}

const Ingredient = (props: IIngredient) => {
  // костыль, чтобы не вызывать onClick, если кликнули по кнопке удаления ингредиента
  const containerRef = useRef<HTMLDivElement>(null);
  const onClick = (evt: SyntheticEvent) => {
    if (!containerRef.current) return;

    const deleteButtonElement = containerRef.current.querySelector(
      DELETE_BUTTON_SELECTOR
    )!;
    const targetElement = evt.target as Node;

    if (!deleteButtonElement.contains(targetElement)) {
      props.onClick();
    }
  };

  return (
    <>
      <button className={styles.button}>
        <DragIcon type="primary" />
      </button>
      <div
        className={styles.ingredientContainer}
        onClick={onClick}
        ref={containerRef}
      >
        <ConstructorElement
          text={props.count < 2 ? props.name : `${props.name} x${props.count}`}
          price={props.price}
          thumbnail={props.image}
          handleClose={props.onDeleteClick}
        />
      </div>
    </>
  );
};

export default Ingredient;
