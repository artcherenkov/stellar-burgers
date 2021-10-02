import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientWithCount } from "../../../app/app.typed";
import styles from "../../burger-constructor.module.css";
import {
  deleteIngredient,
  openDetailsPopup,
} from "../../../../services/ingredientsSlice";
import { useAppDispatch } from "../../../../services/hooks";
import { useOnIngredientClick } from "./ingredient.utils";
import cn from "classnames";

interface IIngredient extends TIngredientWithCount {
  bun?: boolean;
  position?: "top" | "bottom";
}

const Ingredient = (props: IIngredient) => {
  const dispatch = useAppDispatch();

  const onDeleteClick = () => dispatch(deleteIngredient(props._id));
  const onIngredientClick = () => dispatch(openDetailsPopup(props._id));
  const { containerRef, onClick } = useOnIngredientClick(onIngredientClick);

  if (props.bun && props.position) {
    const position = props.position === "top" ? " (верх)" : " (низ)";

    return (
      <div
        className={cn(
          styles.ingredientContainer,
          styles.ingredientContainer_outter
        )}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.name + position}
          price={props.price}
          thumbnail={props.image}
        />
      </div>
    );
  }

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
          handleClose={onDeleteClick}
        />
      </div>
    </>
  );
};

export default Ingredient;
